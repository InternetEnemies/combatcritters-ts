import {IDeck} from "./IDeck";

/**
 * IProfile.ts
 * @created 2024-10-29
 * @brief Profile interface
 */

export interface IProfile {
    /**
     * Get the profile of the user, which is the feature deck
     * @returns Promise<IDeck> the feature deck of the user
     */
    getDeck(): Promise<IDeck|null>;
    /**
     * Set the profile of the user, which is the feature deck
     * @param deck the deck to set as the feature deck
     */
    setDeck(deck:IDeck): Promise<void>;
}