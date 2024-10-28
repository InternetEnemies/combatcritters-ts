import { IClient, IRest } from "../index";
import { Routes } from '../rest/routes/packs';
import { Pack, IUserPack, IUser, ICard, Card } from "./index";
import { Pack as PackPayload, Card as CardPayload } from '../rest/payloads/index';

export class UserPack extends Pack implements IUserPack{
    private readonly _user: IUser;

    public static fromPackPayload(payload: PackPayload, rest: IRest, user:IUser): UserPack {
        return new UserPack(payload.packid,
                            payload.name,
                            payload.image,
                            rest,
                            user);
    }

    constructor(packid: number, name: string, image: string, rest:IRest, user:IUser) {
        super(image, name, packid, rest);
        this._user = user;
    }

    public async open(): Promise<ICard[]> {
        const response:CardPayload[] = await this._rest.post(Routes.User.openPack(this._user.id, this.packid),{});
        const cards:ICard[] = response.map(Card.fromCardPayload);
        return cards;
    }

    public get user(): IUser {
        return this._user;
    }
}