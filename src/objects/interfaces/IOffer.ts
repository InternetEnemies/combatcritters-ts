import {IItemStack} from "./IItemStack";
import {ICurrency} from "./ICurrency";
import {ICard} from "./ICard";
import {IPack} from "./IPack";
import {IUserOfferState} from "./IUserOfferState";
import {IPurchaseStatus} from "./IPurchaseStatus";
import {IOfferProto} from "./IOfferProto";

/**
 * IOffer.ts
 * @created 2024-10-29
 * @brief Offer interface
 */

export interface IOffer extends IOfferProto {
  offerID: number;
  vendorID: number;

  /**
   * Accepts the offer.
   * @returns 
   */
  accept(): Promise<IPurchaseStatus>;
}