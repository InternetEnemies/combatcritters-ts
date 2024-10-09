import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../../objects/interfaces/ICardQueryBuilder";

export interface ICardsManager {
    /**
     * Get a card by its id
     * @param id the id of the card to get
     */
    getCard(id: number): Promise<ICard>;
    /**
     * Get cards by a query
     * @param query the query to get cards by
     * @returns Promise<ICard[]> the cards that match the query
     */
    getCards(query: ICardQuery): Promise<ICard[]>;
    /**
     * Get a builder for a card query
     * @returns ICardQueryBuilder the builder for a card query
     */
    getBuilder(): ICardQueryBuilder;
}