import { IDiscountOffer, IOffer, IVendorReputation } from "./index";

export interface IVendor {
    id: number;
    name: string;
    reputation: IVendorReputation;
    image: string;
    refrest_time: string;
    /**
     * Get offers from the vendor
     * @returns list of offers from the vendor
     */
    getOffers(): Promise<IOffer[]>;
    /**
     * Get discount offers from the vendor
     * @returns list of discount offers from the vendor
     */
    discountOffers(): Promise<IDiscountOffer[]>;
    /**
     * Get special offers from the vendor
     * @returns list of special offers from the vendor
     */
    getSpecialOffers(): Promise<IOffer[]>;
    /**
     * Purchase an offer from the vendor
     * @param offer the offer to purchase
     */
    purchaseOffer(offer: IOffer): Promise<void>;
}
