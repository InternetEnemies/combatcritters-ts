import { ICardQuery, CardOrder, IItemStack, ICard } from "./interfaces";
import { Card as CardPayload, CardQuery as CardQueryPayload } from "../rest/payloads";
import { ItemStack } from "./ItemStack";
import { Card } from "./Card";

export class CardQuery implements ICardQuery {
    private readonly cost!: number;
    private readonly costLess!: boolean;
    private readonly ids!: number[];
    private readonly order!: CardOrder;
    private readonly owned!: boolean;
    private readonly rarities!: number[];
    private readonly raritiesInclude!: boolean;

    public static fromCardQueryPayloads(cards: CardQueryPayload[]): IItemStack<ICard>[] {
        const cardStacks: IItemStack<ICard>[] = cards.map(card => new ItemStack(Card.fromCardPayload(card.item), card.count));
        return cardStacks;
    }

    constructor(cost: number, costLess: boolean, ids: number[], order: CardOrder, owned: boolean, rarities: number[], rarityInclude: boolean) {
        this.cost = cost;
        this.costLess = costLess;
        this.ids = ids;
        this.order = order;
        this.owned = owned;
        this.rarities = rarities;
        this.raritiesInclude = rarityInclude;
    }

    public getQueryString(): string {
        let queryStrings:string[] = [];
        if (this.cost) queryStrings.push(`cost=${this.cost}`)
        if (this.costLess) queryStrings.push(`costLess=${this.costLess}`)
        if (this.ids.length > 0) queryStrings.push(`ids=${this.ids.join(',')}`) 
        if (this.order) queryStrings.push(`order=${this.order}`)
        if (this.owned) queryStrings.push(`owned=${this.owned}`)
        if (this.rarities.length > 0) queryStrings.push(`rarities=${this.rarities.join(',')}`)
        if (this.raritiesInclude) queryStrings.push(`rarityInclude=${this.raritiesInclude}`)
        
        return queryStrings.join("&")
    }

    public get Cost(): number {
        return this.cost;
    }
    public get CostLess(): boolean {
        return this.costLess;
    }
    public get Ids(): number[] {
        return this.ids;
    }
    public get Order(): CardOrder {
        return this.order;
    }
    public get Owned(): boolean {
        return this.owned;
    }
    public get Rarities(): number[] {
        return this.rarities;
    }
    public get RarityInclude(): boolean {
        return this.raritiesInclude;
    }
}