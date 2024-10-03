import { ICardVisitor } from "../visitor/ICardVisitor";
import { ICard, ICardCritter, ICardItem } from "./interfaces";
import { Card as CardPayload } from "../rest/payloads/cards";

/**
 * @Created 2024-09-28
 * @Brief this file contains objects for both critter and item cards.
 */

export abstract class Card implements ICard {
    private readonly _cardid: number;
    private readonly _name: string;
    private readonly _playcost: number;
    private readonly _rarity: number;
    private readonly _image: string;
    private readonly _description: string;

    public static fromCardPayload(payload: CardPayload): ICardCritter | ICardItem {
        if (payload.type === "critter") {
            return CardCritter.fromCardPayload(payload);
        } else if (payload.type === "item") {
            return CardItem.fromCardPayload(payload);
        } else{
            throw new Error("Card type not recognized.");
        }
    }

    constructor(cardid: number, name: string, playcost: number, rarity: number, image: string, description: string) {
        this._cardid = cardid;
        this._name = name;
        this._playcost = playcost;
        this._rarity = rarity;
        this._image = image;
        this._description = description;
    }
    fromCardPayload(payload: CardPayload): ICardCritter | ICardItem {
        throw new Error("Method not implemented.");
    }

    public get cardid(): number {
        return this._cardid;
    }

    public get name(): string {
        return this._name;
    }

    public get playcost(): number {
        return this._playcost;
    }

    public get rarity(): number {
        return this._rarity;
    }

    public get image(): string {
        return this._image;
    }

    public get description(): string {
        return this._description;
    }

    accept(visitor: ICardVisitor): void {
        throw new Error("Method not implemented: this card should either be a critter or an item.");
    }
}

export class CardCritter extends Card implements ICardCritter {
    private readonly _damage: number;
    private readonly _health: number;
    private readonly _abilities: number[];

    public static fromCardPayload(payload: CardPayload): ICardCritter {
        return new CardCritter(
            payload.cardid,
            payload.name,
            payload.playcost,
            payload.rarity,
            payload.image,
            payload.description,
            (payload.type_specific as { damage: number }).damage,
            (payload.type_specific as { health: number }).health,
            (payload.type_specific as { abilities: number[] }).abilities
        );
    }

    constructor(cardid: number, name: string, playcost: number, rarity: number, image: string, description: string, damage: number, health: number, abilities: number[]) {
        super(cardid, name, playcost, rarity, image, description);
        this._damage = damage;
        this._health = health;
        this._abilities = abilities;
    }

    public get damage(): number {
        return this._damage;
    }

    public get health(): number {
        return this._health;
    }

    public get abilities(): number[] {
        return this._abilities;
    }

    public override accept(visitor: ICardVisitor): void {
        visitor.visitCritter(this);
    }
}

export class CardItem extends Card implements ICardItem {
    private readonly _abilityid: number;

    public static fromCardPayload(payload: CardPayload): ICardItem {
        return new CardItem(
            payload.cardid,
            payload.name,
            payload.playcost,
            payload.rarity,
            payload.image,
            payload.description,
            (payload.type_specific as { abilityid: number }).abilityid
        );
    }

    constructor(cardid: number, name: string, playcost: number, rarity: number, image: string, description: string, abilityid: number) {
        super(cardid, name, playcost, rarity, image, description);
        this._abilityid = abilityid;
    }

    public get abilityid(): number {
        return this._abilityid;
    }

    public override accept(visitor: ICardVisitor): void {
        visitor.visitItem(this);
    }
}