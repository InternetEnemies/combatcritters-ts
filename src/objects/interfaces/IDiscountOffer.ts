import { IItemStack, IOffer } from "./index";

export interface IDiscountOffer {
    discountedGiveItem: IItemStack<any>[];
    // Discount percentage
    discount: number;
    discountID: number;
    // Date when the discount offer expires
    expires: string;
    originalOffer: IOffer;
}