import { ICard } from "../objects";
import { Card } from "../objects/Card";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IUserCardsManager } from "./interfaces";
import { IClient } from "../IClient";
import { CardQueryBuilder } from "../objects/CardQueryBuilder";
import { Card as CardPayload } from "../rest/payloads";
import { Routes } from "../rest";
import { ICardStack } from "../objects/interfaces/ICardStack";
import { CardStack } from "../objects/CardStack";

export class UserCardsManager implements IUserCardsManager {
    private readonly _client: IClient;

    constructor(client:IClient){
        this._client = client;
    }

    public async getCards(query: ICardQuery): Promise<ICardStack<ICard>[]> {
        const userRes: CardPayload[] = await this._client.rest.get(Routes.Cards.User.cards(this._client.user.id, query.getQueryString()));
        const cardStacks: ICardStack<ICard>[] = [];
        const cardCountMap: Map<CardPayload, number> = new Map();
        for (let i = 0; i < userRes.length; i++) {
            const cardPayload = userRes[i];
            if (cardCountMap.has(cardPayload)) {
                cardCountMap.set(cardPayload, cardCountMap.get(cardPayload)! + 1);
            } else {
                cardCountMap.set(cardPayload, 1);
            }
        }
        cardCountMap.forEach((amount, cardPayload) => {
            cardStacks.push(new CardStack(Card.fromCardPayload(cardPayload), amount));
        });
        return cardStacks;
    }

    public getBuilder(): ICardQueryBuilder {
        return new CardQueryBuilder();
    }
}