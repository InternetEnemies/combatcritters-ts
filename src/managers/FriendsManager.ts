import { IClient } from "../index";
import { IUser } from "../objects/index";
import { IFriendsManager } from "./index";

export class FriendsManager implements IFriendsManager {
    private readonly _user: IUser;
    private readonly _client: IClient;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    getFriends(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    addFriend(user: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getFriendsRequests(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    
}