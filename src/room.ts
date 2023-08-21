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

import { Page } from 'puppeteer';
import { AnnounceStyle } from './announce-style';
import { CollisionFlags } from './collision-flags';
import { DiscProperties } from './disc-properties';
import { Logger } from './logger';
import { Player } from './player';
import { Position } from './position';
import { RoomConfig } from './room-config';
import { Scores } from './scores';
import { DefaultStadium } from './default-stadium';
import { TeamID } from './team-id';
import { BigBrowser } from './big-browser';
import { Stadium } from './stadium';

declare global {
	export interface Window {
		/* current running room */
		_room: Room;

		/* function to start a haxball headless room */
		HBInit: (roomConfig: RoomConfig) => Room;

		/* exposed callback functions */
		onPlayerJoin: (player: Player) => void;
		onPlayerLeave: (player: Player) => void;
		onTeamVictory: (scores: Scores) => void;
		onPlayerChat: (player: Player, message: string) => void;
		onPlayerBallKick: (player: Player) => void;
		onTeamGoal: (team: TeamID) => void;
		onGameStart: (byPlayer: Player | null) => void;
		onGameStop: (byPlayer: Player | null) => void;
		onPlayerAdminChange: (
			changedPlayer: Player,
			byPlayer: Player | null
		) => void;
		onPlayerTeamChange: (
			changedPlayer: Player,
			byPlayer: Player | null
		) => void;
		onPlayerKicked: (
			kickedPlayer: Player,
			reason: string,
			ban: boolean,
			byPlayer: Player | null
		) => void;
		onGameTick: () => void;
		onGamePause: (byPlayer: Player | null) => void;
		onGameUnpause: (byPlayer: Player | null) => void;
		onPositionsReset: () => void;
		onPlayerActivity: (player: Player) => void;
		onStadiumChange: (
			newStadiumName: string,
			byPlayer: Player | null
		) => void;
		onKickRateLimitSet: (
			min: number,
			rate: number,
			burst: number,
			byPlayer: Player | null
		) => void;
	}
}

export class Room {
	private page: Page;
	private config: RoomConfig;

	constructor(config: RoomConfig) {
		this.config = config;
	}

	private async openNewTab(): Promise<void> {
		Logger.begin('opening new tab');
		this.page = await BigBrowser.getNewPage();
		Logger.end();
	}

	private async exposeFunctions(): Promise<void> {
		Logger.begin('exposing callback functions');

		await this.page.exposeFunction('onPlayerJoin', (player: Player) => {
			this.onPlayerJoin && this.onPlayerJoin(player);
		});

		await this.page.exposeFunction('onPlayerLeave', (player: Player) => {
			this.onPlayerLeave && this.onPlayerLeave(player);
		});

		await this.page.exposeFunction('onTeamVictory', (scores: Scores) => {
			this.onTeamVictory && this.onTeamVictory(scores);
		});

		await this.page.exposeFunction(
			'onPlayerChat',
			(player: Player, message: string) => {
				this.onPlayerChat && this.onPlayerChat(player, message);
			}
		);

		await this.page.exposeFunction('onPlayerBallKick', (player: Player) => {
			this.onPlayerBallKick && this.onPlayerBallKick(player);
		});

		await this.page.exposeFunction('onTeamGoal', (team: TeamID) => {
			this.onTeamGoal && this.onTeamGoal(team);
		});

		await this.page.exposeFunction('onGameStart', (byPlayer: Player) => {
			this.onGameStart && this.onGameStart(byPlayer);
		});

		await this.page.exposeFunction('onGameStop', (byPlayer: Player) => {
			this.onGameStop && this.onGameStop(byPlayer);
		});

		await this.page.exposeFunction(
			'onPlayerAdminChange',
			(changedPlayer: Player, byPlayer: Player) => {
				this.onPlayerAdminChange &&
					this.onPlayerAdminChange(changedPlayer, byPlayer);
			}
		);

		await this.page.exposeFunction(
			'onPlayerTeamChange',
			(changedPlayer: Player, byPlayer: Player) => {
				this.onPlayerTeamChange &&
					this.onPlayerTeamChange(changedPlayer, byPlayer);
			}
		);

		await this.page.exposeFunction(
			'onPlayerKicked',
			(
				kickedPlayer: Player,
				reason: string,
				ban: boolean,
				byPlayer: Player
			) => {
				this.onPlayerKicked &&
					this.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);
			}
		);

