import { IDeck } from "../../objects/index";

export interface IProfileManager {
    /**
     * Get the profile of the user, which is the feature deck
     * @returns Promise<IDeck> the feature deck of the user
     */
    getProfile(): Promise<IDeck|null>;
    /**
     * Set the profile of the user, which is the feature deck
     * @param deck the deck to set as the feature deck
     */
    setProfile(deck:IDeck): Promise<void>;
}