import {IUserCurrencyManager} from "./interfaces";
import {IClient} from "../IClient";
import {Currency, ICurrency, IUser} from "../objects";
import {Wallet} from "../rest/payloads";
import {Routes} from "../rest/routes/wallet";

/**
 * UserCurrencyManager.ts
 * @created 2024-10-19
 * @brief Manager for user currency
 */

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