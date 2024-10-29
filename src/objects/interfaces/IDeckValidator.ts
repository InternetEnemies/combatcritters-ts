import { IDeck, IDeckValidity } from "./index";

/**
 * Interface for a local deck validator.
 */
export interface IDeckValidator {
    /**
     * Validate a deck locally.
     * @param deck the deck to validate
     * @returns IDeckValidity the validity of the deck
     */
    validate(deck: IDeck): IDeckValidity;
}