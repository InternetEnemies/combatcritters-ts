import {IDeckManager, IUserCardsManager, IFriendsManager} from "../../managers/index";

export interface IUser {
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    username:string;
    id:number;
}