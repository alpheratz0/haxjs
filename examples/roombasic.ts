import { Room, Player, World } from '../src/index';

class ExampleRoom extends Room {
    onPlayerJoin(player: Player): void {
        this.setPlayerAdmin(player.id, true);
        this.sendAnnouncement(
            `welcome ${player.name}!`,
            player.id,
            0xffff00,
            'bold',
            2
        );
    }

    onPlayerChat(player: Player, message: string): void {
        this.sendAnnouncement(
            `${player.name}[${player.id}]: ${message}`,
            null,
            0xffffff,
            null,
            1
        );
    }
}

const main = () => {
    const room = new ExampleRoom({
        roomName: 'ExampleRoom',
        password: undefined,
        maxPlayers: 10,
        public: false,
        geo: World.UY,
        noPlayer: true,
        token: 'thr1.AAAAAGGMSjiCOltiX2aAEA.dLGyggHZtDg'
    });

    room.start();
};

main();
