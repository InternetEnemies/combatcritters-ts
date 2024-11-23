import {IUserOfferItem} from "./IUserOfferItem";

/**
 * IUserOfferState.ts
 * @Created 2024-10-26
 * @Brief Compares an offer with the user's inventory
 */

export interface IUserOfferState<T> {
  userOfferItems: IUserOfferItem<T>[]; //Compare the required items with the user's inventory
  canPurchase: boolean; //Whether a user is able to purchase this offer
}
