import { IOffer } from "./index";

export interface IDiscountOffer extends IOffer {
    // Discount percentage
    discount: number;
    discountID: number;
    // Date when the discount offer expires
    expires: string;
    originalOffer: IOffer;
}