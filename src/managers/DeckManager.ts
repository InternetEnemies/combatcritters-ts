import {IDeckManager} from "./interfaces";
import {IClient} from "../IClient";
import {Deck, IDeck, IDeckValidator, IUser} from "../objects";
import {DeckDetails, DeckRules} from "../rest/payloads";
import {Routes} from "../rest";

export class DeckManager implements IDeckManager {
    private readonly _client: IClient;
    private readonly _user: IUser;
    private _validator!: IDeckValidator;

    constructor(client: IClient, user: IUser, validator: IDeckValidator) {
        this._client = client;
        this._user = user;
        this._validator = validator;
    }

    public async getDecks(): Promise<IDeck[]> {
        const userRes: DeckDetails[] = await this._client.rest.get(Routes.Decks.User.decks(this._user.id));
        const decks: IDeck[] = [];
        for (let i = 0; i < userRes.length; i++) {
            decks.push(Deck.fromDeckDetailsPayload(userRes[i], this._client, this._user));
        }
        return decks;
    }

    public async createDeck(deckName: string): Promise<IDeck> {
        const userRes: DeckDetails = await this._client.rest.post(Routes.Decks.User.decks(this._user.id), { name: deckName });
        return Deck.fromDeckDetailsPayload(userRes, this._client, this._user);
    }

    public async deleteDeck(deck: IDeck): Promise<void> {
        await this._client.rest.delete(Routes.Decks.User.singleDeck(this._user.id, deck.deckid));
    }

    public async getDeckRules(): Promise<DeckRules> {
        const userRes: DeckRules = await this._client.rest.get(Routes.Decks.validity());
        return userRes;
    }

    public get validator(): IDeckValidator {
        return this._validator;
    }
}