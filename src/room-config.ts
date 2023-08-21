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

import { GeoLocation } from './geo-location';

export interface RoomConfig {
	/** The name for the room. */
	roomName: string;

	/** The name for the host player. */
	playerName?: string;

	/** The password for the room (no password if ommited). */
	password?: string;

	/** Max number of players the room accepts.  */
	maxPlayers?: number;

	/** If true the room will appear in the room list. */
	public?: boolean;

	/** GeoLocation override for the room. */
	geo?: GeoLocation;

	/** Token that can be obtained on https://www.haxball.com/headlesstoken.
	 ** These tokens will expire after a few minutes. */
	token: string;

	/** If set to true the room player list will be empty,
	 * the playerName setting will be ignored. */
	noPlayer?: boolean;
}
