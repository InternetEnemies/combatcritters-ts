import { DeckDetails } from "./decks";

/**
 * profiles.ts
 * @created 2024-10-29
 * @brief Payload for the profiles endpoint
 */
export type ProfilesPayload = {
    featured_deck: DeckDetails;
}