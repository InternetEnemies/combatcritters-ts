import { ICardCritter, ICardItem, ICurrency, IPack } from "../index";

export interface IItemVisitor {
    visitCardCritter: (card: ICardCritter) => void;
    visitCardItem: (card: ICardItem) => void;
    visitPack: (pack: IPack) => void;
    visitCurrency: (currency: ICurrency) => void
}