		await this.page.exposeFunction('onGameTick', () => {
			this.onGameTick && this.onGameTick();
		});

		await this.page.exposeFunction('onGamePause', (byPlayer: Player) => {
			this.onGamePause && this.onGamePause(byPlayer);
		});

		await this.page.exposeFunction('onGameUnpause', (byPlayer: Player) => {
			this.onGameUnpause && this.onGameUnpause(byPlayer);
		});

		await this.page.exposeFunction('onPositionsReset', () => {
			this.onPositionsReset && this.onPositionsReset();
		});

		await this.page.exposeFunction('onPlayerActivity', (player: Player) => {
			this.onPlayerActivity && this.onPlayerActivity(player);
		});

		await this.page.exposeFunction(
			'onStadiumChange',
			(newStadiumName: string, byPlayer: Player) => {
				this.onStadiumChange &&
					this.onStadiumChange(newStadiumName, byPlayer);
			}
		);

		await this.page.exposeFunction(
			'onKickRateLimitSet',
			(min: number, rate: number, burst: number, byPlayer: Player) => {
				this.onKickRateLimitSet &&
					this.onKickRateLimitSet(min, rate, burst, byPlayer);
			}
		);

		Logger.end();
	}

	private async createRoom(): Promise<void> {
		Logger.begin('creating room');
		await this.page.goto('https://www.haxball.com/headless', {
			waitUntil: 'networkidle2'
		});

		await this.page.evaluate((serializedConfig: string) => {
			window._room = window.HBInit(JSON.parse(serializedConfig));
		}, JSON.stringify(this.config));

		await this.page.evaluate(() => {
			window._room.onPlayerJoin = (player) => {
				window.onPlayerJoin(player);
			};

			window._room.onPlayerLeave = (player) => {
				window.onPlayerLeave(player);
			};

			window._room.onTeamVictory = (scores) => {
				window.onTeamVictory(scores);
			};

			window._room.onPlayerChat = (player, message) => {
				window.onPlayerChat(player, message);
				return false;
			};

			window._room.onPlayerBallKick = (player) => {
				window.onPlayerBallKick(player);
			};

			window._room.onTeamGoal = (team) => {
				window.onTeamGoal(team);
			};

			window._room.onGameStart = (byPlayer) => {
				window.onGameStart(byPlayer);
			};

			window._room.onGameStop = (byPlayer) => {
				window.onGameStop(byPlayer);
			};

			window._room.onPlayerAdminChange = (changedPlayer, byPlayer) => {
				window.onPlayerAdminChange(changedPlayer, byPlayer);
			};

			window._room.onPlayerTeamChange = (changedPlayer, byPlayer) => {
				window.onPlayerTeamChange(changedPlayer, byPlayer);
			};

			window._room.onPlayerKicked = (
				kickedPlayer,
				reason,
				ban,
				byPlayer
			) => {
				window.onPlayerKicked(kickedPlayer, reason, ban, byPlayer);
			};

			window._room.onGameTick = () => {
				window.onGameTick();
			};

			window._room.onGamePause = (byPlayer) => {
				window.onGamePause(byPlayer);
			};

			window._room.onGameUnpause = (byPlayer) => {
				window.onGameUnpause(byPlayer);
			};

			window._room.onPositionsReset = () => {
				window.onPositionsReset();
			};

			window._room.onPlayerActivity = (player) => {
				window.onPlayerActivity(player);
			};

			window._room.onStadiumChange = (newStadiumName, byPlayer) => {
				window.onStadiumChange(newStadiumName, byPlayer);
			};

			window._room.onKickRateLimitSet = (min, rate, burst, byPlayer) => {
				window.onKickRateLimitSet(min, rate, burst, byPlayer);
			};
		});

		this.CollisionFlags = await this.page.evaluate(() => {
			return window._room.CollisionFlags;
		});

		const iframehandle = await this.page.$('iframe');
		const iframe = await iframehandle?.contentFrame();

		await iframe?.waitForFunction(() => {
			var recaptcha = document.querySelector('#recaptcha');
			var link = document.querySelector('#roomlink');

			if (recaptcha == null || link == null) return false;

			return recaptcha.clientHeight + link.clientHeight > 0;
		});

		const failed = await iframe?.evaluate(() => {
			var recaptcha = document.querySelector('#recaptcha');

			if (recaptcha == null) return true;

			return recaptcha.clientHeight > 0;
		});

		if (failed) {
			Logger.end(true);
			process.exit(1);
		}

		Logger.end();

		const link = await iframe?.evaluate(() => {
			let roomLink = document.querySelector('#roomlink a');
			if (roomLink != null) return roomLink.getAttribute('href');
			return '';
		});

		this.onRoomLink && this.onRoomLink(link || '');
	}

	async start(): Promise<void> {
		await this.openNewTab();
		await this.exposeFunctions();
		await this.createRoom();
	}

	/** Sends a chat message using the host player.
	 * If targetId is null or undefined the message is sent to all players.
	 * @param message The message content.
	 * @param targetId The target id of the player to send the message.
	 * If null or undefined the message is sent to all players.
	 */
	async sendChat(message: string, targetId?: number | null): Promise<void> {
		if (targetId == undefined) targetId = null;

		await this.page.evaluate(
			({ message, targetId }: any) => {
				window._room.sendChat(message, targetId);
			},
			{ message, targetId }
		);
	}

	/** Changes the admin status of the specified player.
	 * @param playerId The player id whose admin status will change.
	 * @param admin The new admin status of the player.
	 */
	async setPlayerAdmin(playerId: number, admin: boolean): Promise<void> {
		await this.page.evaluate(
			({ playerId, admin }: any) => {
				window._room.setPlayerAdmin(playerId, admin);
			},
			{ playerId, admin }
		);
	}

	/** Moves the specified player to a team.
	 * @param playerId The player id whose team will change.
	 * @param team The new team id of the player.
	 */
	async setPlayerTeam(playerId: number, team: number): Promise<void> {
		await this.page.evaluate(
			({ playerId, team }: any) => {
				window._room.setPlayerTeam(playerId, team);
			},
			{ playerId, team }
		);
	}

	/** Kicks the specified player from the room.
	 * @param playerId The player id to kick from the room.
	 * @param reason The reason of the kick.
	 * @param ban True if the player is being banned from the room otherwise false.
	 */
	async kickPlayer(
		playerId: number,
		reason: string,
		ban: boolean
	): Promise<void> {
		await this.page.evaluate(
			({ playerId, reason, ban }: any) => {
				window._room.kickPlayer(playerId, reason, ban);
			},
			{ playerId, reason, ban }
		);
	}

	/** Clears the ban for a playerId that belonged
	 * to a player that was previously banned.
	 * @param playerId The player id that previously has been banned.
	 */
	async clearBan(playerId: number): Promise<void> {
		await this.page.evaluate(
			({ playerId }: any) => {
				window._room.clearBan(playerId);
			},
			{ playerId }
		);
	}

	/** Clears the list of banned players. */
	async clearBans(): Promise<void> {
		await this.page.evaluate(() => {
			window._room.clearBans();
		});
	}

	/** Sets the score limit of the room.
	 * @param limit The score limit.
	 */
	async setScoreLimit(limit: number): Promise<void> {
		await this.page.evaluate(
			({ limit }: any) => {
				window._room.setScoreLimit(limit);
			},
			{ limit }
		);
	}

	/** Sets the time limit of the room. The limit must
	 * be specified in number of minutes.
	 * @param limitInMinutes The time limit in minutes.
	 */
	async setTimeLimit(limitInMinutes: number): Promise<void> {
		await this.page.evaluate(
			({ limitInMinutes }: any) => {
				window._room.setTimeLimit(limitInMinutes);
			},
			{ limitInMinutes }
		);
	}

	/** Parses the stadiumFileContents as a .hbs stadium
	 * file and sets it as the selected stadium.
	 * Returns false if it fails to set the stadium.
	 * @param stadiumFileContents The content of the .hbs stadium file.
	 */
	async setCustomStadium(stadiumFileContents: string): Promise<boolean> {
		if (Stadium.isValid(stadiumFileContents)) {
			return await this.page.evaluate(
				({ stadiumFileContents }: any) => {
					try {
						window._room.setCustomStadium(stadiumFileContents);
						return true;
					} catch (_) {
						/* invalid map format */
						return false;
					}
				},
				{ stadiumFileContents }
			);
		} else {
			return false;
		}
	}

	/** Sets the selected stadium to one of the default stadiums.
	 * The name must match exactly (case sensitive).
	 * @param stadiumName The default stadium name.
	 */
	async setDefaultStadium(stadiumName: DefaultStadium): Promise<void> {
		await this.page.evaluate(
			({ stadiumName }: any) => {
				window._room.setDefaultStadium(stadiumName);
			},
			{ stadiumName }
		);
	}

	/** Sets the teams lock. When teams are locked players are
	 * not able to change team unless they are moved by an admin.
	 * @param locked True to prevent players from changing its current team.
	 */
	async setTeamsLock(locked: boolean): Promise<void> {
		await this.page.evaluate(
			({ locked }: any) => {
				window._room.setTeamsLock(locked);
			},
			{ locked }
		);
	}

	/** Sets the colors of a team.
	 * @param team The team id to change its colors.
	 * @param angle The rotation.
	 * @param textColor The color of the avatars.
	 * @param colors The background colors.
	 */
	async setTeamColors(
		team: TeamID,
		angle: number,
		textColor: number,
		colors: number[]
	): Promise<void> {
		await this.page.evaluate(
			({ team, angle, textColor, colors }: any) => {
				window._room.setTeamColors(team, angle, textColor, colors);
			},
			{ team, angle, textColor, colors }
		);
	}

	/** Starts the game, if a game is already in progress
	 * this method does nothing. */
	async startGame(): Promise<void> {
		await this.page.evaluate(() => {
			window._room.startGame();
		});
	}

	/** Stops the game, if no game is in progress
	 * this method does nothing. */
	async stopGame(): Promise<void> {
		await this.page.evaluate(() => {
			window._room.stopGame();
		});
	}

	/** Sets the pause state of the game. true = paused and false = unpaused.
	 * @param pauseState True to pause the game, false to unpause it.
	 */
	async pauseGame(pauseState: boolean): Promise<void> {
		await this.page.evaluate(
			({ pauseState }: any) => {
				window._room.pauseGame(pauseState);
			},
			{ pauseState }
		);
	}

	/** Returns the player with the specified id.
	 * Returns null if the player doesn't exist.
	 * @param playerId The id of the player to search
	 * in the list of players connected.
	 */
	async getPlayer(playerId: number): Promise<Player | null> {
		return await this.page.evaluate(
			({ playerId }: any) => {
				return window._room.getPlayer(playerId);
			},
			{ playerId }
		);
	}

	/** Returns the current list of players. */
	async getPlayerList(): Promise<Player[]> {
		return await this.page.evaluate(() => {
			return window._room.getPlayerList();
		});
	}

	/** If a game is in progress it returns the
	 * current score information. */
	async getScores(): Promise<Scores | null> {
		return await this.page.evaluate(() => {
			return window._room.getScores();
		});
	}

	/** Returns the ball's position in the field
	 * or null if no game is in progress. */
	async getBallPosition(): Promise<Position | null> {
		return await this.page.evaluate(() => {
			return window._room.getBallPosition();
		});
	}

	/** Starts recording of a haxball replay. */
	async startRecording(): Promise<void> {
		await this.page.evaluate(() => {
			window._room.startRecording();
		});
	}

	/** Stops the recording previously started with startRecording
	 * and returns the replay file contents as a Uint8Array. */
	async stopRecording(): Promise<Uint8Array | null> {
		return await this.page.evaluate(() => {
			return window._room.stopRecording();
		});
	}

	/** Changes the password of the room.
	 * @param password The new password of the room,
	 * if null the password will be cleared.
	 */
	async setPassword(password: string | null): Promise<void> {
		await this.page.evaluate(
			({ password }: any) => {
				window._room.setPassword(password);
			},
			{ password }
		);
	}

	/** Activates or deactivates the recaptcha requirement to join the room.
	 * @param required True if every player must complete a
	 * recaptcha before joining the room.
	 */
	async setRequireRecaptcha(required: boolean): Promise<void> {
		await this.page.evaluate(
			({ required }: any) => {
				window._room.setRequireRecaptcha(required);
			},
			{ required }
		);
	}

	/** First all players listed are removed, then they are
	 * reinserted in the same order they appear in the playerIdList.
	 * @param playerIdList The order in witch the players will be reinserted.
	 * @param moveToTop If true players are inserted at the top of the list,
	 * otherwise they are inserted at the bottom of the list.
	 */
	async reorderPlayers(
		playerIdList: number[],
		moveToTop: boolean
	): Promise<void> {
		await this.page.evaluate(
			({ playerIdList, moveToTop }: any) => {
				window._room.reorderPlayers(playerIdList, moveToTop);
			},
			{ playerIdList, moveToTop }
		);
	}

	/** Sends a host announcement with msg as contents. Unlike sendChat,
	 * announcements will work without a host player and has a larger
	 * limit on the number of characters.
	 * @param msg The content of the message.
	 * @param targetId If null or undefined the message is sent to all players,
	 * otherwise it's sent only to the player with matching targetId.
	 * @param color The message color.
	 * @param style The style of the announcement text, it must be one
	 * of the following strings: "normal", "bold", "italic", "small",
	 * "small-bold", "small-italic".
	 * @param sound If 0 the announcement will produce no sound.
	 * If 1 the announcement will produce a normal chat sound.
	 * If 2 it will produce a notification sound.
	 */
	async sendAnnouncement(
		msg: string,
		targetId?: number | null,
		color?: number | null,
		style?: AnnounceStyle | null,
		sound?: number | null
	): Promise<void> {
		if (targetId == undefined) targetId = null;
		if (color == undefined) color = null;
		if (style == undefined) style = null;
		if (sound == undefined) sound = null;

		await this.page.evaluate(
			({ msg, targetId, color, style, sound }: any) => {
				window._room.sendAnnouncement(
					msg,
					targetId,
					color,
					style,
					sound
				);
			},
			{ msg, targetId, color, style, sound }
		);
	}

	/** Sets the room's kick rate limits.
	 * @param min The minimum number of logic-frames between two kicks.
	 * It is impossible to kick faster than this.
	 * @param rate Works like min but lets players save up extra
	 * kicks to use them later depending on the value of burst.
	 * @param burst Determines how many extra kicks the player is able to save up. */
	async setKickRateLimit(
		min: number,
		rate: number,
		burst: number
	): Promise<void> {
		await this.page.evaluate(
			({ min, rate, burst }: any) => {
				window._room.setKickRateLimit(min, rate, burst);
			},
			{ min, rate, burst }
		);
	}

	/** Overrides the avatar of the target player.
     ** If avatar is set to null the override is cleared and
     the player will be able to use his own avatar again. */
	async setPlayerAvatar(
		playerId: number,
		avatar: string | null
	): Promise<void> {
		await this.page.evaluate(
			({ playerId, avatar }: any) => {
				window._room.setPlayerAvatar(playerId, avatar);
			},
			{ playerId, avatar }
		);
	}

	/** Sets properties of the target disc.
     ** Properties that are null or undefined will not be set and
     therefor will preserve whatever value the disc already had. */
	async setDiscProperties(
		discIndex: number,
		properties: Partial<DiscProperties>
	): Promise<void> {
		await this.page.evaluate(
			({ discIndex, properties }: any) => {
				window._room.setDiscProperties(discIndex, properties);
			},
			{ discIndex, properties }
		);
	}

	/** Gets the properties of the disc at discIndex.
	 * Returns null if discIndex is out of bounds. */
	async getDiscProperties(discIndex: number): Promise<DiscProperties | null> {
		return await this.page.evaluate(
			({ discIndex }: any) => {
				return window._room.getDiscProperties(discIndex);
			},
			{ discIndex }
		);
	}

	/** Same as setDiscProperties but targets the disc
	 * belonging to a player with the given Id. */
	async setPlayerDiscProperties(
		playerId: number,
		properties: Partial<DiscProperties>
	): Promise<void> {
		await this.page.evaluate(
			({ playerId, properties }: any) => {
				window._room.setPlayerDiscProperties(playerId, properties);
			},
			{ playerId, properties }
		);
	}

	/** Same as getDiscProperties but targets the disc
	 * belonging to a player with the given Id. */
	async getPlayerDiscProperties(
		playerId: number
	): Promise<DiscProperties | null> {
		return await this.page.evaluate(
			({ playerId }: any) => {
				return window._room.getPlayerDiscProperties(playerId);
			},
			{ playerId }
		);
	}

	/** Gets the number of discs in the game including
	 * the ball and player discs. */
	async getDiscCount(): Promise<number> {
		return await this.page.evaluate(() => {
			return window._room.getDiscCount();
		});
	}

	/** Object filled with the collision flags constants that
	 * compose the cMask and cGroup disc properties. */
	public CollisionFlags: CollisionFlags;

	/** Event called when a new player joins the room. */
	public onPlayerJoin?(player: Player): void;

	/** Event called when a player leaves the room. */
	public onPlayerLeave?(player: Player): void;

	/** Event called when a team wins. */
	public onTeamVictory?(scores: Scores): void;

	/** Event called when a player sends a chat message. */
	public onPlayerChat?(player: Player, message: string): void;

	/** Event called when a player kicks the ball. */
	public onPlayerBallKick?(player: Player): void;

	/** Event called when a team scores a goal. */
	public onTeamGoal?(team: TeamID): void;

	/** Event called when a game starts.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onGameStart?(byPlayer: Player | null): void;

	/** Event called when a game stops.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onGameStop?(byPlayer: Player | null): void;

	/** Event called when a player's admin rights are changed.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onPlayerAdminChange?(
		changedPlayer: Player,
		byPlayer: Player | null
	): void;

	/** Event called when a player team is changed.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onPlayerTeamChange?(
		changedPlayer: Player,
		byPlayer: Player | null
	): void;

	/** Event called when a player has been kicked from the room.
	 * This is always called after the onPlayerLeave event.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onPlayerKicked?(
		kickedPlayer: Player,
		reason: string,
		ban: boolean,
		byPlayer: Player | null
	): void;

	/** Event called once for every game tick (happens 60 times per second).
	 * This is useful if you want to monitor the player and ball
	 * positions without missing any ticks.
	 ** This event is not called if the game is paused or stopped. */
	public onGameTick?(): void;

	/** Event called when the game is paused.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onGamePause?(byPlayer: Player | null): void;

	/** Event called when the game is unpaused.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onGameUnpause?(byPlayer: Player | null): void;

	/** Event called when the players and ball positions are
	 * reset after a goal happens. */
	public onPositionsReset?(): void;

	/** Event called when a player gives signs of activity,
	 * such as pressing a key. This is useful for detecting
	 * inactive players. */
	public onPlayerActivity?(player: Player): void;

	/** Event called when the stadium is changed.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onStadiumChange?(
		newStadiumName: string,
		byPlayer: Player | null
	): void;

	/** Event called when the room link is obtained. */
	public onRoomLink?(url: string): void;

	/** Event called when the kick rate is set.
	 * @param byPlayer is the player which caused the
	 * event (can be null if the event wasn't caused by a player). */
	public onKickRateLimitSet?(
		min: number,
		rate: number,
		burst: number,
		byPlayer: Player | null
	): void;
}
