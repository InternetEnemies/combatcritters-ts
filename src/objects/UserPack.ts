import { IClient } from "../index";
import { Pack, IUserPack, IUser } from "./index";
import { Pack as PackPayload } from '../rest/payloads/index';

export class UserPack extends Pack implements IUserPack{
    private readonly _user: IUser;

    public static fromPackPayload(payload: PackPayload, client: IClient, user:IUser): UserPack {
        return new UserPack(payload.packid,
                            payload.name,
                            payload.image,
                            client,
                            user);
    }

    constructor(packid: number, name: string, image: string, clinet:IClient, user:IUser) {
        super(image, name, packid, clinet);
        this._user = user;
    }

    public async open(): Promise<ICard[]> {
        
    }

    public get user(): IUser {
        return this._user;
    }
}