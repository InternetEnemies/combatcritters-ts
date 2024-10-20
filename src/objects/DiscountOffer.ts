import { OfferDiscount } from "../rest/payloads";
import { IDiscountOffer, IItemStack, IOffer } from "./index";

export class DiscountOffer implements IDiscountOffer {
    private readonly _offerID: number;
    private readonly _receiveItems: IItemStack<any>[];
    private readonly _giveItem: IItemStack<any>[];
    private readonly _discountedGive: IItemStack<any>[];
    private readonly _discount: number;
    private readonly _discountID: number;
    private readonly _expires: string;
    private readonly _originalOffer: IOffer;

    public static fromDiscountOfferPayload(payload: OfferDiscount): DiscountOffer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(discountedGive: IItemStack<any>[], discount: number, discountID: number, expires: string, originalOffer: IOffer) {
        this._discountedGive = discountedGive;
        this._discount = discount;
        this._discountID = discountID;
        this._expires = expires;
        this._originalOffer = originalOffer;
    }

    public compareUserItems(): IItemStack<any>[] {
        throw new Error("Method not implemented.");
    }

    public get offerID(): number {
        return this._offerID;
    }
    public get receiveItems(): IItemStack<any>[] {
        return this._receiveItems;
    }
    public get giveItem(): IItemStack<any>[] {
        return this._giveItem;
    }
    public get discountedGive(): IItemStack<any>[] {
        return this._discountedGive;
    }
    public get discount(): number {
        return this._discount;
    }
    public get discountID(): number {
        return this._discountID;
    }
    public get expires(): string {
        return this._expires;
    }
    public get originalOffer(): IOffer {
        return this._originalOffer;
    }
}