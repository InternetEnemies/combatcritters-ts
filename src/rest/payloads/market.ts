import { Currency, Pack } from "../../objects"
import { Card } from "./cards"

/**
 * market.ts
 * @created 2024-10-29
 * @brief Market related payload
 */
export type Offer = {
    give: OfferItem[],
    id: number,
    receive: OfferItem
}

export type Vendor = {
    id: number,
    name: string,
    image: string,
    reputation: VendorReputation,
    refresh_time: string
}

export type OfferItem = {
    type: ItemType,
    count: number,
    item: Card | Pack | null
}

export type RepChange = {
    amount: number,
    vendor: number
}

export type OfferDiscount = {
    discounted_give: OfferItem[],
    discount: number,
    discountid: number,
    parent_offer: Offer
}

export type VendorReputation = {
    current_xp: number,
    level: number,
    next_level_xp: number,
    prev_level_xp: number
}

export enum ItemType {
    CARD = "card",
    CURRENCY = "currency",
    PACK = "pack"
}