import { IOffer, IDiscountOffer, IRest, Offer, DiscountOffer, Card, ItemStack, CardCritter, IClient } from "../index";
import { IOffersManager } from "./index";

export class OffersManager implements IOffersManager {
    private readonly _client: IClient;

    constructor(client: IClient) {
        this._client = client;
    }

    public async getOffers(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const offers: IOffer[] = [];
        for(let i = 0; i < 20; i++) {
            offers[i] = new Offer(i, i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), [], this._client);
        }
        return offers;
    }
    public async getSpecials(): Promise<IOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const specials: IOffer[] = [];
        for(let i = 0; i < 20; i++) {
            specials[i] = new Offer(i, i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), [], this._client);
        }
        return specials;
    }
    public async getDiscounts(): Promise<IDiscountOffer[]> {
        //TODO: Implement this method
        //https://github.com/InternetEnemies/combatcritters-ts/issues/60
        const discounts: IDiscountOffer[] = [];
        for(let i = 0; i < 20; i++) {
            discounts[i] = new DiscountOffer([], i, i, i, i, new ItemStack(new CardCritter(i, "", 0, 0, "", "", 0, 0, []), 1), [], this._client);
        }
        return discounts;
    }
    
}