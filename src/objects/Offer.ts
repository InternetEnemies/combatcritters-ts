import { IItemStack, IOffer } from "../index";
import { Offer as OfferPayload } from "../rest/payloads";

export class Offer implements IOffer{
    private readonly _offerID: number;
    private readonly _receiveItems: IItemStack<any>[];
    private readonly _giveItem: IItemStack<any>[];
    
    public static fromOfferPayload(payload: OfferPayload): Offer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(offerID: number, receiveItems: IItemStack<any>[], giveItem: IItemStack<any>[]) {
        this._offerID = offerID;
        this._receiveItems = receiveItems;
        this._giveItem = giveItem;
    }

    compareUserItems(): IItemStack<any>[] {
        throw new Error("Method not implemented.");
    }

    public get offerID(): number {
        return this._offerID;
    }
    public get receiveItems(): IItemStack<any>[] {
        return this._receiveItems;
    }
    public get giveItem(): IItemStack<any>[] {
        return this._giveItem;
    }
}