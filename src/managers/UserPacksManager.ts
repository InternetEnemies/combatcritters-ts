import { IUserPack } from "../objects/index";
import { IClient, IUser } from "../index";
import { IUserPacksManager } from "./index";
import { Routes } from '../rest/routes/packs';
import { Pack as PackPayload } from '../rest/payloads/index';
import { UserPack } from "../objects/index";

export class UserPacksManager implements IUserPacksManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getPacks(): Promise<IUserPack[]> {
        const response:PackPayload[] = await this._client.rest.get(Routes.User.packs(this._user.id));
        const packs:IUserPack[] = response.map((pack) => UserPack.fromPackPayload(pack, this._client, this._user));
        return packs;
    }
}