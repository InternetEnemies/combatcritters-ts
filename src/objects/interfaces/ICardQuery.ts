/**
 * ICardQuery.ts
 * @created 2024-09-30
 * @brief Interface for the card query & Card order string
 */

/**
 * Interface for the card query
 */
export interface ICardQuery {
    /**
     * Get the query string that use in the request
     * @returns string the query string
     */
    getQueryString(): string;
}

/**
 * Card order string
 */
export enum CardOrder {
    NONE = "",
    ID = "ID",
    NAME = "NAME",
    PLAY_COST = "PLAY_COST",
    RARITY = "RARITY"
}