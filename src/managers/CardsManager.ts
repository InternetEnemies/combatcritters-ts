import {ICardsManager} from "./interfaces";
import {IRest} from "../rest";
import {IClient} from "../IClient";
import {Card, CardQueryBuilder, ICard, ICardQuery, ICardQueryBuilder} from "../objects";
import {Card as CardPayload} from "../rest/payloads";
import {Routes} from "../rest";

/**
 * CardsManager.ts
 * @created 2024-09-29
 * @brief Manager for cards
 */

export class CardsManager implements ICardsManager {
    private readonly _rest: IRest;

    constructor(client:IClient) {
        this._rest = client.rest;
    }

    public async getCard(id: number): Promise<ICard> {
        const userRes:CardPayload = await this._rest.get(Routes.Cards.singleCard(id));
        return Card.fromCardPayload(userRes);
    }

    public async getCards(query: ICardQuery): Promise<ICard[]> {
        const userRes:CardPayload[] = await this._rest.get(Routes.Cards.cards(query.getQueryString()));
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