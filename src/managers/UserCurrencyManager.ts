import { IClient,IUserCurrencyManager, IUser, ICurrency, Currency } from "../index";

export class UserCurrencyManager implements IUserCurrencyManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCurrency(): Promise<ICurrency> {
        //TODO: Implement
        // https://github.com/InternetEnemies/combatcritters-ts/issues/66
        return new Currency(10);
    }
}