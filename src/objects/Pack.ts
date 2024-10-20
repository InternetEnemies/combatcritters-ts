import { ICard, IItem, IItemVisitor, IPack } from './index';
import { ICardCritter } from './index';
import { ICardItem } from './index';
import { CardCritter } from './index';
import { CardItem } from './index';

export class Pack implements IPack, IItem{

    private readonly _image: string;
    private readonly _name: string;
    private readonly _packid: number;

    // should have a from payload static method

    constructor(image: string, name: string, packid: number) {
        this._image = image;
        this._name = name;
        this._packid = packid
    }

    public accept(visitor: IItemVisitor): void{
        visitor.visitPack(this);
    }

    //TODO: Remove this function once #67 is resolved
    private getCards(): ICard[] {
        const cards: (ICardCritter | ICardItem)[] = [];

        for (let i = 0; i < 20; i++) {
            if (i < 10) {
                const critterCard = new CardCritter(
                    i,                            
                    "UglyMan, the Hideous Hero",         
                    i, 
                    2, 
                    "???",             
                    `Super ugly dude`,       
                    i, 
                    i, 
                    [0,1,2]
                );
                cards.push(critterCard);
            } else {
                const itemCard = new CardItem(
                    i + 1,                            
                    "The item",                  
                    i,
                    i, 
                    "???",               
                    "Item description",     
                    i
                );
                cards.push(itemCard);
            }
        }

        return cards;
    }


    public async getSetList(): Promise<ICard[]> {
        return this.getCards();
    }

    public async open(): Promise<ICard[]> {
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