import {IDeckManager, IUserCardsManager} from "../../managers";

export interface IUser {
    decks:IDeckManager;
    cards:IUserCardsManager;
}