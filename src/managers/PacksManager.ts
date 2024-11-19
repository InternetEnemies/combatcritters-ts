import {IPacksManager} from "./interfaces";
import {IClient} from "../IClient";
import {IItemStack, IUser, IUserPack, UserPack} from "../objects";
import {Routes} from "../rest/routes/packs";
import {UserPack as UserPackPayload} from "../rest/payloads";

export class PacksManager implements IPacksManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getPacks(): Promise<IItemStack<IUserPack>[]> {
        const response:UserPackPayload[] = await this._client.rest.get(Routes.User.packs(this._user.id));
        const packs:IItemStack<IUserPack>[] = response.map((pack) => UserPack.fromUserPackPayload(pack, this._client.rest, this._user));
        return packs;
    }
}