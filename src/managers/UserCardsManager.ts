import { CardQuery, ICard, IUser } from "../objects";
import { Card } from "../objects/card/Card";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IUserCardsManager } from "./interfaces";
import { IClient } from "../IClient";
import { CardQueryBuilder } from "../objects/card/CardQueryBuilder";
import { Card as CardPayload, CardQuery as CardQueryPayload } from "../rest/payloads";
import { Routes } from "../rest";
import { IItemStack } from "../objects/interfaces/IItemStack";
import { ItemStack } from "../objects/itemstack/ItemStack";

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