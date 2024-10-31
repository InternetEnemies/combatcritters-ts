import { IRest } from "../rest";
import { CardQuery as CardQueryPayload,
        Pack as PackPayload,
        Wallet as WalletPayload,
        UserPack as UserPackPayload
 } from "../rest/payloads";
import { Card, Currency, ICard, ICurrency, IItemStack, IPack, Pack } from "./index";

export class ItemStack<T> implements IItemStack<T> {
    private readonly _item: T;
    private readonly _amount: number;

    // convert CardQueryPayload to IItemStack<ICard>
    public static fromCardQueryPayloadToItemStack(cardQueryPayload: CardQueryPayload): IItemStack<ICard> {
        return new ItemStack<ICard>(Card.fromCardPayload(cardQueryPayload.item), cardQueryPayload.count);
    }

    // convert UserPackPayload to IItemStack<IPack>
    public static fromUserPackPayloadToItemStack(packPayload: UserPackPayload, rest: IRest): IItemStack<IPack> {
        return new ItemStack<IPack>(Pack.fromPackDetailsPayload(packPayload.item, rest), packPayload.count);
    }

    // convert WalletPayload to IItemStack<ICurrency>
    public static fromWalletPayloadToItemStack(walletPayload: WalletPayload): IItemStack<ICurrency> {
        return new ItemStack<ICurrency>(new Currency(1), walletPayload.coins);
    }

    constructor(item: T, amount: number) {
        this._item = item;
        this._amount = amount;
    }
    getItem(): T {
        return this._item;
    }
    getAmount(): number {
        return this._amount;
    }
}