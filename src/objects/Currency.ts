import { ICurrency, IItem, IItemVisitor } from "./index";

export class Currency implements ICurrency, IItem {
    private readonly _coins: number;
    
    //TODO: need to have a from payload method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/66
    // We do not have currency task on the list, so this will be the best option

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