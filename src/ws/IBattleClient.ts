import {IMatchController} from "./controllers/IMatchController";
import {IMatchStateObserver} from "./observers/IMatchStateObserver";

export interface IBattleClient {
    matchController:IMatchController;
    setMatchStateObserver(observer:IMatchStateObserver):void;
}