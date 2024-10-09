import {IDeckManager, IUserCardsManager, IFriendsManager} from "../../managers/index";
import {IProfile} from "./index";

export interface IUser {
    //properties
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    profile: IProfile;
    username:string;
    id:number;
}