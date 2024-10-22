import { IDiscountOffer, IOffer } from "../../index";

export interface IOffersManager {
    /**
     * Get all offers
     * @returns Promise<IOffer[]> all offers
     */
    getOffers(): Promise<IOffer[]>;
    /**
     * Get all special offers
     * @returns Promise<IOffer[]> all special offers
     */
    getSpecials(): Promise<IOffer[]>;
    /**
     * Get all discount offers
     * @returns Promise<IDiscountOffer[]> all discount offers
     */
    getDiscounts(): Promise<IDiscountOffer[]>;
}