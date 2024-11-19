import {IItemVisitor} from "../visitor";

export interface ICurrency {
  coins: number;

  /**
   * Accept a visitor
   * @param visitor the visitor to accept
   */
  accept(visitor: IItemVisitor): void;
}