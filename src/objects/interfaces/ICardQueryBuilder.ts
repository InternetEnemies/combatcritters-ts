import { CardOrder, ICardQuery } from "./ICardQuery";

/**
 * interface for building card queries
 */
export interface ICardQueryBuilder {
    setCost(cost: number): void;// set the filter cost
    //set whether the cost should be lest than set cost
    setCostLess(): void;
    setCostLess(less: boolean): void;
    //set specific ids to get
    setIds(ids: number[]): void;
    setOrder(order: CardOrder): void;// set ordering
    //set whether only owned cards should be shown
    setOwned(): void;
    setOwned(owned:boolean): void;
    //set what rarities to show
    setRarities(limits: number[]): void;
    setRaritiesInclude(): void; 
    setRaritiesInclude(include:boolean): void; 
    build(): ICardQuery;//build the query
    reset(): void;//reset the builder
}