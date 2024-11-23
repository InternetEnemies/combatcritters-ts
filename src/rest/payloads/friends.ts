import { UserPayload } from "./auth";

/**
 * friends.ts
 * @created 2024-10-29
 * @brief Friend related payloads
 */
export type FriendPayload = {
    username: string;
}

export type Friends = UserPayload[]