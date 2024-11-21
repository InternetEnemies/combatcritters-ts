import {IDeck, IDeckValidator, IOffer, IUser} from "./objects";
import {ICardsManager, IVendorManager} from "./index";
import {IRest} from "./rest";

/**
 * @Created 2024-09-22
 * @Brief the interface for client, entry point for interacting with the API
 */

export interface IClient {
    /**
     * the user logged in
     */
    user:IUser;
    cards:ICardsManager;
    vendors:IVendorManager;
    rest:IRest;

    /**
     * Is the user logged in?
     */
    isLoggedIn(): Promise<boolean>;

    /**
     * login as a user
     */
    login(username: string, password: string): Promise<void>;

    /**
     * register a new user
     */
    register(username: string, password: string): Promise<void>;
}