/**
 * @Created 2024-12-04
 * @Brief Handles wager commands.
 */

import { ICard, ICurrency, IPack } from "../..";

export interface IWagerController {
  /**
   * Set the user's ready state.
   *
   * @param ready - Is the user ready?
   */
  ready(ready: boolean): void;

  /**
   * Adds card to user's wagered items. If a card of this type has already been wagered
   * this will increment the item stack count by 1.
   *
   * @param card - Card to add.
   */
  addCard(card: ICard): void;

  /**
   * Adds pack to user's wagered items. If a pack of this type has already been wagered
   * this will increment the item stack count by 1.
   *
   * @param pack - Pack to add.
   */
  addPack(pack: IPack): void;

  /**
   * Adds currency to user's wagerd items. If currency is already wagered this will add
   * to that amount.
   *
   * @param currency - Currency to add.
   */
  addCurrency(currency: ICurrency): void;

  /**
   * Removes card from the user's wagered items. This will decrement the item stack count
   * by 1.
   *
   * @param card - The card to remove.
   */
  removeCard(card: ICard): void;

  /**
   * Removes pack from the user's wagered items. This will decrement the item stack count
   * by 1.
   *
   * @param pack - The pack to remove.
   */
  removePack(pack: IPack): void;

  /**
   * Removes currency from the user's wagerd items. If currency is already wagered this
   * will subtract from that amount.
   *
   * @param currency - Currency amount to remove.
   */
  removeCurrency(currency: ICurrency): void;
}
