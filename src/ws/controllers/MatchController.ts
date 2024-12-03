import {IMatchController} from "./IMatchController";
import {CritterController} from "./CritterController";
import {CancelMatchCommand, MatchCommand} from "../payloads/MatchPayloads";
import {IDeck} from "../../objects";

export class MatchController extends CritterController implements IMatchController{
    match(type: string, deck:IDeck): void {
        let command:MatchCommand = {
            type: type,
            deckid: deck.deckid,
        }
        this.ws.send("match_command", command);
    }
    cancelMatch(): void {
        let command:CancelMatchCommand={}
        this.ws.send("cancel_match_command", command);
    }

}