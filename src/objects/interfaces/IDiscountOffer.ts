import { ICard, ICurrency, IItemStack, IOffer, IPack } from "./index";

export interface IDiscountOffer extends IOffer {
    discountedGive: IItemStack<ICurrency | ICard | IPack>[];
    // Discount percentage
    discount: number;
    discountID: number;
}