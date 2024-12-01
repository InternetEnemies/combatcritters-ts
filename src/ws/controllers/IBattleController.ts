import {Card} from "../../objects";

export interface IBattleController {
    /**
     * end the players turn
     */
    endTurn():void;

    /**
     * play a card at a position
     */
    playCard(card:Card, pos:number):void;

    /**
     * sacrifice a card at a position
     */
    sacrifice(pos:number):void;
}