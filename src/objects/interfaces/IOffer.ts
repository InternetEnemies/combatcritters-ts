import { IItemStack } from "../index";

export interface IOffer {
    offerID: number;
    receiveItems: IItemStack<any>[];
    giveItem: IItemStack<any>[];

    compareUserItems(): IItemStack<any>[];
}