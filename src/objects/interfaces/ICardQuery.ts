export interface ICardQuery {
    getQueryString(): string;
}

export enum CardOrder {
    ID,
    NAME,
    PLAY_COST,
    RARITY
}