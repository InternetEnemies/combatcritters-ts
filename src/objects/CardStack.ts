import { ICard } from "./interfaces";
import { ICardStack } from "./interfaces/ICardStack";

export class CardStack implements ICardStack<ICard> {
    private readonly _card: ICard;
    private readonly _amount: number;

    constructor(card: ICard, amount: number) {
        this._card = card;
        this._amount = amount;
    }

    getCard(): ICard {
        return this._card;
    }
    getAmount(): number {
        return this._amount;
    }
}