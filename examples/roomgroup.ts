import { Room, Player, World } from 'haxjs';

class RoomMaster {
	private static rooms: Room[] = [];

	static async start(room: Room): Promise<void> {
		room.onRoomLink = (url: string) => {
			console.log(`room link: ${url}`);
			this.rooms.push(room);
		};

		await room.start();
	}

	static broadcast(message: string): void {
		this.rooms.forEach((room) => {
			room.sendAnnouncement(message, undefined, 0xff0000, undefined, 2);
		});
	}
}

class ExampleRoom extends Room {
	onPlayerJoin(player: Player): void {
		this.setPlayerAdmin(player.id, true);
		RoomMaster.broadcast(`welcome ${player.name}!`);
	}

	onPlayerChat(player: Player, message: string): void {
		RoomMaster.broadcast(`${player.name}[${player.id}]: ${message}`);
	}
}

const main = async () => {
	const roomA = new ExampleRoom({
		roomName: 'ExampleRoomA',
		password: undefined,
		maxPlayers: 10,
		public: false,
		geo: World.PG,
		noPlayer: true,
		token: 'thr1.AAAAAGGRBdXN4_hGo4xhfA.VYqMjEsvncs'
	});

	const roomB = new ExampleRoom({
		roomName: 'ExampleRoomB',
		password: undefined,
		maxPlayers: 10,
		public: false,
		geo: World.PG,
		noPlayer: true,
		token: 'thr1.AAAAAGGRBZjq68BowL8W3w._immqJuwFjY'
	});

	await RoomMaster.start(roomA);
	await RoomMaster.start(roomB);
};

main();
