import {ICardVisitor} from "./ICardVisitor";
import {ICurrency, IPack} from "../interfaces";


export interface IItemVisitor extends ICardVisitor {
    visitPack: (pack: IPack) => void;
    visitCurrency: (currency: ICurrency) => void
}