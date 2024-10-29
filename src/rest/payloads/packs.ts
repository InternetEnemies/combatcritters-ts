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

export type PackContents = Card[]

export type UserPack = {
    item: Pack,
    count: number
}