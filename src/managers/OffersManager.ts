import { IOffer, IDiscountOffer, IRest } from "../index";
import { IOffersManager } from "./index";

export class OffersManager implements IOffersManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    getOffers(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        throw new Error("Method not implemented.");
    }
    getSpecials(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        throw new Error("Method not implemented.");
    }
    getDiscounts(): Promise<IDiscountOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        throw new Error("Method not implemented.");
    }
    
}