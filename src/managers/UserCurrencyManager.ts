import { IClient,IUserCurrencyManager, IUser } from "../index";

export class UserCurrencyManager implements IUserCurrencyManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCoins(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}