/**
 * @Created 2024-09-28
 * @Brief this file contains interfaces for handling both critter and item cards. 
 */


export interface ICard {
    cardid:number;
    name: string;
    playcost: number;
    rarity: number;
    image: string;
    description: string;
}

export interface ICardCritter extends ICard {
    damage: number;
    health: number;
    abilities: number[];
}

export interface ICardItem extends ICard {
    abilityid: number;
}