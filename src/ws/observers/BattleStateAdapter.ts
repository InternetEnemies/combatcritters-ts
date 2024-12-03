import {IBattleStateObserver} from "./IBattleStateObserver";
import {
    BoardStateEvent,
    DrawPileEvent,
    EnergyEvent,
    HandEvent,
    HealthEvent,
    PlayerTurnEvent
} from "../payloads/BattlePayloads";
import {Card, ICardState} from "../../objects";

export function getBattleStateAdapter(battleStateObserver:IBattleStateObserver) {
    return {
        player_turn_event: (body:PlayerTurnEvent) => {
            battleStateObserver.setPlayerTurn(body.is_turn)
        },
        health_event: (body:HealthEvent) => {
            if(body.is_player) {
                battleStateObserver.setPlayerHealth(body.health)
            } else {
                battleStateObserver.setEnemyHealth(body.health)
            }
        },
        energy_event: (body:EnergyEvent) => {
            if(body.is_player) {
                battleStateObserver.setPlayerEnergy(body.energy)
            } else {
                battleStateObserver.setEnemyEnergy(body.energy)
            }
        },
        hand_event: (body:HandEvent) => {
            battleStateObserver.setHand(body.cards.map(Card.fromCardPayload))
        },
        draw_pile_event: (body:DrawPileEvent) => {
            battleStateObserver.setDrawPileSize(body.size)
        },
        board_state_event: (body:BoardStateEvent) => {
            const cardStates: (ICardState | null)[] = body.slots.map((slot) => {
                if(slot.card) {
                    return {
                        card: Card.fromCardPayload(slot.card),
                        health: slot.health
                    }
                } else {
                    return null
                }
            })
            switch (body.type) {
                case "player":
                    battleStateObserver.setPlayerCards(cardStates)
                    break;
                case "player_buffer":
                    battleStateObserver.setPlayerBufferCards(cardStates)
                    break;
                case "opponent":
                    battleStateObserver.setEnemyCards(cardStates)
                    break;
                case "opponent_buffer":
                    battleStateObserver.setEnemyBufferCards(cardStates)
                    break;
                default:
                    console.log("Unknown board state type: " + body.type)
            }
        }
    }
}