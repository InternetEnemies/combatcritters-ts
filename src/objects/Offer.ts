import {
  Card,
  Currency,
  ICard,
  IClient,
  ICurrency,
  IItemStack,
  IOffer,
  IPack,
  IPurchaseStatus,
  IRest,
  ItemStack,
  IUserOfferItem,
  IUserOfferState,
  Pack,
  PurchaseStatus,
  User,
  UserOfferItem,
  UserOfferState,
} from "../index";
import { 
  Offer as OfferPayload, 
  OfferItem as OfferItemPayload, 
  ItemType,
  Card as CardPayload ,
  Pack as PackPayload,
  RepChange,
  CardQuery as CardQueryPayload,
  Wallet as WalletPayload,
  UserPack as UserPackPayload
} from "../rest/payloads";
import { Routes } from "../rest/routes/index";

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
    this._vendorID = vendorID;
    this._receiveItem = receiveItems;
    this._giveItem = giveItem;
    this._client = client;
  }

  public async compareUserItems(): Promise<
    IUserOfferState<IPack | ICard | ICurrency>
  > {
    return this.compareItems(this._giveItem);
  }

  public async accept(): Promise<IPurchaseStatus> {
    let response: RepChange;
    try{
      response = await this._client.rest.post(Routes.Market.purchaseOffer(this._vendorID, this._offerID),{});
    }catch(error){
      if(error.response.status === 400){
        return new PurchaseStatus(false, this._vendorID, 0);
      }else{
        throw error;
      }
    }
    return PurchaseStatus.fromRepChangePayload(response);
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

  protected async compareItems(compareItems: IItemStack<ICurrency | ICard | IPack>[]): Promise<
    IUserOfferState<IPack | ICard | ICurrency>
  > {
    // get user owned cards, packs and currency
    const userOwnedCards: CardQueryPayload[] = await this._client.rest.get(Routes.Cards.User.cards(this._client.user.id, ""));
    const userOwnedPacks: UserPackPayload[] = await this._client.rest.get(Routes.Packs.User.packs(this._client.user.id));
    const userOwnedCurrency: WalletPayload = await this._client.rest.get(Routes.Wallet.User.wallet(this._client.user.id));

    // convert CardQueryPayload to IItemStack<ICard>
    const userCardStack: IItemStack<ICard>[] = userOwnedCards.map(ItemStack.fromCardQueryPayloadToItemStack);
    // convert PackPayload to IItemStack<IPack>
    const userPackStack: IItemStack<IPack>[] = userOwnedPacks.map(pack => ItemStack.fromUserPackPayloadToItemStack(pack,this._client.rest));
    // convert WalletPayload to IItemStack<ICurrency>
    const userCurrencyStack: IItemStack<ICurrency> = ItemStack.fromWalletPayloadToItemStack(userOwnedCurrency);
    
    // compare user owned items with offer items and return missing items
    let missingItems: IUserOfferItem<IPack | ICard | ICurrency>[] = [];

    // check if the user have enough cards to give
    for(let item of compareItems){
      if(this.isICard(item.getItem())){
        // find the first item that match with the cardid
        let userCard = userCardStack.find(userItem => userItem.getItem().cardid === (item.getItem() as ICard).cardid);
        // if the user doesn't have the card, add it to the missing items
        if(userCard === undefined){
          missingItems.push(new UserOfferItem(item, new ItemStack(item.getItem(), 0)));
        }else if(!this.compareItemStacks(item, userCard)){
          // if the user have the card but not enough amount, add it to the missing items
          missingItems.push(new UserOfferItem(item, userCard));
        }
      }else if(this.isIPack(item.getItem())){
        // find the first item that match with the packid
        let userPack = userPackStack.find(userItem => userItem.getItem().packid === (item.getItem() as IPack).packid);
        if(userPack === undefined){
          // if the user doesn't have the pack, add it to the missing items
          missingItems.push(new UserOfferItem(item, new ItemStack(item.getItem(), 0)));
        }else if(!this.compareItemStacks(item, userPack)){
          // if the user have the pack but not enough amount, add it to the missing items
          missingItems.push(new UserOfferItem(item, userPack));
        }
      }else if(this.isICurrency(item.getItem())){
        if(!this.compareItemStacks(item, userCurrencyStack)){
          missingItems.push(new UserOfferItem(item, userCurrencyStack));
        }
      }else{
        // probably will never reach here
        // throw error if the item is not a card, pack or currency
        throw new Error("Invalid item type");
      }
    }

    return new UserOfferState(missingItems, missingItems.length === 0);
  }

  private compareItemStacks(giveItem: IItemStack<IPack | ICard | ICurrency>, userItem: IItemStack<IPack | ICard | ICurrency>): boolean {
    // check if the user have enough amount of the item
    // true if the user have enough amount of the item
    // false if the user doesn't have enough amount of the item
    return giveItem.getAmount() <= userItem.getAmount();
  }

  private isICard(item: ICard | IPack | ICurrency): item is ICard {
    return (item as ICard).cardid !== undefined;
  }

  private isIPack(item: ICard | IPack | ICurrency): item is IPack {
    return (item as IPack).packid !== undefined;
  }

  private isICurrency(item: ICard | IPack | ICurrency): item is ICurrency {
    return (item as ICurrency).coins !== undefined;
  }
}
