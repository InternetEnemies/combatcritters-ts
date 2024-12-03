import {IMatchStateObserver} from "./IMatchStateObserver";
import {HandlerSet} from "../ICritterSocket";
import {GameFoundEvent, MatchEndedEvent} from "../payloads/MatchPayloads";

export function getMatchStateAdapter(matchStateObserver:IMatchStateObserver): HandlerSet {
    return {
        game_found_event:(body:GameFoundEvent) => {
            matchStateObserver.gameFound(body.opponent)
        },
        match_ended_event:(body:MatchEndedEvent) => {
            matchStateObserver.matchEnded()
        }
    }
}