import {ICard, IItemStack, IUser, IUserPack} from "../interfaces";
import {Pack} from "./Pack";
import {IRest} from "../../rest";
import {Routes} from "../../rest/routes/packs";
import {ItemStack} from "../itemstack";
import {PackResult, UserPack as UserPackPayload} from "../../rest/payloads";
import {Card} from "../card";

export class UserPack extends Pack implements IUserPack{
    private readonly _user: IUser;
    private readonly _quantity: number;

    public static fromUserPackPayload(payload: UserPackPayload, rest: IRest, user:IUser): IItemStack<IUserPack> {
        const temp = new UserPack(payload.item.packid,
                            payload.item.name,
                            payload.item.image,
                            rest,
                            user,
                            payload.count
        );
        return new ItemStack(temp, temp.quantity);
    }

    constructor(packid: number, name: string, image: string, rest:IRest, user:IUser, quantity:number) {
        super(image, name, packid, rest);
        this._user = user;
        this._quantity = quantity;
    }

    public async open(): Promise<ICard[]> {
        const response:PackResult = await this._rest.post(Routes.User.openPack(this._user.id, this.packid),{});
        return response.cards.map(Card.fromCardPayload);
    }

    public get user(): IUser {
        return this._user;
    }
    public get quantity(): number {
        return this._quantity;
    }
}