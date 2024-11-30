import {
  ICard,
  ICurrency,
  IItemStack,
  IOffer,
  IPack,
  IPurchaseStatus,
  IUserOfferItem,
  IUserOfferState
} from "../interfaces";
import {IClient} from "../../IClient";
import {IRest} from "../../rest";
import {ItemType} from "../../rest/payloads";
import {Card} from "../card";
import {Pack} from "../pack";
import {Currency} from "../wallet";
import {ItemStack} from "../itemstack";
import {PurchaseStatus} from "./PurchaseStatus";
import {NullRep} from "../vendor";
import {UserOfferItem} from "./UserOfferItem";
import {UserOfferState} from "./UserOfferState";
import {OfferItem as OfferItemPayload, VendorReputation, Card as CardPayload, Pack as PackPayload, Offer as OfferPayload, CardQuery as CardQueryPayload, Wallet as WalletPayload, UserPack as UserPackPayload} from "../../rest/payloads";
import {Routes} from "../../rest";
import {OfferProto} from "./OfferProto";

/**
 * Offer.ts
 * @created 2024-10-29
 * @brief Offer object
 */

export class Offer extends OfferProto implements IOffer {
  protected readonly _offerID: number;
  protected readonly _vendorID: number;

  public static fromOfferItemPayload(payload: OfferItemPayload, rest: IRest): ICard | IPack | ICurrency {
    let itemObj: ICard | IPack | ICurrency;
    switch (payload.type) {
      case ItemType.CARD:
        itemObj = Card.fromCardPayload(payload.item as CardPayload);
        break;
      case ItemType.PACK:
        itemObj = Pack.fromPackDetailsPayload(payload.item as PackPayload, rest);
        break;
      case ItemType.CURRENCY:
        itemObj = new Currency(payload.count);
        break;
      default:
        throw new Error("Invalid item type");
    }
    return itemObj;
  }

  public static fromOfferPayload(payload: OfferPayload, vendorID: number, client: IClient): IOffer {
    let give: IItemStack<ICurrency | ICard | IPack>[] = payload.give.map((item) => {
      return new ItemStack<ICurrency | ICard | IPack>(
        this.fromOfferItemPayload(item, client.rest),
        item.count
      )
    });
    let receive: ItemStack<ICurrency | ICard | IPack> = new ItemStack<ICurrency | ICard | IPack>(
      this.fromOfferItemPayload(payload.receive, client.rest),
      payload.receive.count
    );
    return new Offer(payload.id, vendorID, receive, give, client);
  }

  constructor(
    offerID: number,
    vendorID: number,
    receiveItems: IItemStack<ICurrency | ICard | IPack>,
    giveItem: IItemStack<ICurrency | ICard | IPack>[],
    client: IClient
  ) {
    super(receiveItems, giveItem, client);
    this._offerID = offerID;
    this._vendorID = vendorID;
  }

  public override async compareUserItems(): Promise<
    IUserOfferState<IPack | ICard | ICurrency>
  > {
    return this.compareItems(this._giveItem);
  }

  public async accept(): Promise<IPurchaseStatus> {
    let response: VendorReputation;
    try {
      response = await this._client.rest.post(Routes.Market.purchaseOffer(this._vendorID, this._offerID), {});
      return PurchaseStatus.fromRepPayload(response);
    }catch (error){
      console.error(error);
      return new PurchaseStatus(false, new NullRep());
    }
  }

  public get offerID(): number {
    return this._offerID;
  }
  public get vendorID(): number {
    return this._vendorID;
  }
}
