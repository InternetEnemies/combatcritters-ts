import { ICard, ICurrency, IItemStack, IPack, IUserOfferState } from "../index";

export interface IOffer {
  offerID: number;
  receiveItem: IItemStack<ICurrency | ICard | IPack>;
  giveItem: IItemStack<ICurrency | ICard | IPack>[];

  /**
   * Compare the items the user has to the items the offer gives
   * @returns list of items the user misses to get the offer
   */
  compareUserItems(): Promise<IUserOfferState<IPack | ICard | ICurrency>>;

  /**
   * Accepts the offer.
   * @returns whether or not the transaction was successful.
   */
  accept(): Promise<void>;
}