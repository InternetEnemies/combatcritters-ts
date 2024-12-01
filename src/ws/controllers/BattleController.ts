import { Card } from "../..";
import {CritterController} from "./CritterController";
import {IBattleController} from "./IBattleController";

export class BattleController extends CritterController implements IBattleController {
    endTurn(): void {
        this.ws.send("end_turn_command",{})
    }
    playCard(card: Card, pos: number): void {
        this.ws.send("play_card_command", {
            id:card.cardid,
            pos:pos
        })
    }
    sacrifice(pos: number): void {
        this.ws.send("sacrifice_command", {
            pos:pos
        })
    }
}