/**
 * @Created 2024-10-26
 * @Brief Compares an offer with the user's inventory
 */

import { IUserOfferItem } from "./index";

export interface IUserOfferState<T> {
  userOfferItems: IUserOfferItem<T>[]; //Compare the required items with the user's inventory
  canPurchase: boolean; //Whether or not a user is able to purchase this offer
}
