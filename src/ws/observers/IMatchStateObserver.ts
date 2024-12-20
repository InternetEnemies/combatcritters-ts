import {IItem, IItemStack} from "../../objects";

/**
 * @Created 2024-11-30
 * @Brief observes match state
 */
export interface IMatchStateObserver {
    gameFound(opponent:string):void;
    matchEnded(type:string, rewards:IItemStack<IItem>[]): void;
}