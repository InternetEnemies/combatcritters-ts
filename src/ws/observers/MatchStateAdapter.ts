import {IMatchStateObserver} from "./IMatchStateObserver";
import {HandlerSet} from "../ICritterSocket";
import {GameFoundEvent, MatchEndedEvent} from "../payloads/MatchPayloads";
import {IRest} from "../../rest";
import {ItemStack, Offer} from "../../objects";

export function getMatchStateAdapter(matchStateObserver:IMatchStateObserver, rest:IRest): HandlerSet {
    return {
        game_found_event:(body:GameFoundEvent) => {
            matchStateObserver.gameFound(body.opponent)
        },
        match_ended_event:(body:MatchEndedEvent) => {
            let items = body.rewards.map((reward) => {
                return new ItemStack(Offer.fromOfferItemPayload(reward,rest),reward.count)
            })
            matchStateObserver.matchEnded(body.type, items)
        }
    }
}