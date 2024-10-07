export interface ICardQuery {
    getQueryString(): string;
}

export enum CardOrder {
    NONE = "",
    ID = "ID",
    NAME = "NAME",
    PLAY_COST = "PLAY_COST",
    RARITY = "RARITY"
}