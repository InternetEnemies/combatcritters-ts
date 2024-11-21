import {IUserCardsManager} from "./interfaces";
import {IClient} from "../IClient";
import {CardQuery, CardQueryBuilder, ICard, ICardQuery, ICardQueryBuilder, IItemStack, IUser} from "../objects";
import {Routes} from "../rest";
import {CardQuery as CardQueryPayload} from "../rest/payloads";

export class UserCardsManager implements IUserCardsManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCards(query: ICardQuery): Promise<IItemStack<ICard>[]> {
        const userRes: CardQueryPayload[] = await this._client.rest.get(Routes.Cards.User.cards(this._user.id, query.getQueryString()));
        return CardQuery.fromCardQueryPayloads(userRes);
    }

    public getBuilder(): ICardQueryBuilder {
        return new CardQueryBuilder();
    }
}