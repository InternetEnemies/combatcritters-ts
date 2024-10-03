import { CardRarity } from "./ICard";
import { CardOrder, ICardQuery } from "./ICardQuery";

export interface ICardQueryBuilder {
    setCostGreater(cost: number): void;
    setCostLess(cost: number): void;
    setIds(ids: number[]): void;
    setOrder(order: CardOrder): void;
    setOwned(owned:boolean): void;
    setRarityExclude(limit: CardRarity): void;
    setRarityInclude(limit: CardRarity): void;
    build(): ICardQuery;
    reset(): void;
}