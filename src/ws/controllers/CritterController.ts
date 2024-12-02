import {ICritterSocket} from "../ICritterSocket";

export abstract class CritterController {
    private _ws:ICritterSocket
    constructor(ws:ICritterSocket) {
        this._ws=ws;
    }
    protected get ws():ICritterSocket {
        return this._ws
    }
}