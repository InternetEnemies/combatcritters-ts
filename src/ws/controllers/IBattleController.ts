import {ICard} from "../../objects";

export interface IBattleController {
    /**
     * end the players turn
     */
    endTurn():void;

    /**
     * play a card at a position
     */
    playCard(card:ICard, pos:number):void;

    /**
     * sacrifice a card at a position
     */
    sacrifice(pos:number):void;
}