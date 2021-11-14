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
