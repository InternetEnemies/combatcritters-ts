import { IClient } from "../IClient";
import { IRest } from "../rest";
import { Vendor as VendorPayload } from "../rest/payloads";
import { Card, CardCritter } from "./Card";
import { Currency } from "./Currency";
import { DiscountOffer } from "./DiscountOffer";
import { IDiscountOffer, IOffer, IVendor, IVendorReputation } from "./interfaces";
import { ItemStack } from "./ItemStack";
import { Offer } from "./Offer";
import { Pack } from "./Pack";
import { VendorReputation } from "./VendorReputation";

export class Vendor implements IVendor {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _reputation: IVendorReputation;
  private readonly _image: string;
  private readonly _refrest_time: string;
  private readonly _client: IClient;

  public static fromVendorPayload(payload: VendorPayload, client: IClient): Vendor {
    return new Vendor(
      payload.id,
      payload.name,
      VendorReputation.fromVendorReputationPayload(payload.reputation),
      payload.image,
      payload.refresh_time,
      client
    ); 
  }

  constructor(
    id: number,
    name: string,
    reputation: IVendorReputation,
    image: string,
    refrest_time: string,
    client: IClient
  ) {
    this._id = id;
    this._name = name;
    this._reputation = reputation;
    this._image = image;
    this._refrest_time = refrest_time;
    this._client = client;
  }

  //TODO: Delete this
  // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  private getCard(): ItemStack<Card> {
    return new ItemStack(
      new CardCritter(
        1,
        "UglyMan, the Hideous Hero",
        3,
        2,
        "",
        "The ugliest man everrrrrrr",
        10,
        8,
        [0, 1, 2]
      ),
      1
    );
  }

  //TODO: Delete this
  // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  private getPack(): ItemStack<Pack> {
    return new ItemStack(
      new Pack("/assets/images/pack.png", "Into the Robverse", 2, this._client.rest),
      1
    );
  }

  //TODO: Delete this
  // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  private getCurrency(): ItemStack<Currency> {
    return new ItemStack(new Currency(9), 1);
  }

  //TODO: Delete this
  // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  private getRequired(): ItemStack<Pack | Currency | Card>[] {
    const required: ItemStack<Pack | Currency | Card>[] = [];
    required.push(this.getCard());
    required.push(this.getCard());
    required.push(this.getCurrency());
    required.push(this.getPack());
    required.push(this.getCard());
    return required;
  }

  //TODO: Delete this
  // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  private generateOffers(): Offer[] {
    const offers: Offer[] = [];
    offers.push(new Offer(0, this._id, this.getCard(), this.getRequired(), this._client));
    offers.push(new Offer(1, this._id, this.getCard(), this.getRequired(), this._client));
    offers.push(new Offer(3, this._id, this.getCard(), this.getRequired(), this._client));
    offers.push(new Offer(4, this._id, this.getCard(), this.getRequired(), this._client));
    offers.push(new Offer(5, this._id, this.getCard(), this.getRequired(), this._client));
    offers.push(new Offer(6, this._id, this.getPack(), this.getRequired(), this._client));
    offers.push(new Offer(7, this._id, this.getPack(), this.getRequired(), this._client));
    offers.push(new Offer(8, this._id, this.getPack(), this.getRequired(), this._client));
    offers.push(new Offer(0, this._id, this.getPack(), this.getRequired(), this._client));
    return offers;
  }

  public async getOffers(): Promise<IOffer[]> {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/63
    return this.generateOffers();
  }
  public async discountOffers(): Promise<IDiscountOffer[]> {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/63
    const discountOffers: DiscountOffer[] = [];
    for (let i = 0; i < 5; i++) {
      discountOffers.push(
        new DiscountOffer(
          this.getRequired(),
          75,
          1,
          0,
          0,
          this.getCard(),
          this.getRequired(),
          this._client
        )
      );
    }
    for (let i = 0; i < 5; i++) {
      discountOffers.push(
        new DiscountOffer(
          this.getRequired(),
          75,
          1,
          0,
          0,
          this.getPack(),
          this.getRequired(),
          this._client
        )
      );
    }

    return discountOffers;
  }
  public async getSpecialOffers(): Promise<IOffer[]> {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/63
    return this.generateOffers();
  }
  public async purchaseOffer(offer: IOffer): Promise<void> {
    //TODO: Implement this method
    // https://github.com/InternetEnemies/combatcritters-ts/issues/63
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get reputation(): IVendorReputation {
    return this._reputation;
  }
  public get image(): string {
    return this._image;
  }
  public get refrest_time(): string {
    return this._refrest_time;
  }
}