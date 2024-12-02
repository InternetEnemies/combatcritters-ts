import {IMatchStateObserver} from "./IMatchStateObserver";
import {HandlerSet} from "../ICritterSocket";
import {GameFoundEvent} from "../payloads/MatchPayloads";

export function getMatchStateAdapter(matchStateObserver:IMatchStateObserver): HandlerSet {
    return {
        game_found_event:(body:GameFoundEvent) => {
            matchStateObserver.gameFound(body.opponent)
        }
    }
}