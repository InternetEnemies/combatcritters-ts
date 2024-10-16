import { IPack } from "../objects/index";
import { IClient, IUser } from "../index";
import { IPacksManager } from "./index";

export class PacksManager implements IPacksManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getPacks(): Promise<IPack[]> {
        throw new Error("Method not implemented.");
    }
}