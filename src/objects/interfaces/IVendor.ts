import {IVendorReputation} from "./IVendorReputation";
import {IOffer} from "./IOffer";
import {IDiscountOffer} from "./IDiscountOffer";
import {ISpecialOffer} from "./ISpecialOffer";

/**
 * IVendor.ts
 * @created 2024-10-29
 * @brief Vendor interface
 */

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
    getSpecialOffers(): Promise<ISpecialOffer[]>;
}
