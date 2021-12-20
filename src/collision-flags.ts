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
