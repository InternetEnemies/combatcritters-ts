import {ICard} from "./ICard";
import {ICardState} from "./ICardState";

/**
 * IBattleStateObserver.ts
 * @created 2024-11-27
 * @brief Interface for the battle state observer
 */

export interface IBattleStateObserver {
    /**
     * set whether it is the players turn
     * @param isPlayerTurn is it the players turn?
     */
    setPlayerTurn(isPlayerTurn: boolean): void;
    /**
     * set players health
     */
    setPlayerHealth(health: number): void;
    /**
     * set health of the enemy
     */
    setEnemyHealth(health: number): void;
    /**
     * set player energy
     */
    setPlayerEnergy(energy: number): void;
    /**
     * set enemy energy
     */
    setEnemyEnergy(energy: number): void;
    /**
     * set the cards in the player's hand
     */
    setHand(cards: ICard[]): void;
    /**
     * set the size of the players draw pile
     */
    setDrawPileSize(size: number): void;
    /**
     * set the buffer cards
     * @param cardStates list of card states
     */
    setPlayerBufferCards(cardStates: (ICardState | null)[]): void;
    /**
     * set the buffer cards of the enemy
     * @param cardStates list of card states
     */
    setEnemyBuffercards(cardStates: (ICardState | null)[]): void;
    /**
     * set the enemy cards
     * @param cardStates list of card states
     */
    setEnemyCards(cardStates: (ICardState | null)[]): void;
    /**
     * set the player cards
     * @param cardStates list of card states
     */
    setPlayerCards(cardStates: (ICardState | null)[]): void;
}