import { ICard, ICurrency, IItemStack, IOffer, IPack, ITradeItem } from "../index";
import { Offer as OfferPayload } from "../rest/payloads";

export class Offer implements IOffer{
    private readonly _offerID: number;
    private readonly _receiveItem: IItemStack<ICurrency | ICard | IPack>;
    private readonly _giveItem: IItemStack<ICurrency | ICard | IPack>[];
    
    public static fromOfferPayload(payload: OfferPayload): Offer {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/61
        throw new Error("Method not implemented.");
    }

    constructor(offerID: number, receiveItems: IItemStack<ICurrency | ICard | IPack>, giveItem: IItemStack<ICurrency | ICard | IPack>[]) {
        this._offerID = offerID;
        this._receiveItem = receiveItems;
        this._giveItem = giveItem;
    }

    public async compareUserItems(): Promise<ITradeItem<ICard | IPack | ICurrency>[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/61
        throw new Error("Method not implemented.");
    }

    public get offerID(): number {
        return this._offerID;
    }
    public get receiveItem(): IItemStack<ICurrency | ICard | IPack> {
        return this._receiveItem;
    }
    public get giveItem(): IItemStack<ICurrency | ICard | IPack>[] {
        return this._giveItem;
    }
}