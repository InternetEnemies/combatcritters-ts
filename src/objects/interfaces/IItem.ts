import {IItemVisitor} from "../visitor";

export interface IItem {
    accept: (visitor: IItemVisitor) => void;
}