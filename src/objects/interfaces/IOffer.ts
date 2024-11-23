import {IItemStack} from "./IItemStack";
import {ICurrency} from "./ICurrency";
import {ICard} from "./ICard";
import {IPack} from "./IPack";
import {IUserOfferState} from "./IUserOfferState";
import {IPurchaseStatus} from "./IPurchaseStatus";

/**
 * IOffer.ts
 * @created 2024-10-29
 * @brief Offer interface
 */

export interface IOffer {
  offerID: number;
  vendorID: number;
  receiveItem: IItemStack<ICurrency | ICard | IPack>;
  giveItem: IItemStack<ICurrency | ICard | IPack>[];

  /**
   * Compare the items the user has to the items the offer gives
   * @returns list of items the user misses to get the offer
   */
  compareUserItems(): Promise<IUserOfferState<IPack | ICard | ICurrency>>;

  /**
   * Accepts the offer.
   * @returns 
   */
  accept(): Promise<IPurchaseStatus>;
}