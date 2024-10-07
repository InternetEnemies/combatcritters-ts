import { IItemStack } from "./interfaces";

export class ItemStack<T> implements IItemStack<T> {
    private readonly _item: T;
    private readonly _amount: number;

    constructor(item: T, amount: number) {
        this._item = item;
        this._amount = amount;
    }
    getItem(): T {
        return this._item;
    }
    getAmount(): number {
        return this._amount;
    }
}