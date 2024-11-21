import {IDeckManager, IFriendsManager, IPacksManager, IUserCardsManager, IUserCurrencyManager} from "../../managers";
import {IProfile} from "./IProfile";

export interface IUser {
    //properties
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    packs:IPacksManager;
    currency:IUserCurrencyManager;
    profile: IProfile;
    username:string;
    id:number;
}