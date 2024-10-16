import {IDeckManager, IUserCardsManager, IFriendsManager, IPacksManager} from "../../managers/index";
import {IProfile} from "./index";

export interface IUser {
    //properties
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    packs:IPacksManager;
    profile: IProfile;
    username:string;
    id:number;
}