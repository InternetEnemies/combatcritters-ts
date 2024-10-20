import { ICurrency, IItem, IItemVisitor } from "./index";

export class Currency implements ICurrency, IItem {
    private readonly _coins: number;

    constructor(coins: number) {
        this._coins = coins;
    }
    
    public accept(visitor: IItemVisitor): void {
        visitor.visitCurrency(this);
    }

    public get coins(): number {
        return this._coins;
    }
}