import { IOffer, IDiscountOffer, IRest, Offer, DiscountOffer, Card, ItemStack, CardCritter } from "../index";
import { IOffersManager } from "./index";

export class OffersManager implements IOffersManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    public async getOffers(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const offers: IOffer[] = [];
        for(let i = 0; i < 20; i++) {
            offers[i] = new Offer(i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), []);
        }
        return offers;
    }
    public async getSpecials(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const specials: IOffer[] = [];
        for(let i = 0; i < 20; i++) {
            specials[i] = new Offer(i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), []);
        }
        return specials;
    }
    public async getDiscounts(): Promise<IDiscountOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const discounts: IDiscountOffer[] = [];
        for(let i = 0; i < 20; i++) {
            discounts[i] = new DiscountOffer([], i, i, "", new Offer(i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), []));
        }
        return discounts;
    }
    
}