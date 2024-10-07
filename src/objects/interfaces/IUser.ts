import {IDeckManager, IUserCardsManager} from "../../managers";

export interface IUser {
    decks:IDeckManager;
    cards:IUserCardsManager;
    username:string;
    id:number;
}