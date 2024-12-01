import {ICard} from "../../objects";
import {ICardState} from "../../objects";

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
     * @param health the health of the player
     */
    setPlayerHealth(health: number): void;
    /**
     * set health of the enemy
     * @param health the health of the enemy
     */
    setEnemyHealth(health: number): void;
    /**
     * set player energy
     * @param energy the energy of the player
     */
    setPlayerEnergy(energy: number): void;
    /**
     * set enemy energy
     * @param energy the energy of the enemy
     */
    setEnemyEnergy(energy: number): void;
    /**
     * set the cards in the player's hand
     * @param cards the cards in the players hand
     */
    setHand(cards: ICard[]): void;
    /**
     * set the size of the players draw pile
     * @param size the size of the players draw pile
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
    setEnemyBufferCards(cardStates: (ICardState | null)[]): void;
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