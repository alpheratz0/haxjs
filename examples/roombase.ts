import { Room, Scores, Player } from '../src/index'

class RoomBase extends Room {
    onPlayerJoin (player: Player): void {}
    onPlayerLeave (player: Player): void {}
    onTeamVictory (scores: Scores): void {}
    onPlayerChat (player: Player, message: string): void {}
    onPlayerBallKick (player: Player): void {}
    onTeamGoal (team: number): void {}
    onGameStart (byPlayer: Player): void {}
    onGameStop (byPlayer: Player): void {}
    onPlayerAdminChange (changedPlayer: Player, byPlayer: Player): void {}
    onPlayerTeamChange (changedPlayer: Player, byPlayer: Player): void {}
    onPlayerKicked (kickedPlayer: Player, reason: string, ban: boolean, byPlayer: Player): void {}
    onGameTick (): void {}
    onGamePause (byPlayer: Player): void {}
    onGameUnpause (byPlayer: Player): void {}
    onPositionsReset (): void {}
    onPlayerActivity (player: Player): void {}
    onStadiumChange (newStadiumName: string, byPlayer: Player): void {}
    onRoomLink (url: string): void {}
    onKickRateLimitSet (min: number, rate: number, burst: number, byPlayer: Player): void {}
}