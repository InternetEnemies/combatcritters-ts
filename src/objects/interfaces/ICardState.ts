import {ICard} from "./ICard";

/**
 * ICardState.ts
 * @created 2024-11-27
 * @brief Interface for the card state, used in battle
 */

export interface ICardState {
    card: ICard; // the card
    health: number; // the health of the card on the battlefield
}