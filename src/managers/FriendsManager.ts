import { IClient } from "../index";
import { IUser, User } from "../objects/index";
import { Payloads, Routes } from "../rest/index";
import { IFriendsManager } from "./index";

export class FriendsManager implements IFriendsManager {
    private readonly _user: IUser;
    private readonly _client: IClient;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getFriends(): Promise<IUser[]> {
        const response:Payloads.UserPayload[] = await this._client.rest.get(Routes.Friends.User.friends(this._user.id));
        return this.fromUserPayloadsToUsers(response);
    }

    public async addFriend(user: IUser): Promise<void> {
        let friend:Payloads.FriendPayload = {username:user.username};
        await this._client.rest.post(Routes.Friends.User.friends(this._user.id), friend);
    }

    public async getFriendsRequests(): Promise<IUser[]> {
        const response:Payloads.UserPayload[] = await this._client.rest.get(Routes.Friends.User.friendRequests(this._user.id));
        return this.fromUserPayloadsToUsers(response);
    }

    /**
     * Converts an array of UserPayloads to an array of IUser
     * @param response array of UserPayloads
     * @returns an array of IUser
     */
    private fromUserPayloadsToUsers(response:Payloads.UserPayload[]):IUser[]{
        let users: IUser[] = [];
        for (let i = 0; i < response.length; i++) {
            users.push(User.fromUserPayload(this._client, response[i]));
        }
        return users;
    }
}