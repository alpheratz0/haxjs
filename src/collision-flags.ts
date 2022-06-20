/*
	Copyright (C) 2022 <alpheratz99@protonmail.com>

	This program is free software; you can redistribute it and/or modify it under
	the terms of the GNU General Public License version 2 as published by the
	Free Software Foundation.

	This program is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along with
	this program; if not, write to the Free Software Foundation, Inc., 59 Temple
	Place, Suite 330, Boston, MA 02111-1307 USA

*/

export interface CollisionFlags {
	/** This is the default collision group of the ball. */
	ball: number;

	/** This layer is automatically added to players of the red team. */
	red: number;

	/** This layer is automatically added to players of the blue team. */
	blue: number;

	/** This layer represents kickoff barriers that become active during kickOff for the red team. */
	redKO: number;

	/** This layer represents kickoff barriers that become active during kickOff for the blue team. */
	blueKO: number;

	/** This is the default collision group for vertexes segments and planes. */
	wall: number;

	/** Represents a set including ball, red, blue, redKO, blueKO and wall. */
	all: number;

	/** Objects with this flag in their cGroup will become kickable by the players. */
	kick: number;

	/** Objects with this flag in their cGroup will score goals if they cross a goal line. */
	score: number;

	/** Has no special meaning and can be used for any purpose. */
	c0: number;

	/** Has no special meaning and can be used for any purpose. */
	c1: number;

	/** Has no special meaning and can be used for any purpose. */
	c2: number;

	/** Has no special meaning and can be used for any purpose. */
	c3: number;
}
