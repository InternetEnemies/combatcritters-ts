import { IDiscountOffer, IOffer, IVendorReputation } from "./index";

export interface IVendor {
    id: number;
    name: string;
    Offers: IOffer[];
    reputation: IVendorReputation;
    /**
     * Get discount offers from the vendor
     * @returns list of discount offers from the vendor
     */
    discountOffers(): IDiscountOffer[];
    /**
     * Get special offers from the vendor
     * @returns list of special offers from the vendor
     */
    getSpecialOffers(): IOffer[];
}
