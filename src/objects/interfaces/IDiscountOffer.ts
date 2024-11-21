import {IOffer} from "./IOffer";
import {IItemStack} from "./IItemStack";
import {ICurrency} from "./ICurrency";
import {ICard} from "./ICard";
import {IPack} from "./IPack";

export interface IDiscountOffer extends IOffer {
    discountedGive: IItemStack<ICurrency | ICard | IPack>[];
    // Discount percentage
    discount: number;
    discountID: number;
}