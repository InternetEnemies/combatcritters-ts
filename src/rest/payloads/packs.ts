/**
 * Payloads for the packs
 */
export type Pack = {
    packid:number,
    name:string,
    image:string,
    contents:number[]
}

export type PackResult = {
    cards:number[]
}