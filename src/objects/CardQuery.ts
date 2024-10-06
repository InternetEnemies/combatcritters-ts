import { ICardQuery, CardOrder } from "./interfaces/ICardQuery";

export class CardQuery implements ICardQuery {
    private costGreater: number;
    private costLess: number;
    private ids: number[];
    private order: CardOrder;
    private owned: string;
    private rarityExclude: string;
    private rarityInclude: string;

    constructor(costGreater: number, costLess: number, ids: number[], order: CardOrder, owned: string, rarityExclude: string, rarityInclude: string) {
        this.costGreater = costGreater;
        this.costLess = costLess;
        this.ids = ids;
        this.order = order;
        this.owned = owned;
        this.rarityExclude = rarityExclude;
        this.rarityInclude = rarityInclude;
    }

    public getQueryString(): string {
        return [
            "costGreater=" + this.costGreater,
            "costLess=" + this.costLess,
            "id=" + this.ids.join(","),
            "order=" + this.order,
            "owned=" + this.owned,
            "rarityExclude=" + this.rarityExclude,
            "rarityInclude=" + this.rarityInclude
        ].join("&");
    }

    public get CostGreater(): number {
        return this.costGreater;
    }
    public get CostLess(): number {
        return this.costLess;
    }
    public get Ids(): number[] {
        return this.ids;
    }
    public get Order(): CardOrder {
        return this.order;
    }
    public get Owned(): string {
        return this.owned;
    }
    public get RarityExclude(): string {
        return this.rarityExclude;
    }
    public get RarityInclude(): string {
        return this.rarityInclude;
    }
}