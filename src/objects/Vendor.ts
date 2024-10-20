import { Vendor as VendorPayload } from "../rest/payloads";
import { IDiscountOffer, IOffer, IVendor, IVendorReputation } from "./interfaces";

export class Vendor implements IVendor {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _reputation: IVendorReputation;

    public static fromVendorPayload(payload: VendorPayload): Vendor {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(id: number, name: string, reputation: IVendorReputation) {
        this._id = id;
        this._name = name;
        this._reputation = reputation;
    }

    public async getOffers(): Promise<IOffer[]> {
        throw new Error("Method not implemented.");
    }
    public async discountOffers(): Promise<IDiscountOffer[]> {
        throw new Error("Method not implemented.");
    }
    public async getSpecialOffers(): Promise<IOffer[]> {
        throw new Error("Method not implemented.");
    }
    public async purchaseOffer(offer: IOffer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get reputation(): IVendorReputation {
        return this._reputation;
    }
}