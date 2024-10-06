import { CardQuery, ICard, IUser } from "../objects";
import { Card } from "../objects/Card";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IUserCardsManager } from "./interfaces";
import { IClient } from "../IClient";
import { CardQueryBuilder } from "../objects/CardQueryBuilder";
import { Card as CardPayload, CardQuery as CardQueryPayload } from "../rest/payloads";
import { Routes } from "../rest";
import { IItemStack } from "../objects/interfaces/IItemStack";
import { ItemStack } from "../objects/ItemStack";

export class UserCardsManager implements IUserCardsManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getCards(query: ICardQuery): Promise<IItemStack<ICard>[]> {
        const userRes: CardQueryPayload[] = await this._client.rest.get(Routes.Cards.User.cards(this._user.id, query.getQueryString()));
        const cardStacks: IItemStack<ICard>[] = [];
        for (let i = 0; i < userRes.length; i++) {
            cardStacks.push(new ItemStack(Card.fromCardPayload(userRes[i].item), userRes[i].count));
        }
        return cardStacks;
    }

    public getBuilder(): ICardQueryBuilder {
        return new CardQueryBuilder();
    }
}