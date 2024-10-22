import { ICard } from "../objects";
import { Card } from "../objects/Card";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IRest, Routes } from "../rest";
import { ICardsManager } from "./interfaces";
import { Card as CardPayload } from "../rest/payloads";
import { CardQueryBuilder } from "../objects/CardQueryBuilder";
import {IClient} from "../IClient";

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