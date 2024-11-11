import {  IUserOfferItem, IUserOfferState } from '../interfaces';

export class UserOfferState<T> implements IUserOfferState<T> {
    private readonly _userOfferItems: IUserOfferItem<T>[];
    private readonly _canPurchase: boolean;

    constructor(userOfferItems: IUserOfferItem<T>[], canPurchase: boolean) {
        this._userOfferItems = userOfferItems;
        this._canPurchase = canPurchase;
    }

    public get userOfferItems(): IUserOfferItem<T>[] {
        return this._userOfferItems;
    }
    public get canPurchase(): boolean {
        return this._canPurchase;
    }
}