import { Room, Scores, Player, TeamID } from 'haxjs';

class RoomSkeleton extends Room {
    onPlayerJoin(player: Player): void {}
    onPlayerLeave(player: Player): void {}
    onTeamVictory(scores: Scores): void {}
    onPlayerChat(player: Player, message: string): void {}
    onPlayerBallKick(player: Player): void {}
    onTeamGoal(team: TeamID): void {}
    onGameStart(byPlayer: Player | null): void {}
    onGameStop(byPlayer: Player | null): void {}
    onPlayerAdminChange(changedPlayer: Player, byPlayer: Player | null): void {}
    onPlayerTeamChange(changedPlayer: Player, byPlayer: Player | null): void {}
    onPlayerKicked(
        kickedPlayer: Player,
        reason: string,
        ban: boolean,
        byPlayer: Player | null
    ): void {}
    onGameTick(): void {}
    onGamePause(byPlayer: Player | null): void {}
    onGameUnpause(byPlayer: Player | null): void {}
    onPositionsReset(): void {}
    onPlayerActivity(player: Player): void {}
    onStadiumChange(newStadiumName: string, byPlayer: Player | null): void {}
    onRoomLink(url: string): void {}
    onKickRateLimitSet(
        min: number,
        rate: number,
        burst: number,
        byPlayer: Player | null
    ): void {}
}
