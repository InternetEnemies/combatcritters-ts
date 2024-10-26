import {
  ICard,
  ICurrency,
  IItemStack,
  IOffer,
  IPack,
  ItemStack,
  IUserOfferItem,
  IUserOfferState,
} from "../index";
import { Offer as OfferPayload } from "../rest/payloads";

export class Offer implements IOffer {
  private readonly _offerID: number;
  private readonly _receiveItem: IItemStack<ICurrency | ICard | IPack>;
  private readonly _giveItem: IItemStack<ICurrency | ICard | IPack>[];

  public static fromOfferPayload(payload: OfferPayload): Offer {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/61
    throw new Error("Method not implemented.");
  }

  constructor(
    offerID: number,
    receiveItems: IItemStack<ICurrency | ICard | IPack>,
    giveItem: IItemStack<ICurrency | ICard | IPack>[]
  ) {
    this._offerID = offerID;
    this._receiveItem = receiveItems;
    this._giveItem = giveItem;
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
  public async accept(): Promise<boolean> {
    return Math.random() < 0.5;
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
