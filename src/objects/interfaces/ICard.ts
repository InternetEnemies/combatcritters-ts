import {ICardVisitor} from "../visitor";

/**
 * ICard.ts
 * @Created 2024-09-28
 * @Brief this file contains interfaces for handling both critter and item cards.
 */

export interface ICard {
  cardid: number;
  name: string;
  playcost: number;
  rarity: number;
  image: string;
  description: string;
  /**
   * Accept a visitor
   * @param visitor the visitor to accept
   */
  accept(visitor: ICardVisitor): void;
}

export interface ICardCritter extends ICard {
  damage: number;
  health: number;
  abilities: number[];
}

export interface ICardItem extends ICard {
  abilityid: number;
}
/**
 * Rarity of a card
 */
export enum CardRarity {
  COMMON,
  UNCOMMON,
  RARE,
  EPIC,
  LEGENDARY
}