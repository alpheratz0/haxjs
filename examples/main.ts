import { Room, Player, World } from 'haxjs';

class BasicRoom extends Room {
	async onPlayerJoin(player: Player): Promise<void> {
		await this.setPlayerAdmin(player.id, true);
		await this.sendAnnouncement(
			`welcome ${player.name}!`,
			player.id,
			0xffff00,
			'bold',
			2
		);
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
