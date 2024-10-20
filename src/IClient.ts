import {IOffer, IUser} from "./objects";
import {ICardsManager, IOffersManager, IVendorManager} from "./index";
import {IRest} from "./rest/IRest";

export interface IClient {
    /**
     * the user logged in
     */
    user:IUser;
    cards:ICardsManager;
    vendors:IVendorManager;
    offers: IOffersManager;
    rest:IRest;

    /**
     * Is the user logged in?
     */
    isLoggedIn(): boolean;

    /**
     * login as a user
     */
    login(username: string, password: string): Promise<void>;

    /**
     * register a new user
     */
    register(username: string, password: string): Promise<void>;
}