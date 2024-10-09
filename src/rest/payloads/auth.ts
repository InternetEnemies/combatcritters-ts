/**
 * Payloads for the auth routes
 */
export type LoginPayload = {
    username: string;
    password: string;
}

export type RegisterPayload = {
    username: string;
    password: string;
}

export type UserPayload = {
    username: string;
    id: number;
}
