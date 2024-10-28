import { ICard, IItem, IItemVisitor, IPack, ICardCritter, ICardItem, CardCritter, CardItem } from './index';
import { Pack as PackPayload, Card as CardPayload } from '../rest/payloads/index';
import { IClient } from "../IClient";

export class Pack implements IPack, IItem{

    private readonly _image: string;
    private readonly _name: string;
    private readonly _packid: number;
    private readonly _client: IClient;

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
    }

    public async open(): Promise<ICard[]> {
        //TODO: Correct this function once #67 is resolved
        // https://github.com/InternetEnemies/combatcritters-ts/issues/67
        return this.getCards().splice(0, 5);
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