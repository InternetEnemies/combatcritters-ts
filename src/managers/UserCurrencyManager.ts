import { IClient,IUserCurrencyManager, IUser } from "../index";

export class UserCurrencyManager implements IUserCurrencyManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCoins(): Promise<number> {
        //TODO: Implement
        // https://github.com/InternetEnemies/combatcritters-ts/issues/66
        throw new Error("Method not implemented.");
    }
}