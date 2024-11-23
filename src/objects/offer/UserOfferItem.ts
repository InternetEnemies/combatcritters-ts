import {IItemStack, IUserOfferItem} from "../interfaces";

/**
 * UserOfferItem.ts
 * @created 2024-10-24
 * @brief Used to compare a required item in an offer to the user's item in their inventory.
 */

export class UserOfferItem<T> implements IUserOfferItem<T> {
    private readonly _giveItem: IItemStack<T>;
    private readonly _userItem: IItemStack<T>;
    
    constructor(giveItem: IItemStack<T>, userItem: IItemStack<T>) {
        this._giveItem = giveItem;
        this._userItem = userItem;
    }

    public get giveItem(): IItemStack<T> {
        return this._giveItem;
    }
    public get userItem(): IItemStack<T> {
        return this._userItem;
    }
}