import {IUser} from "./objects";
import {ICardsManager, IUserManager} from "./managers";
import {IRest} from "./rest/IRest";

export interface IClient {
    /**
     * the user logged in
     */
    user:IUser;
    users:IUserManager;
    cards:ICardsManager;
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