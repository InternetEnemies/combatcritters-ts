import { ICard, IItem, IItemVisitor, IPack, ICardCritter, ICardItem, CardCritter, CardItem, Card } from './index';
import { Pack as PackPayload, Card as CardPayload } from '../rest/payloads/index';
import { IClient } from "../IClient";
import { Routes } from '../rest';

export class Pack implements IPack, IItem{

    protected readonly _image: string;
    protected readonly _name: string;
    protected readonly _packid: number;
    protected readonly _client: IClient;

    public static fromPackDetailsPayload(payload: PackPayload, client: IClient): Pack {
        return new Pack(payload.image,
                        payload.name,
                        payload.packid,
                        client);
    }

    constructor(image: string, name: string, packid: number, client: IClient) {
        this._image = image;
        this._name = name;
        this._packid = packid;
        this._client = client;
    }

    public accept(visitor: IItemVisitor): void{
        visitor.visitPack(this);
    }

    public async getSetList(): Promise<ICard[]> {
        const response:CardPayload[] = await this._client.rest.get(Routes.Packs.packContents(this.packid));
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