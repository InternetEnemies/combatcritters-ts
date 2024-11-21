import {CardOrder, ICardQuery} from "./ICardQuery";

/**
 * interface for building card queries
 */
export interface ICardQueryBuilder {
    /**
     * set the name to filter cost
     * @param cost the cost to set the filter to
     */
    setCost(cost: number): void;
    /**
     * set whether the cost should be lest than set cost
     */
    setCostLess(): void;
    /**
     * set whether the cost should be lest than set cost
     * @param less whether the cost should be less
     */
    setCostLess(less: boolean): void;
    /**
     * set specific ids to get
     * @param ids the ids to get
     */
    setIds(ids: number[]): void;
    /**
     * set ordering
     * @param order the order to set the filter to
     */
    setOrder(order: CardOrder): void;
    /**
     * set whether only owned cards should be shown
     */
    setOwned(): void;
    /**
     * set whether only owned cards should be shown
     * @param owned whether only owned cards should be shown
     */
    setOwned(owned:boolean): void;
    /**
     *set what rarities to show
     * @param limits the limits to set the filter to
     */
    setRarities(limits: number[]): void;
    /**
     * set whether to include rarities, default is exclude
     */
    setRaritiesInclude(): void; 
    /**
     * set whether to include rarities, default is exclude
     * @param include whether to include rarities
     */
    setRaritiesInclude(include:boolean): void; 
    /**
     * build the query
     * @returns ICardQuery the built query
     */
    build(): ICardQuery;//build the query
    /**
     * reset the builder
     */
    reset(): void;//reset the builder
}