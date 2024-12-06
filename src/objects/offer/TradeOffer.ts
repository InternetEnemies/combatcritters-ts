import {OfferProto} from "./OfferProto";
import {ICard, ICurrency, IItemStack, IPack, ITradeOffer, IUserInfo, IUserOfferState} from "../interfaces";
import {IClient} from "../../IClient";

/**
 * TradeOffer.ts
 * @created 2024-11-29
 * @brief Trade offer object
 */

export class TradeOffer extends OfferProto implements ITradeOffer {
    protected readonly _offerID: number;
    protected readonly _user: IUserInfo;

    constructor(offerID: number,
                user: IUserInfo,
                receiveItems: IItemStack<ICurrency | ICard | IPack>,
                giveItem: IItemStack<ICurrency | ICard | IPack>[],
                client: IClient) {
        super(receiveItems, giveItem, client);
        this._offerID = offerID;
        this._user = user;
    }

    public async accept(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public override async compareUserItems(): Promise<
        IUserOfferState<IPack | ICard | ICurrency>
    > {
        return this.compareItems(this._giveItem);
    }

    public get offerID(): number {
        return this._offerID;
    }

    public get user(): IUserInfo {
        return this._user;
    }
}