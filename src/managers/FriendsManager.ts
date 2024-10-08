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
        let users: IUser[] = [];
        for (let i = 0; i < response.length; i++) {
            users.push(User.fromUserPayload(this._client, response[i]));
        }
        return users;
    }

    public async addFriend(user: IUser): Promise<void> {
        let friend:Payloads.FriendPayload = {username:user.username};
        await this._client.rest.post(Routes.Friends.User.friends(this._user.id), friend);
    }

    getFriendsRequests(): Promise<IUser[]> {
        
    }
}