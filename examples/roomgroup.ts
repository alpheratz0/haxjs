import { Room, Player, World } from '../src/index';

class RoomMaster {
    private static rooms: Room[] = [];

    static start(room: Room): void {
        room.onRoomLink = (url: string) => {
            console.log(`room link: ${url}`);
            this.rooms.push(room);
        };

        room.start();
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

const main = () => {
    const roomA = new ExampleRoom({
        roomName: 'ExampleRoomA',
        password: undefined,
        maxPlayers: 10,
        public: false,
        geo: World.PG,
        noPlayer: true,
        token: 'thr1.AAAAAGGL5Zn_geUt699PaQ.IDZouwwoS4I'
    });

    const roomB = new ExampleRoom({
        roomName: 'ExampleRoomB',
        password: undefined,
        maxPlayers: 10,
        public: false,
        geo: World.PG,
        noPlayer: true,
        token: 'thr1.AAAAAGGL5bCSs9cniHlRgA.Uf6D9DTDjGM'
    });

    RoomMaster.start(roomA);
    RoomMaster.start(roomB);
};

main();

