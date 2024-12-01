import {IMatchController} from "./IMatchController";
import {CritterController} from "./CritterController";
import {CancelMatchCommand, MatchCommand} from "../payloads/MatchPayloads";

export class MatchController extends CritterController implements IMatchController{
    match(type: string): void {
        let command:MatchCommand = {
            type: type
        }
        this.ws.send("match_command", command);
    }
    cancelMatch(): void {
        let command:CancelMatchCommand={}
        this.ws.send("cancel_match_command", command);
    }

}