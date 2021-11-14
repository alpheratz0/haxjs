# haxjs

haxjs is a [npm package](https://www.npmjs.com/haxjs) written in typescript that makes writting of [haxball headless hosts](https://github.com/haxball/haxball-issues/wiki/Headless-Host) a lot easier

![](https://raw.githubusercontent.com/alpheratz0/haxjs/master/assets/runexample.gif)

## why would you use it?

-   **npm**: has thousand of packages ready to add to your project (db, webservers, discord, etc)
-   **resources**: uses a headless web browser, so it consumes less resources than the gui version
-   **typescript**: write safer and better code
-   **nodejs**: better interaction with the OS (filesystem, spawn processes, etc)

## project status

This project is in an early phase and is still under development so it may have bugs, im trying to keep the best compatibility with the haxball headless api making as few changes as possible, you may find that all methods that retrieves data (getPlayer, getDiscProperties, getDiscCount, etc.) are now async.

## install

simply run `npm install haxjs` or `yarn add haxjs`

## example

Put this code inside `example-room.ts` and then run `ts-node example-room.ts` to start it, you **must** replace the token field with a valid one:

```ts
import { Room, Player, World } from 'haxjs';

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

    onRoomLink(url: string): void {
        console.log('\n' + url);
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
        token: 'thr1.AAAAAGGQ_HvNuZLqigGpEg.vXMHp16ULVE'
    });

    room.start();
};

main();
```

