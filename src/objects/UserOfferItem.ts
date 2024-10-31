import { IItemStack, IUserOfferItem } from "./interfaces/index";

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