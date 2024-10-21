import { UserPayload } from "./auth";

/**
 * Friend related payloads
 */
export type FriendPayload = {
    username: string;
}

export type Friends = UserPayload[]