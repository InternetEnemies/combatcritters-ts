import { IOffer } from "./index";

export interface IDiscountOffer extends IOffer {
    // Discount percentage
    discount: number;
    discountID: number;
    // Date when the discount offer expires
    expires: string;
    originalOffer: IOffer;

    /**
     * Get the number of days left until the discount offer expires
     * @returns number of days left until the discount offer expires
     */
    getDaysLeft(): number;
}