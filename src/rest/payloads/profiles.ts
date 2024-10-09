import { DeckDetails } from "./decks";

/**
 * Payload for the profiles endpoint
 */
export type ProfilesPayload = {
    featured_deck: DeckDetails;
}