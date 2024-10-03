import { CardRarity } from "./ICard";
import { CardOrder, ICardQuery } from "./ICardQuery";

export interface ICardQueryBuilder {
    setCostGreater(cost: number): void;
    setCostLess(cost: number): void;
    setIds(ids: number[]): void;
    setOrder(order: CardOrder): void;
    setOwned(owned:boolean): void;
    setRarities(limits: number[]): void;
    setInclude(isInclude: boolean): void;
    build(): ICardQuery;
    reset(): void;
}