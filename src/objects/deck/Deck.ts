import { Routes } from "../../rest/routes/decks";
import { ICard, IUser, IDeckValidity, DeckValidity, IDeck, Card  } from "../index";
import { Deck as DeckPayload, DeckDetails as DeckDetailsPayload, DeckValidity as DeckValidityPayload, UpdateDeck as UpdateDeckPayload, Card as CardPayload } from "../../rest/payloads";
import { IClient } from "../../index";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private readonly _name: string;
    private readonly _user: IUser;
    private localcards: ICard[];
    private cardsCached: boolean;
    private readonly _client: IClient;

    /**
     * Create a deck object from a deck details payload
     * @param payload deck details payload
     * @param client 
     * @param user 
     * @returns IDeck the deck object
     */
    public static fromDeckDetailsPayload(payload: DeckDetailsPayload, client: IClient, user:IUser): Deck {
        return new Deck(payload.deckid, 
                        payload.name, 
                        client,
                        user);
    }

    constructor(deckid: number, name: string, client: IClient, user:IUser) {
        this._deckid = deckid;
        this._name = name;
        this._client = client;
        this._user = user;
        this.localcards = [];
        this.cardsCached = false;
    }

    public async getCards(): Promise<ICard[]> {
        if (!this.cardsCached) {
            await this.fetch();
            this.cardsCached = true;
        }
        return this.localcards;
    }

    public setCards(cards: ICard[]): ICard[] {
        this.localcards = cards;
        return this.localcards;
    }

    public async commit(): Promise<IDeckValidity> {
        let deck:DeckPayload ={cards:this.localcards.map(card => card.cardid)};
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.id, this._deckid), deck);
        return DeckValidity.fromDeckValidityPayload(response.deck_validity);
    }

    public async reset(): Promise<void> {
        await this.fetch();
    }

    public async getValidity(): Promise<IDeckValidity> {
        const response:DeckValidityPayload = await this._client.rest.get(Routes.User.deckValidity(this._user.id ,this._deckid));
        return DeckValidity.fromDeckValidityPayload(response);
    }

    private async fetch(): Promise<void>{
        const response:CardPayload[] = await this._client.rest.get(Routes.User.deckCards(this._user.id, this._deckid));
        this.localcards = [];
        for (let i = 0; i < response.length; i++) {
            this.localcards.push(Card.fromCardPayload(response[i]));
        }
    }

    public get deckid(): number {
        return this._deckid;
    }

    public get name(): string {
        return this._name;
    }
}