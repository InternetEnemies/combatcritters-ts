import { IItemStack, ISpecialOffer } from "./index";

export class SpecialOffer implements ISpecialOffer{
    private readonly _offerID: number;
    private readonly _receiveItem: IItemStack<any>;
    private readonly _giveItem: IItemStack<any>[];
    
    public static fromSpecialOfferPayload(payload: any): SpecialOffer {
        //TODO: Implement this method
        throw new Error("Method not implemented.");
    }

    constructor(offerID: number, receiveItems: IItemStack<any>, giveItem: IItemStack<any>[]) {
        this._offerID = offerID;
        this._receiveItem = receiveItems;
        this._giveItem = giveItem;
    }

    public compareUserItems(): IItemStack<any>[] {
        throw new Error("Method not implemented.");
    }

    public get offerID(): number {
        return this._offerID;
    }
    public get receiveItem(): IItemStack<any> {
        return this._receiveItem;
    }
    public get giveItem(): IItemStack<any>[] {
        return this._giveItem;
    }
}