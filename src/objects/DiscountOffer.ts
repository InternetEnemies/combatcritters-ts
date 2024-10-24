import { OfferDiscount } from "../rest/payloads";
import { ICard, ICurrency, IDiscountOffer, IItemStack, IPack, ITradeItem, Offer } from "./index";

export class DiscountOffer extends Offer implements IDiscountOffer {
    private readonly _discountedGive: IItemStack<ICurrency | ICard | IPack>[];
    private readonly _discount: number;
    private readonly _discountID: number;

    public static fromDiscountOfferPayload(payload: OfferDiscount): DiscountOffer {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/62
        throw new Error("Method not implemented.");
    }

    constructor(discountedGive: IItemStack<ICurrency | ICard | IPack>[], discount: number, discountID: number, offerID: number, receiveItem: IItemStack<ICurrency | ICard | IPack>, originalGive: IItemStack<ICurrency | ICard | IPack>[]) {
        super(offerID, receiveItem, originalGive);
        this._discountedGive = discountedGive;
        this._discount = discount;
        this._discountID = discountID;
    }

    public override compareUserItems(): ITradeItem<ICurrency | ICard | IPack>[] {
         //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/62
        throw new Error("Method not implemented.");
    }

    public get discountedGive(): IItemStack<ICurrency | ICard | IPack>[] {
        return this._discountedGive;
    }
    public get discount(): number {
        return this._discount;
    }
    public get discountID(): number {
        return this._discountID;
    }
}