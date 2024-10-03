import { ICardQuery, CardOrder } from "./interfaces/ICardQuery";
import { CardQuery } from "./CardQuery";
import { CardRarity } from "./interfaces";

export class CardQueryBuilder {

    private costGreater: number;
    private costLess: number;
    private ids: number[];
    private order: CardOrder;
    private owned: boolean;
    private rarityExclude: string;
    private rarityInclude: string;

    constructor() {
        this.costGreater = -1;
        this.costLess = Number.MAX_VALUE;
        this.ids = [];
        this.order = CardOrder.ID;
        this.owned = false;
        this.rarityExclude = "";
        this.rarityInclude = "";
    }

    public build(): ICardQuery {
        return new CardQuery(
            this.costGreater,
            this.costLess,
            this.ids,
            this.order,
            this.owned ? "true" : "false",
            this.rarityExclude.trim(),
            this.rarityInclude.trim()
        );
    }

    public reset(): void {
        this.costGreater = -1;
        this.costLess = Number.MAX_VALUE;
        this.ids = [];
        this.order = CardOrder.ID;
        this.owned = false;
        this.rarityExclude = "";
        this.rarityInclude = "";
    }

    public setCostGreater(cost: number): void {
        this.costGreater = cost;
    }
    public setCostLess(cost: number): void {
        this.costLess = cost;
    }
    public setIds(ids: number[]): void {
        this.ids = ids;
    }
    public setOrder(order: CardOrder): void {
        this.order = order;
    }
    public setOwned(owned: boolean): void {
        this.owned = owned;
    }
    public setRarityExclude(limit: CardRarity): void {
        this.rarityExclude += (" "+CardRarity[limit]+",");
    }
    public setRarityInclude(limit: CardRarity): void {
        this.rarityInclude += (" "+CardRarity[limit]+",");
    }

    get CostGreater() {
        return this.costGreater;
    }
    get CostLess() {
        return this.costLess;
    }
    get Ids() {
        return this.ids;
    }
    get Order() {
        return this.order;
    }
    get Owned() {
        return this.owned;
    }
    get RarityExclude() {
        return this.rarityExclude.trim();
    }
    get RarityInclude() {
        return this.rarityInclude.trim();
    }
}