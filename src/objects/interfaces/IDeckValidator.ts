import { ICard, IDeck, IDeckValidity } from "./index";

/**
 * Interface for a local deck validator.
 */
export interface IDeckValidator {
    /**
     * Validate a deck locally.
     * @param cards the deck to validate
     * @returns IDeckValidity the validity of the deck
     */
    validate(cards: ICard[]): Promise<IDeckValidity>;

    /**
     * refreshes the local cards in the validator
     */
    refresh():void;
}