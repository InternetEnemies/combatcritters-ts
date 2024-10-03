import { ICard } from "../objects";
import { Card } from "../objects/Card";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IUserCardsManager } from "./interfaces";
import { IClient } from "../IClient";
import { CardQueryBuilder } from "../objects/CardQueryBuilder";
import { Card as CardPayload } from "../rest/payloads";
import { Routes } from "../rest";

export class UserCardsManager implements IUserCardsManager {
    private readonly _client: IClient;

    constructor(client:IClient){
        this._client = client;
    }

    public async getCards(query: ICardQuery): Promise<ICard[]> {
        const queryParams = [
            "costGreater=" + query.costGreater,
            "costLess=" + query.costLess,
            "id=" + query.ids.join(","),
            "order=" + query.order,
            "owned=" + query.owned,
            "rarityExclude=" + query.rarityExclude,
            "rarityInclude=" + query.rarityInclude
        ].join("&");
        const userRes:CardPayload[] = await this._client.rest.get(Routes.Cards.User.cards(this._client.user.id, queryParams));
        const cards: ICard[] = [];
        for (let i = 0; i < userRes.length; i++) {
            cards.push(Card.fromCardPayload(userRes[i]));
        }
        return cards;
    }

    public getBuilder(): ICardQueryBuilder {
        return new CardQueryBuilder();
    }
}