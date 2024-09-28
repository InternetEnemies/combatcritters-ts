export type Card = {
    cardid:number,
    name:string,
    playcost:number,
    rarity:number,
    image:string,
    description:string,
    type:string,
    type_specific: CardCritter | CardItem
}

export type CardCritter = {
    damage:number,
    health:number,
    abilities:number[]
}

export type CardItem = {
    abilityid:number
}