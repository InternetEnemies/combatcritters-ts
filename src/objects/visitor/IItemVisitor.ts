import { ICardVisitor, ICurrency, IPack} from "../index";

export interface IItemVisitor extends ICardVisitor {
    visitPack: (pack: IPack) => void;
    visitCurrency: (currency: ICurrency) => void
}