import { Deck, IDeck, IUser, IProfile } from "./index";
import { IClient } from "../index";
import { Payloads, Routes } from "../rest/index";

export class Profile implements IProfile {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    public async getProfile(): Promise<IDeck|null> {
        const response = await this._client.rest.get(Routes.Profiles.User.profile(this._user.id));
        if(response.length() == 0){
            return null;
        }
        const profilePayload = response as Payloads.ProfilesPayload;
        return Deck.fromDeckDetailsPayload(profilePayload.featured_deck, this._client, this._user);
    }

    public async setProfile(deck: IDeck): Promise<void> {
        let deckPayload:Payloads.ProfilesPayload = {featured_deck:{deckid:deck.deckid,name:deck.name}};
        await this._client.rest.put(Routes.Profiles.User.profile(this._user.id), deckPayload);
    }
}