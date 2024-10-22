import { Vendor as VendorPayload } from "../rest/payloads";
import { IDiscountOffer, IOffer, IVendor, IVendorReputation } from "./interfaces";

export class Vendor implements IVendor {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _reputation: IVendorReputation;
    private readonly _image: string;
    private readonly _refrest_time: string;

    public static fromVendorPayload(payload: VendorPayload): Vendor {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/63
        throw new Error("Method not implemented.");
    }

    constructor(id: number, name: string, reputation: IVendorReputation, image: string, refrest_time: string) {
        this._id = id;
        this._name = name;
        this._reputation = reputation;
        this._image = image;
        this._refrest_time = refrest_time;
    }

    public async getOffers(): Promise<IOffer[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/63
        throw new Error("Method not implemented.");
    }
    public async discountOffers(): Promise<IDiscountOffer[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/63
        throw new Error("Method not implemented.");
    }
    public async getSpecialOffers(): Promise<IOffer[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/63
        throw new Error("Method not implemented.");
    }
    public async purchaseOffer(offer: IOffer): Promise<void> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/63
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
    public get image(): string {
        return this._image;
    }
    public get refrest_time(): string {
        return this._refrest_time;
    }
}