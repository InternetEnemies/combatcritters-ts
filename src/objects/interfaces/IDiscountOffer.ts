import { IItemStack, IOffer } from "./index";

export interface IDiscountOffer extends IOffer {
    discountedGive: IItemStack<any>[];
    // Discount percentage
    discount: number;
    discountID: number;
    // Date when the discount offer expires
    expires: string;
}