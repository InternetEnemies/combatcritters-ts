import {IUserInfo} from "../interfaces";
import {UserPayload} from "../../rest/payloads";

/**
 * UserInfo.ts
 * @created 2024-11-29
 * @brief User info, mainly for trading
 */

export class UserInfo implements IUserInfo {
    private readonly _username: string;
    private readonly _id: number;

    static fromUserPayload(payload:UserPayload): UserInfo {
        return new UserInfo(
            payload.username,
            payload.id
        )
    }

    constructor(username: string, id: number) {
        this._username = username;
        this._id = id;
    }

    public get username(): string {
        return this._username;
    }

    public get id(): number {
        return this._id;
    }
}