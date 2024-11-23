import {ICurrency, IItem} from "../interfaces";
import {Wallet} from "../../rest/payloads";
import {IItemVisitor} from "../visitor";

/**
 * Currency.ts
 * @created 2024-10-29
 * @brief Currency object
 */

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