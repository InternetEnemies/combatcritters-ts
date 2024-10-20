import { IPack } from "../objects/index";
import { IClient, IUser } from "../index";
import { IPacksManager } from "./index";
import { Pack } from "../objects/index";

export class PacksManager implements IPacksManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getPacks(): Promise<IPack[]> {
        //TODO: implement this
        // https://github.com/InternetEnemies/combatcritters-ts/issues/68
        const packs: IPack[] = [];
        for(let i = 0; i < 20; i++) {
            packs[i] = new Pack("/assets/images/pack.png", "Into the Robverse", 0);
        }
    return packs;
    }
}