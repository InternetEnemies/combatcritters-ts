import { IItemStack, ISpecialOffer } from "./index";

export class SpecialOffer implements ISpecialOffer{
    private readonly _offerID: number;
    private readonly _receiveItems: any[];
    private readonly _giveItem: any[];
    
    public static fromSpecialOfferPayload(payload: any): SpecialOffer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(offerID: number, receiveItems: any[], giveItem: any[]) {
        this._offerID = offerID;
        this._receiveItems = receiveItems;
        this._giveItem = giveItem;
    }

    public compareUserItems(): IItemStack<any>[] {
        throw new Error("Method not implemented.");
    }

    public get offerID(): number {
        return this._offerID;
    }
    public get receiveItems(): any[] {
        return this._receiveItems;
    }
    public get giveItem(): any[] {
        return this._giveItem;
    }
}