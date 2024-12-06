/**
 * @Created 2024-12-04
 * @Brief Observes wager state
 */

import {IItemStack} from "../../objects/interfaces/IItemStack"
import {ICard} from "../../objects/interfaces/ICard"
import { IPack } from "../../objects/interfaces/IPack";
import { ICurrency } from "../..";


export interface IWagerStateObserver {
  /**
   * Sets the cards in the user's inventory. The amount in the item stack changes based
   * on the current wagered amount.
   *
   * @param cards - The user's cards.
   */
  setInventoryCards(cards: IItemStack<ICard>[]): void;

  /**
   * Sets the packs in the user's inventory. The amount in the item stack changes based
   * on the current wagered amount.
   *
   * @param packs - The user's packs.
   */
  setInventoryPacks(packs: IItemStack<IPack>[]): void;

  /**
   * Sets the currency in the user's inventory. The currency amount changes based
   * on the current wagered amount.
   *
   * @param currrency - The user's currency
   */
  setInventoryCurrency(currency: ICurrency): void;

  /**
   * Sets the user's wagered cards.
   *
   * @param cards - The cards the user has wagered.
   */
  setWageredCards(cards: IItemStack<ICard>[]): void;

  /**
   * Sets the user's wagered packs.
   *
   * @param packs - The packs the user has wagered.
   */
  setWageredPacks(packs: IItemStack<IPack>[]): void;

  /**
   * Sets the user's wagered currency.
   *
   * @param currency - The currency the user has wagered.
   */
  setWageredCurrency(currency: ICurrency | null): void;

  /**
   * Sets the opponent's wagered cards.
   *
   * @param cards - The opponent's wagered cards.
   */
  setOppWageredCards(cards: IItemStack<ICard>[]): void;

  /**
   * Sets the opponent's wagered packs.
   *
   * @param packs - The opponent's wagered packs.
   */
  setOppWageredPacks(packs: IItemStack<IPack>[]): void;

  /**
   * Sets the opponent's wagered currency.
   *
   * @param currency - The opponent's wagered currency.
   */
  setOppWageredCurrency(currency: ICurrency | null): void;

  /**
   * Set the user ready state.
   * 
   * @param ready - Is the user ready?
   */
  setUserReady(ready: boolean): void;

  /**
   * Set the opponent ready state.
   * 
   * @param ready - Is the opponent ready?
   */
  setOppReady(ready: boolean): void;
}