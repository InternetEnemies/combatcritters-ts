import {IMatchController} from "./controllers/IMatchController";
import {IBattleStateObserver, IMatchStateObserver} from "./observers";
import {IBattleController} from "./controllers/IBattleController";

export interface IBattleClient {
    matchController:IMatchController;
    battleController:IBattleController;
    setMatchStateObserver(observer:IMatchStateObserver):void;
    setBattleStateObserver(observer:IBattleStateObserver):void;

    /**
     * add callback for when the client shuts down
     */
    onStopped(cb:()=>void):void
}