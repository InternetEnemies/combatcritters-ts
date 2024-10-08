import {IDeckManager, IUserCardsManager, IFriendsManager} from "../../managers/index";
import {IProfile} from "./index";

export interface IUser {
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    profile: IProfile;
    username:string;
    id:number;
}