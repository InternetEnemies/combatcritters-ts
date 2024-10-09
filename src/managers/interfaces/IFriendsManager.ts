import { IUser } from "../../objects/index";

export interface IFriendsManager {
    /**
     * Get the friends of the current user
     * @returns a list of friends
     */
    getFriends(): Promise<IUser[]>;
    /**
     * Add a user as a friend
     * @param user the user to add as a friend
     */
    addFriend(user: IUser): Promise<void>;
    /**
     * Add a user as a friend
     * @param username the username of the user to add as a friend
     */
    addFriend(user: string): Promise<void>;
    /**
     * Get the friend requests
     * @returns a list of users who have sent friend requests
     */
    getFriendsRequests(): Promise<IUser[]>;
}