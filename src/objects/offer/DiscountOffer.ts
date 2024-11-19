import {Offer} from "./Offer";
import {ICard, ICurrency, IDiscountOffer, IItemStack, IPack, IUserOfferState} from "../interfaces";
import {OfferDiscount} from "../../rest/payloads";
import {ItemStack} from "../itemstack";
import {IClient} from "../../IClient";


export class DiscountOffer extends Offer implements IDiscountOffer {
    private readonly _discountedGive: IItemStack<ICurrency | ICard | IPack>[];
    private readonly _discount: number;
    private readonly _discountID: number;

    public static fromDiscountOfferPayload(payload: OfferDiscount, vendorID: number, client: IClient): DiscountOffer {
        let dicountGive: IItemStack<ICurrency | ICard | IPack>[] = payload.discounted_give.map((item) => {
            return new ItemStack<ICurrency | ICard | IPack>(
                Offer.fromOfferItemPayload(item, client.rest),
                item.count
            )
        });
        let give: IItemStack<ICurrency | ICard | IPack>[] = payload.parent_offer.give.map((item) => {
            return new ItemStack<ICurrency | ICard | IPack>(
              this.fromOfferItemPayload(item, client.rest),
              item.count
            )
        });
        let receive: ItemStack<ICurrency | ICard | IPack> = new ItemStack<ICurrency | ICard | IPack>(
            this.fromOfferItemPayload(payload.parent_offer.receive, client.rest),
            payload.parent_offer.receive.count
        );
        return new DiscountOffer(dicountGive, payload.discount, payload.discountid, payload.parent_offer.id, vendorID, receive, give, client);
    }

    constructor(discountedGive: IItemStack<ICurrency | ICard | IPack>[], 
                discount: number, 
                discountID: number, 
                offerID: number, 
                vendorID: number,
                receiveItem: IItemStack<ICurrency | ICard | IPack>, 
                originalGive: IItemStack<ICurrency | ICard | IPack>[], 
                client: IClient) {
        super(offerID, vendorID, receiveItem, originalGive, client);
        this._discountedGive = discountedGive;
        this._discount = discount;
        this._discountID = discountID;
    }

    public override compareUserItems(): Promise<IUserOfferState<ICurrency | ICard | IPack>> {
        return this.compareItems(this._discountedGive);
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