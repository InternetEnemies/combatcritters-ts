import { IClient } from "../IClient";
import { IRest, Routes } from "../rest";
import { Vendor as VendorPayload, Offer as OfferPayload, OfferDiscount as OfferDiscountPayload } from "../rest/payloads";
import { Card, CardCritter } from "./Card";
import { Currency } from "./Currency";
import { DiscountOffer } from "./DiscountOffer";
import { IDiscountOffer, IOffer, ISpecialOffer, IVendor, IVendorReputation } from "./interfaces";
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

  public async getOffers(): Promise<IOffer[]> {
    const response:OfferPayload[] = await this._client.rest.get(Routes.Market.vendorOffers(this._id));
    return response.map((offer) => {
      return Offer.fromOfferPayload(offer, this._id, this._client);
    });
  }

  public async discountOffers(): Promise<IDiscountOffer[]> {
    const response:OfferDiscountPayload[] = await this._client.rest.get(Routes.Market.vendorDiscounts(this._id));
    return response.map((offer) => {
      return DiscountOffer.fromDiscountOfferPayload(offer, this._id, this._client);
    });
  }

  public async getSpecialOffers(): Promise<ISpecialOffer[]> {
    const response:OfferPayload[] = await this._client.rest.get(Routes.Market.vendorSpecialOffers(this._id));
    return response.map((offer) => {
      return Offer.fromOfferPayload(offer, this._id, this._client);
    });
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