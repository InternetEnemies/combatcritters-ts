import { IMatchController } from "./controllers/IMatchController";
import {IBattleClient} from "./IBattleClient";
import {ICritterSocket} from "./ICritterSocket";
import {CritterSocket} from "./CritterSocket";
import {IBattleStateObserver, IMatchStateObserver} from "./observers";
import {getMatchStateAdapter} from "./observers/MatchStateAdapter";
import {MatchController} from "./controllers/MatchController";
import {IBattleController} from "./controllers/IBattleController";
import {BattleController} from "./controllers/BattleController";
import {getBattleStateAdapter} from "./observers/BattleStateAdapter";
import {errorHandler} from "./observers/ErrorObserver";
import {IRest} from "../rest";

export class BattleClient implements IBattleClient {
    private readonly _matchController: IMatchController;
    private readonly _battleController: IBattleController;
    private ws: ICritterSocket;
    private rest: IRest;

    public static async getClient(uri: string, rest:IRest): Promise<IBattleClient> {
        let socket = await CritterSocket.getWebsocket(uri)
        return new BattleClient(socket, rest);
    }

    private constructor(ws: ICritterSocket, rest:IRest) {
        this.ws = ws;
        this.rest=rest;
        this._matchController = new MatchController(ws);
        this._battleController = new BattleController(ws);
        ws.register(errorHandler)
    }

    onStopped(cb: () => void): void {
        this.ws.onClose(cb)
    }

    setMatchStateObserver(observer: IMatchStateObserver): void {
        this.ws.register(getMatchStateAdapter(observer,this.rest));
    }

    get matchController(): IMatchController {
        return this._matchController;
    }

    get battleController(): IBattleController {
        return this._battleController;
    }

    setBattleStateObserver(observer: IBattleStateObserver): void {
        this.ws.register(getBattleStateAdapter(observer));
    }
}