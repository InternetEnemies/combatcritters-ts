import {IDeckManager, IUserCardsManager, IFriendsManager} from "../../managers/index";

export interface IUser {
    //properties
    decks:IDeckManager;
    cards:IUserCardsManager;
    friends:IFriendsManager;
    username:string;
    id:number;
}