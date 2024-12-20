import {IItemStack} from "./IItemStack";

/**
 * IUserOfferItem.ts
 * @Created 2024-10-24
 * @Brief Used to compare a required item in an offer to the user's item in their inventory.
 */

export interface IUserOfferItem<T> {
  giveItem: IItemStack<T>; //The give item in an offer.
  userItem: IItemStack<T>; //The amount of that item in a user's inventory.
}
