import {DeckManager,
    FriendsManager,
    ICardsManager,
    IDeckManager,
    IFriendsManager,
    IUserCardsManager,
    UserCardsManager,
    IPacksManager,
    PacksManager,
    IUserCurrencyManager,
    UserCurrencyManager} from "../../managers";
import {IUser, IProfile, DeckValidator, Profile} from "../index";
import {UserPayload} from "../../rest/payloads";
import {IClient} from "../../IClient";


export class User implements IUser {
    private readonly _decks: IDeckManager;
    private readonly _cards: IUserCardsManager;
    private readonly _friends: IFriendsManager;
    private readonly _packs: IPacksManager;
    private readonly _currency: IUserCurrencyManager;
    private readonly _profile: IProfile;
    private readonly _username: string;
    private readonly _id: number;
    private readonly client;
    
    static fromUserPayload(client:IClient,payload:UserPayload) {
        return new User(
            client,
            payload.username,
            payload.id
        )
    }
    
    constructor(client:IClient, username: string, id: number) {
        this.client = client;
        this._id = id;
        this._cards = new UserCardsManager(client, this);
        this._decks = new DeckManager(client, this, new DeckValidator(client, this._cards));
        this._friends = new FriendsManager(client, this);
        this._packs = new PacksManager(client, this);
        this._currency = new UserCurrencyManager(client, this);
        this._profile = new Profile(client, this);
        this._username = username;
    }
    
    
    public get decks() :IDeckManager {
        return this._decks;
    }
    public get cards():IUserCardsManager {
        return this._cards;
    }
    public get friends():IFriendsManager {
        return this._friends;
    }
    public get packs():IPacksManager {
        return this._packs;
    }
    public get currency():IUserCurrencyManager {
        return this._currency;
    }
    public get profile():IProfile {
        return this._profile;
    }
    public get username():string {
        return this._username;
    }
    public get id():number {
        return this._id;
    }
}