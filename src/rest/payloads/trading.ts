import {ItemType, OfferItem} from "./market";
import {UserPayload} from "./auth";

/**
 * trading.ts
 * @created 2024-11-29
 * @brief Trading related payload
 */
export type TradeOffer = {
    give: OfferItem[],
    id: number,
    receive: OfferItem,
    user: UserPayload
}

export type TradeOfferCreate = {
    give: TradeItemCreate[],
    user_id: number,
    receive_id:TradeItemCreate
}

export type TradeItemCreate = {
    id: number | null,
    type: ItemType,
    count: number
}