import {ICard} from "./ICard";
import {IItemVisitor} from "../visitor";

export interface IPack {
  image: string;
  name: string;
  packid: number;

  /**
   * Get the list of cards that user may get in the pack
   * @returns list of cards in the pack
   */
  getSetList(): Promise<ICard[]>;

  /**
   * Accept a visitor
   * @param visitor the visitor to accept
   */
  accept(visitor: IItemVisitor): void;
}