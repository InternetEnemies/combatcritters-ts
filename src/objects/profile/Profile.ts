import {IDeck, IProfile, IUser} from "../interfaces";
import {IClient} from "../../IClient";
import {Deck} from "../deck";
import {Routes, Payloads} from "../../rest";


export class Profile implements IProfile {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getDeck(): Promise<IDeck|null> {
        const response:Payloads.ProfilesPayload = await this.fetch();
        if(Object.keys(response.featured_deck).length === 0){
            return null;
        }
        return Deck.fromDeckDetailsPayload(response.featured_deck, this._client, this._user);
    }

    public async setDeck(deck: IDeck): Promise<void> {
        let deckPayload:Payloads.ProfilesPayload = {featured_deck:{deckid:deck.deckid,name:deck.name}};
        await this._client.rest.put(Routes.Profiles.User.profile(this._user.id), deckPayload);
    }

    private async fetch(): Promise<Payloads.ProfilesPayload> {
        const response:Payloads.ProfilesPayload = await this._client.rest.get(Routes.Profiles.User.profile(this._user.id));
        return response;
    }
}