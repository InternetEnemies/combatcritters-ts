import {IDeckManager, IUserCardsManager, IFriendsManager, IPacksManager, IUserCurrencyManager} from "../../managers/index";
import {IProfile} from "./index";

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