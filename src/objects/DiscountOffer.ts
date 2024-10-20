import { OfferDiscount } from "../rest/payloads";
import { IDiscountOffer, IItemStack, IOffer } from "./index";

export class DiscountOffer implements IDiscountOffer {
    private readonly _discountedGiveItem: IItemStack<any>[];
    private readonly _discount: number;
    private readonly _discountID: number;
    private readonly _expires: string;
    private readonly _originalOffer: IOffer;

    public static fromDiscountOfferPayload(payload: OfferDiscount): DiscountOffer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(discountedGiveItem: IItemStack<any>[], discount: number, discountID: number, expires: string, originalOffer: IOffer) {
        this._discountedGiveItem = discountedGiveItem;
        this._discount = discount;
        this._discountID = discountID;
        this._expires = expires;
        this._originalOffer = originalOffer;
    }

    public get discountedGiveItem(): IItemStack<any>[] {
        return this._discountedGiveItem;
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