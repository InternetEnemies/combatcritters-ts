import {ICard, ICardQuery, ICardQueryBuilder, IItemStack} from "../../objects";

/**
 * IUserCardsManager.ts
 * @created 2024-09-28
 * @brief Interface for the user cards manager
 */

export interface IUserCardsManager {
    /**
     * Get the cards of the user
     * @param query the query to get the cards
     * @returns Promise<IItemStack<ICard>[]> the cards of the user
     */
    getCards(query: ICardQuery): Promise<IItemStack<ICard>[]>;
    /**
     * Get the query builder for the cards
     * @returns ICardQueryBuilder the query builder for the cards
     */
    getBuilder(): ICardQueryBuilder;
}