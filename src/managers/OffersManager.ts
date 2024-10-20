import { IOffer, IDiscountOffer, IRest } from "../index";
import { IOffersManager } from "./index";

export class OffersManager implements IOffersManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    getOffers(): Promise<IOffer[]> {
        throw new Error("Method not implemented.");
    }
    getSpecials(): Promise<IOffer[]> {
        throw new Error("Method not implemented.");
    }
    getDiscounts(): Promise<IDiscountOffer[]> {
        throw new Error("Method not implemented.");
    }
    
}