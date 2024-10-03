import { IClient } from "../IClient";
import { ICard } from "../objects";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { Routes } from "../rest";
import  {ICardsManager } from "./interfaces";
import { Card as CardPayload } from "../rest/payloads";

export class CardsManager implements ICardsManager {
    private readonly _client: IClient;

    constructor(client: IClient) {
        this._client = client;
    }

    public async getCard(id: number): Promise<ICard> {
        const userRes:CardPayload = await this._client.rest.get(Routes.Cards.singleCard(id));
        return new ICard(userRes);
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
        const userRes:CardPayload[] = await this._client.rest.get(Routes.Cards.cards(queryParams));
        const cards: ICard[] = [];
        for (let i = 0; i < userRes.length; i++) {
            cards.push(new ICard(userRes[i]));
        }
        return cards;
    }

    public getBuilder(): ICardQueryBuilder {
        throw new Error("Method not implemented.");
    }
}