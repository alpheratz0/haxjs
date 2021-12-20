import { Position } from './position';

export interface Player {
	/** The id of the player, each player that joins the room
	 * gets a unique id that will never change. */
	id: number;

	/** The name of the player. */
	name: string;

	/** The team of the player. */
	team: number;

	/** Whether the player has admin rights. */
	admin: boolean;

	/** The player's position in the field,
	 * if the player is not in the field the value will be null. */
	position: Position | null;

	/** The player's public ID.
	 ** Can be null if the ID validation fails.
	 ** This property is only set in the onPlayerJoin event. */
	auth: string | null;

	/** A string that uniquely identifies the player's connection,
	 * if two players join using the same network this string will be equal.
	 ** This property is only set in the onPlayerJoin event. */
	conn: string;
}
