import { Card } from "./index";

/**
 * Payloads for the packs
 */
export type Pack = {
    packid:number,
    name:string,
    image:string
}

export type PackResult = {
    cards:Card[]
}

export type PackCardSlot = {
    rarityWeight: {
        rarity: number,
        weight: number
    }[]
}

export type PackContents = Card[]