import { Wallet } from "../../rest/payloads";
import { ICurrency, IItem, IItemVisitor } from "../index";

export class Currency implements ICurrency, IItem {
    private readonly _coins: number;
    
    public static fromWalletPayload(payload: Wallet): Currency {
        return new Currency(payload.coins);
    }

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