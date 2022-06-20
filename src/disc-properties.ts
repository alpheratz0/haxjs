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

export interface DiscProperties {
	/** The x coordinate of the disc's position. */
	x: number;

	/** The y coordinate of the disc's position. */
	y: number;

	/** The x coordinate of the disc's speed vector. */
	xspeed: number;

	/** The y coordinate of the disc's speed vector. */
	yspeed: number;

	/** The x coordinate of the disc's gravity vector. */
	xgravity: number;

	/** The y coordinate of the disc's gravity vector. */
	ygravity: number;

	/** The disc's radius. */
	radius: number;

	/** The disc's bouncing coefficient. */
	bCoeff: number;

	/** The inverse of the disc's mass. */
	invMass: number;

	/** The disc's damping factor. */
	damping: number;

	/** The disc's color expressed as an integer. */
	color: number;

	/** The disc's collision mask (Which groups the disc can collide with). */
	cMask: number;

	/** The disc's collision groups. */
	cGroup: number;
}
