import {HandlerSet, ICritterSocket} from "./ICritterSocket";

export class CritterSocket implements ICritterSocket {

    private socket:WebSocket
    private handlers:HandlerSet // dict of handlers

    public static getWebsocket(uri: string): Promise<ICritterSocket> {
        let ws = new WebSocket(uri)
        return new Promise<ICritterSocket>((resolve, reject) => {
            ws.addEventListener("open", () => {
                resolve(new CritterSocket(ws))
            })
        })
    }

    private constructor(socket:WebSocket) {
        this.socket = socket;
        this.handlers = {}
        socket.addEventListener("message", (message:MessageEvent) => {
            this.handleRequest(message.data)
        })
        socket.addEventListener("close", () => {
            console.debug("CritterSocket closed")
        })
        socket.addEventListener("error",(error) => {
            this.handleError(error);
        })
        //todo add BattleError handling
    }

    onClose(cb: () => void): void {
        this.socket.addEventListener("close", cb)
    }

    send(resource: string, body: any): void {
        this.socket.send(`${resource}\n${JSON.stringify(body)}`);// see API docs in CombatCritters for details on this structure
    }

    register(handler: HandlerSet): void {
        Object.assign(this.handlers,handler) // concatenate the dict with new handlers
    }

    handleRequest(payload:string){
        //separate resource and payload
        let [resource, bodyRaw, _] = payload.split(/\r?\n(.*)/)//https://stackoverflow.com/a/4607799 <--- good explanation on how this works
        let body = JSON.parse(bodyRaw)
        //forward payload to handler (if exists, log if it doesn't)
        let handler = this.handlers[resource]
        if (!!handler) {
            handler(body)
        } else {
            console.error(`CritterSocket received unhandled request with resource: ${resource}`)
            console.debug(this.handlers)
        }
    }

    handleError(error: Event){
        //todo throw something here
        console.error(error);
    }

}