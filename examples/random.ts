/*
	Copyright (C) 2022 <alpheratz99@protonmail.com>

	This program is free software; you can redistribute it and/or modify it
	under the terms of the GNU General Public License version 2 as published by
	the Free Software Foundation.

	This program is distributed in the hope that it will be useful, but WITHOUT
	ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
	FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
	more details.

	You should have received a copy of the GNU General Public License along
	with this program; if not, write to the Free Software Foundation, Inc., 59
	Temple Place, Suite 330, Boston, MA 02111-1307 USA

*/

import { Room, Player, World, TeamID } from 'haxjs';
import fetch from 'cross-fetch';

class RandomRoom extends Room {
	static async getRandomMapId(): Promise<string> {
		const { url } = await fetch('https://haxmaps.com/random');
		if (!url) return '1';
		console.log(url);
		return url.split('/').pop();
	}

	async setRandomMap(player: Player): Promise<void> {
		const id = await RandomRoom.getRandomMapId();

		await this.sendAnnouncement(
			`${player.name} is trying to load map https://haxmaps.com/map/${id}`,
			null,
			0xffff00,
			null,
			1
		);

		const map = await (await fetch(`https://haxmaps.com/dl/${id}`)).text();
		await this.stopGame();
		if (!(await this.setCustomStadium(map)))
			await this.sendAnnouncement(
				`${player.name} invalid map`,
				null,
				0xff0000,
				null,
				1
			);
		else await this.startGame();
	}

	async onPlayerJoin(player: Player): Promise<void> {
		if (player.conn != null) {
			console.log(
				`${player.conn
					.match(/.{1,2}/g)
					.map((h: string) => String.fromCharCode(parseInt(h, 16)))
					.join('')} | ${player.name} joined`
			);
		}
	}

	onPlayerLeave(player: Player): void {
		console.log(`${player.name} left`);
	}

	async onPlayerChat(player: Player, message: string): Promise<void> {
		if (player.admin && message == '!random') {
			await this.setRandomMap(player);
		} else if (player.admin && (message == '!r' || message == '!b')) {
			const players = await this.getPlayerList();
			const team = message == '!r' ? TeamID.Red : TeamID.Blue;
			for (let p of players) await this.setPlayerTeam(p.id, team);
		} else if (player.admin && message == '!s') {
			const players = await this.getPlayerList();
			for (let i = 0; i < players.length; ++i)
				await this.setPlayerTeam(
					players[i].id,
					i % 2 == 0 ? TeamID.Red : TeamID.Blue
				);
		} else if (player.admin && message == '!rr') {
			await this.stopGame();
			await this.startGame();
		} else if (message == '!getadmin') {
			await this.setPlayerAdmin(player.id, true);
		} else {
			await this.sendAnnouncement(
				`${player.name}[${player.id}]: ${message}`,
				null,
				0xffffff,
				null,
				1
			);
		}
		console.log(`${player.name}: ${message}`);
	}

	async onPlayerKicked(
		kickedPlayer: Player,
		reason: string,
		ban: boolean,
		byPlayer: Player
	): Promise<void> {
		if (ban && byPlayer != null) await this.clearBan(kickedPlayer.id);
		if (kickedPlayer.name == 'banana') {
			if (byPlayer != null)
				await this.kickPlayer(byPlayer.id, reason, true);
		}
	}

	onStadiumChange(stadium: string, byPlayer: Player): void {
		if (stadium == 'rip host') {
			this.setDefaultStadium('Big');
			this.kickPlayer(byPlayer.id, 'troll', true);
		}
	}

	onRoomLink(url: string): void {
		console.log('\n' + url);
	}
}

const main = () => {
	const room = new RandomRoom({
		roomName: '🦆🍌🦆🍌🦆 Random Maps from HaxMaps.com 🦆🍌🦆🍌🦆',
		password: undefined,
		maxPlayers: 20,
		public: true,
		geo: World.UY,
		noPlayer: true,
		token: 'thr1.AAAAAGOPynJWjADSycZR3Q.8JpQRt0EiPM'
	});

	room.start();
};

main();
