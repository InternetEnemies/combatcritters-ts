import { IProfileManager } from "./index";
import { IDeck, IUser } from "../objects/index";
import { IClient } from "../index";

export class ProfileManager implements IProfileManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    getProfile(): Promise<IDeck> {
        throw new Error('Method not implemented.');
    }

    setProfile(deck: IDeck): Promise<void> {
        throw new Error('Method not implemented.');
    }
}