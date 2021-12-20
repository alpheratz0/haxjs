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
