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
