import {ICard, ICurrency, IItemStack, IOfferProto, IPack, IUserOfferItem, IUserOfferState} from "../interfaces";
import {IClient} from "../../IClient";
import {CardQuery as CardQueryPayload, UserPack as UserPackPayload, Wallet as WalletPayload} from "../../rest/payloads";
import {Routes} from "../../rest";
import {ItemStack} from "../itemstack";
import {UserOfferItem} from "./UserOfferItem";
import {UserOfferState} from "./UserOfferState";

/**
 * OfferProto.ts
 * @created 2024-11-29
 * @brief Abstract offer for both market and trading
 */

export abstract class OfferProto implements IOfferProto {
    protected readonly _receiveItem: IItemStack<ICurrency | ICard | IPack>;
    protected readonly _giveItem: IItemStack<ICurrency | ICard | IPack>[];
    protected readonly _client: IClient;

    protected constructor(
        receiveItem: IItemStack<ICurrency | ICard | IPack>,
        giveItem: IItemStack<ICurrency | ICard | IPack>[],
        client: IClient
    ) {
        this._receiveItem = receiveItem;
        this._giveItem = giveItem;
        this._client = client;
    }

    abstract compareUserItems(): Promise<IUserOfferState<IPack | ICard | ICurrency>>;

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
        let flag: boolean = true;

        // check if the user have enough cards to give
        for(let item of compareItems){
            if(this.isICard(item.getItem())){
                // find the first item that match with the cardid
                let userCard = userCardStack.find(userItem => userItem.getItem().cardid === (item.getItem() as ICard).cardid);
                // if the user doesn't have the card, add it to the missing items
                if(userCard === undefined){
                    missingItems.push(new UserOfferItem(item, new ItemStack(item.getItem(), 0)));
                    flag = false;
                }else if(!this.compareItemStacks(item, userCard)){
                    // if the user have the card but not enough amount, add it to the missing items
                    missingItems.push(new UserOfferItem(item, userCard));
                    flag = false;
                }else{
                    // if the user have the card and enough amount, push the userCard to the missing items
                    missingItems.push(new UserOfferItem(item, userCard));
                }
            }else if(this.isIPack(item.getItem())){
                // find the first item that match with the packid
                let userPack = userPackStack.find(userItem => userItem.getItem().packid === (item.getItem() as IPack).packid);
                if(userPack === undefined){
                    // if the user doesn't have the pack, add it to the missing items
                    missingItems.push(new UserOfferItem(item, new ItemStack(item.getItem(), 0)));
                    flag = false;
                }else if(!this.compareItemStacks(item, userPack)){
                    // if the user have the pack but not enough amount, add it to the missing items
                    missingItems.push(new UserOfferItem(item, userPack));
                    flag = false;
                }else{
                    // if the user have the pack and enough amount, push the userPack to the missing items
                    missingItems.push(new UserOfferItem(item, userPack));
                }
            }else if(this.isICurrency(item.getItem())){
                if(!this.compareItemStacks(item, userCurrencyStack)){
                    flag = false;
                }
                missingItems.push(new UserOfferItem(item, userCurrencyStack));
            }else{
                // probably will never reach here
                // throw error if the item is not a card, pack or currency
                throw new Error("Invalid item type");
            }
        }

        return new UserOfferState(missingItems, flag);
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