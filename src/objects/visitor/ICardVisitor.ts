/**
 * @Created 2024-10-01
 * @Brief Generic visitor class for item objects.
 */

import { ICardCritter, ICardItem } from "../index";

export interface ICardVisitor {
  visitCritter(critter: ICardCritter): void;
  visitItem(item: ICardItem): void;
}