import { CardRarity } from "./ICard";
import { CardOrder, ICardQuery } from "./ICardQuery";

export interface ICardQueryBuilder {
    setCostGreater(cost: number): void;
    setCostLess(cost: number): void;
    setIds(ids: number[]): void;
    setOrder(order: CardOrder): void;
    setOwned(): void;
    setNotOwned(): void; //default
    setRarities(limits: number[]): void;
    setInclude(): void; //default
    setExclude(): void;
    build(): ICardQuery;
    reset(): void;
}