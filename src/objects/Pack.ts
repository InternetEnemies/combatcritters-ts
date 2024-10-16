import { ICard, IPack } from './index';

export class Pack implements IPack{

    private readonly _image: string;
    private readonly _name: string;
    private readonly _packid: number;

    // should have a from payload static method

    constructor(image: string, name: string, packid: number) {
        this._image = image;
        this._name = name;
        this._packid = packid
    }

    public async getSetList(): Promise<ICard[]> {
        throw new Error("Method not implemented.");
    }

    public async open(): Promise<ICard[]> {
        throw new Error("Method not implemented.");
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