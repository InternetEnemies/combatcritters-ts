import {ICardVisitor} from "./ICardVisitor";
import {ICurrency, IPack} from "../interfaces";

/**
 * IItemVisitor.ts
 * @created 2024-10-01
 * @brief Generic visitor class for item objects.
 */

export interface IItemVisitor extends ICardVisitor {
    visitPack: (pack: IPack) => void;
    visitCurrency: (currency: ICurrency) => void
}