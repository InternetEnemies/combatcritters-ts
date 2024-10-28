import {IDeckManager, IUserCardsManager, IFriendsManager, IUserPacksManager, IUserCurrencyManager} from "../../managers/index";
import {IProfile} from "./index";

export interface IUser {
    //properties
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    packs:IUserPacksManager;
    currency:IUserCurrencyManager;
    profile: IProfile;
    username:string;
    id:number;
}