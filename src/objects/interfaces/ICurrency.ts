import {IItemVisitor} from "../visitor";

/**
 * ICurrency.ts
 * @created 2024-10-20
 * @brief this file contains the interface for currency
 */

export interface ICurrency {
  coins: number;

  /**
   * Accept a visitor
   * @param visitor the visitor to accept
   */
  accept(visitor: IItemVisitor): void;
}