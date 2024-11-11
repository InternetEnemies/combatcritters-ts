import {CardOrder, ICardQuery, ICardQueryBuilder} from "../interfaces";
import {CardQuery} from "./CardQuery";

export class CardQueryBuilder implements ICardQueryBuilder{

    private cost!: number;
    private costLess!: boolean;
    private ids!: number[];
    private order!: CardOrder;
    private owned!: boolean;
    private rarities!: number[];
    private isInclude!: boolean;

    constructor() {
        this.reset()
    }
    public build(): ICardQuery {
        return new CardQuery(
            this.cost,
            this.costLess,
            this.ids,
            this.order,
            this.owned,
            this.rarities,
            this.isInclude
        );
    }
    
    public reset():void {
        this.cost = 0;
        this.costLess = false;
        this.ids = [];
        this.order = CardOrder.NONE;
        this.owned = false;
        this.rarities = [];
        this.isInclude = false;
    }

    public setCost(cost: number): void {
        this.cost= cost;
    }
    public setCostLess(costLess:boolean = true): void {
        this.costLess = costLess;
    }
    public setIds(ids: number[]): void {
        this.ids = ids;
    }
    public setOrder(order: CardOrder): void {
        this.order = order;
    }
    public setOwned(owned:boolean=true): void {
        this.owned = owned;
    }
    public setRarities(rarities: number[]): void {
        this.rarities = rarities;
    }
    public setRaritiesInclude(include:boolean = true): void {
        this.isInclude = include;
    }
}