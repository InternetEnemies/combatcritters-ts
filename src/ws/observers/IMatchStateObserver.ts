
/**
 * @Created 2024-11-30
 * @Brief observes match state
 */
export interface IMatchStateObserver {
    gameFound(opponent:string):void;
}