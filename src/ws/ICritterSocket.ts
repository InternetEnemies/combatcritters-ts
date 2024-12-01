import {IRequestHandler} from "./IRequestHandler";

/**
 * @Created 2024-11-30
 * @Brief provides interface to combatcritters websocket
 */
export interface ICritterSocket {
    /**
     * send a message with the websocket
     * @param resource resource to send to
     * @param body body of the message
     */
    send(resource: string, body:object) : void;

    /**
     * register a new request handler with the websocket
     * @param handler handler to register
     */
    register(handler: HandlerSet): void;
}

export type HandlerSet = {[id:string]:IRequestHandler};