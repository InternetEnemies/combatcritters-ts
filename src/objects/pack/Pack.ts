import {ICard, IItem, IPack} from "../interfaces";
import {IRest} from "../../rest";
import {IItemVisitor} from "../visitor";
import {Card} from "../card";
import {Routes} from "../../rest";
import {Pack as PackPayload, Card as CardPayload} from "../../rest/payloads";

/**
 * Pack.ts
 * @created 2024-10-29
 * @brief Pack object
 */

export class Pack implements IPack, IItem{

    protected readonly _image: string;
    protected readonly _name: string;
    protected readonly _packid: number;
    protected readonly _rest: IRest;

    public static fromPackDetailsPayload(payload: PackPayload, rest: IRest): Pack {
        return new Pack(payload.image,
                        payload.name,
                        payload.packid,
                        rest);
    }

    constructor(image: string, name: string, packid: number, rest: IRest) {
        this._image = image;
        this._name = name;
        this._packid = packid;
        this._rest = rest;
    }

    public accept(visitor: IItemVisitor): void{
        visitor.visitPack(this);
    }

    public async getSetList(): Promise<ICard[]> {
        const response:CardPayload[] = await this._rest.get(Routes.Packs.packContents(this.packid));
        const cards:ICard[] = response.map(Card.fromCardPayload);
        return cards;
    }

    public get image(): string {
        return this._image;
    }

    public get name(): string {
        return this._name;
    }

    public get packid(): number {
        return this._packid;
    }
}