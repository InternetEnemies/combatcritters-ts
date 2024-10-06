export interface ICardQuery {
    costGreater: number;
    costLess: number;
    ids: number[];
    order: CardOrder;
    owned: string;
    rarityExclude: string;
    rarityInclude: string;
    getQueryString(): string;
}

export enum CardOrder {
    ID,
    NAME,
    PLAY_COST,
    RARITY
}