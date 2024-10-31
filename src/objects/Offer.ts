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
  protected readonly _client: IClient;
  protected readonly _offerID: number;
  protected readonly _vendorID: number;
  protected readonly _receiveItem: IItemStack<ICurrency | ICard | IPack>;
  protected readonly _giveItem: IItemStack<ICurrency | ICard | IPack>[];

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

  public static fromOfferPayload(payload: OfferPayload, vendorID: number, client: IClient): Offer {
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
    this._offerID = offerID;
    this._receiveItem = receiveItems;
    this._giveItem = giveItem;
    this._client = client;
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

  public async accept(): Promise<void> {
    
  }

  public get offerID(): number {
    return this._offerID;
  }
  public get vendorID(): number {
    return this._vendorID;
  }
  public get receiveItem(): IItemStack<ICurrency | ICard | IPack> {
    return this._receiveItem;
  }
  public get giveItem(): IItemStack<ICurrency | ICard | IPack>[] {
    return this._giveItem;
  }
}
