import {IDeck} from "../../objects";

/**
 * @Created 2024-12-01
 * @Brief handles matching commands
 */
export interface IMatchController {
    /**
     * start matching
     * @param type type of matchmaking to start
     * @param deck deck to match with
     */
    match(type:string, deck:IDeck):void;

    /**
     * cancel matching
     */
    cancelMatch():void;
}