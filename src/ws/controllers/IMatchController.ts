/**
 * @Created 2024-12-01
 * @Brief handles matching commands
 */
export interface IMatchController {
    /**
     * start matching
     * @param type type of matchmaking to start
     */
    match(type:string):void;

    /**
     * cancel matching
     */
    cancelMatch():void;
}