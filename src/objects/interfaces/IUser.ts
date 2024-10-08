import {IDeckManager, IUserCardsManager, IFriendsManager, IProfileManager} from "../../managers/index";

export interface IUser {
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    profile: IProfileManager;
    username:string;
    id:number;
}