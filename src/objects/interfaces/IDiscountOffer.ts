import {IOffer} from "./IOffer";
import {IItemStack} from "./IItemStack";
import {ICurrency} from "./ICurrency";
import {ICard} from "./ICard";
import {IPack} from "./IPack";

/**
 * IDiscountOffer.ts
 * @created 2024-10-29
 * @brief Discount Offer interface
 */

export interface IDiscountOffer extends IOffer {
    discountedGive: IItemStack<ICurrency | ICard | IPack>[];
    // Discount percentage
    discount: number;
    discountID: number;
}