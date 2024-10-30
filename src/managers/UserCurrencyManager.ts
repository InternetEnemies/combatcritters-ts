import { IClient,IUserCurrencyManager, IUser, ICurrency, Currency } from "../index";
import { Wallet } from "../rest/payloads";
import { Routes } from "../rest/routes/wallet";

export class UserCurrencyManager implements IUserCurrencyManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCurrency(): Promise<ICurrency> {
        let response:Wallet = await this._client.rest.get(Routes.User.wallet(this._user.id));
        return Currency.fromWalletPayload(response);
    }
}