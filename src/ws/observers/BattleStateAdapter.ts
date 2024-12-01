import {IBattleStateObserver} from "./IBattleStateObserver";
import {
    BoardStateEvent,
    DrawPileEvent,
    EnergyEvent,
    HandEvent,
    HealthEvent,
    PlayerTurnEvent
} from "../payloads/BattlePayloads";

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
            // todo
            console.log(body)
        },
        draw_pile_event: (body:DrawPileEvent) => {
            // todo
            console.log(body)
        },
        board_state_event: (body:BoardStateEvent) => {
            //todo
            console.log(body)
        } //todo all the logs here should be removed
    }
}