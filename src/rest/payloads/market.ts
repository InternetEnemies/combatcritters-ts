/**
 * Market related payload
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
    refrest_time: string
}

export type OfferItem = {
    type: ItemType,
    count: number,
    item_id: number
}

export type RepChange = {
    amount: number,
    vendor: string
}

export type OfferDiscount = {
    discounted_give: OfferItem[],
    discount: number,
    discountid: number,
    expires: string,
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