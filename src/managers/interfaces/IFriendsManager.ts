import {IUser} from "../../objects";

/**
 * IFriendsManager.ts
 * @created 2024-10-08
 * @brief Interface for the friends manager
 */

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
     * @param user the username of the user to add as a friend
     */
    addFriend(user: string): Promise<void>;
    /**
     * Get the friend requests
     * @returns a list of users who have sent friend requests
     */
    getFriendsRequests(): Promise<IUser[]>;
}