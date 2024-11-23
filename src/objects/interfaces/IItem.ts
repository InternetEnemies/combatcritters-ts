import {IItemVisitor} from "../visitor";

/**
 * IItem.ts
 * @created 2024-10-20
 * @brief this file contains the interface for item in offer
 */

export interface IItem {
    accept: (visitor: IItemVisitor) => void;
}