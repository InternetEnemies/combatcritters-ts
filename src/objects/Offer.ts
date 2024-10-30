import {
  Card,
  Currency,
  ICard,
  IClient,
  ICurrency,
  IItemStack,
  IOffer,
  IPack,
  IRest,
  ItemStack,
  IUserOfferItem,
  IUserOfferState,
  Pack,
} from "../index";
import { 
  Offer as OfferPayload, 
  OfferItem as OfferItemPayload, 
  ItemType,
  Card as CardPayload ,
  Pack as PackPayload
} from "../rest/payloads";

export class Offer implements IOffer {
  protected readonly _rest: IRest;
  protected readonly _offerID: number;
  protected readonly _receiveItem: IItemStack<ICurrency | ICard | IPack>;
  protected readonly _giveItem: IItemStack<ICurrency | ICard | IPack>[];

  public static fromOfferItemPayload(payload: OfferItemPayload, rest:IRest): Card | Pack | Currency {
    let itemObj: ICard | IPack | ICurrency;
    switch (payload.type) {
      case ItemType.CARD:
        itemObj = Card.fromCardPayload(payload.item as CardPayload);
        break;
      case ItemType.PACK:
        itemObj = Pack.fromPackDetailsPayload(payload.item as PackPayload, this._rest);
        break;
      case ItemType.CURRENCY:
        itemObj = new Currency(payload.count);
        break;
      default:
        throw new Error("Invalid item type");
    }
    return itemObj;
  }

  public static fromOfferPayload(payload: OfferPayload, rest: IRest): Offer {
    let give: IItemStack<ICurrency | ICard | IPack>[] = [];
    let receive: ItemStack<ICurrency | ICard | IPack>;
    return new Offer(payload.id, receive, give, rest);
  }

  constructor(
    offerID: number,
    receiveItems: IItemStack<ICurrency | ICard | IPack>,
    giveItem: IItemStack<ICurrency | ICard | IPack>[].
    rest: IRest
  ) {
    this._offerID = offerID;
    this._receiveItem = receiveItems;
    this._giveItem = giveItem;
    this._rest = rest;
  }

  public async compareUserItems(): Promise<
    IUserOfferState<IPack | ICard | ICurrency>
  > {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/61
    const tradeItems: IUserOfferItem<IPack | ICard | ICurrency>[] = [];
    for (let i = 0; i < this.giveItem.length; i++) {
      if (i % 2 === 0) {
        tradeItems.push({
          giveItem: this._giveItem[i],
          userItem: this._giveItem[i],
        });
      } else {
        tradeItems.push({
          giveItem: this._giveItem[i],
          userItem: new ItemStack<IPack | ICurrency | ICard>(
            this._giveItem[i].getItem(),
            this._giveItem[i].getAmount() - 1
          ),
        });
      }
    }
    return {userOfferItems:tradeItems, canPurchase:(Math.random()<.5)};
  }

  //TODO: Implement this method
  // https://github.com/InternetEnemies/combatcritters-ts/issues/61
  public async accept(): Promise<void> {
    
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
