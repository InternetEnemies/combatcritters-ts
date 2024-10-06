import { ICard } from "./ICard";

export interface ICardStack<ICard> {
    /**
     * Get the card in the stack
     * @returns {ICard} The card in the stack
     */
    getCard(): ICard;
    /**
     * Get the amount of cards in the stack
     * @returns {number} The amount of cards in the stack
     */
    getAmount(): number;
}