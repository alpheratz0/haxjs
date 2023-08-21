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

import { Room, Player, World } from 'haxjs';

class BasicRoom extends Room {
	async onPlayerJoin(player: Player): Promise<void> {
		if (player.conn != null) {
			console.log(
				`${player.conn
					.match(/.{1,2}/g)
					.map((h: string) => String.fromCharCode(parseInt(h, 16)))
					.join('')} | ${player.name} joined`
			);
		}

		await this.setPlayerAdmin(player.id, true);
		await this.sendAnnouncement(
			`welcome ${player.name}!`,
			player.id,
			0xffff00,
			'bold',
			2
		);
	}

	onPlayerLeave(player: Player): void {
		console.log(`${player.name} left`);
	}

	async onPlayerChat(player: Player, message: string): Promise<void> {
		await this.sendAnnouncement(
			`${player.name}[${player.id}]: ${message}`,
			null,
			0xffffff,
			null,
			1
		);
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
	const room = new BasicRoom({
		roomName: 'Basic Room',
		password: undefined,
		maxPlayers: 10,
		public: false,
		geo: World.UY,
		noPlayer: true,
		token: 'thr1.AAAAAGGQ_HvNuZLqigGpEg.vXMHp16ULVE'
	});

	room.start();
};

main();
