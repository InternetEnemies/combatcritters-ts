import { OfferDiscount } from "../rest/payloads";
import { IDiscountOffer, IItemStack, IOffer, Offer } from "./index";

export class DiscountOffer extends Offer implements IDiscountOffer {
    private readonly _discountedGive: IItemStack<any>[];
    private readonly _discount: number;
    private readonly _discountID: number;
    private readonly _expires: string;

    public static fromDiscountOfferPayload(payload: OfferDiscount): DiscountOffer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(discountedGive: IItemStack<any>[], discount: number, discountID: number, expires: string, offerID: number, receiveItem: IItemStack<any>, originalGive: IItemStack<any>[]) {
        super(offerID, receiveItem, originalGive);
        this._discountedGive = discountedGive;
        this._discount = discount;
        this._discountID = discountID;
        this._expires = expires;
    }

    public compareUserItems(): IItemStack<any>[] {
        throw new Error("Method not implemented.");
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
}