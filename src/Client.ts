import {IClient} from "./IClient";
import {ICardsManager, IOffersManager, IVendorManager} from "./index";
import {Rest, IRest, Routes} from "./rest";
import {DeckValidator, IDeckValidator, IUser} from "./objects";
import {DeckRules, UserPayload} from "./rest/payloads";
import {User} from "./objects/User";
import {IClientComponentFactory} from "./IClientComponentFactory";
import {ClientComponentFactory} from "./ClientComponentFactory";

export class Client implements IClient{
    
    private readonly _cards:ICardsManager;
    private readonly _vendors:IVendorManager;
    private readonly _offers:IOffersManager;
    private _deckValidator!:IDeckValidator;
    private readonly _rest: IRest;
    private _user!:IUser; //user is initialized late

    /**
     * initialize a client instance from the api URI using default implementations
     * @param api URI of the api
     */
    static fromApi(api:string):IClient{
        
        return new Client(
            new ClientComponentFactory(),
            new Rest(api)
        )
    }
    
    
    constructor(factory:IClientComponentFactory, rest:IRest){
        this._cards = factory.getCardsManager(this);
        this._rest = rest;
        this._vendors = factory.getVendorManager(this);
        this._offers = factory.getOffersManager(this);
    }
    
    public async login(username:string, password:string):Promise<void> {
        const userRes:UserPayload = await this.rest.post(Routes.Auth.login(),{ username, password });
        const rules:DeckRules = await this.rest.get(Routes.Decks.validity());
        this._user = User.fromUserPayload(this, userRes);
        const userCards = await this.rest.get(Routes.Cards.User.cards(this._user.id, ""));
        this._deckValidator = DeckValidator.from_DeckRules_UserCards(rules, userCards);
        console.debug(`logged in as ${userRes.username}`);
    }
    public async register(username: string, password: string): Promise<void> {
        await this.rest.post(Routes.Auth.register(),{ username, password });
    }

    public isLoggedIn(): boolean {
        return !!this._user;
    }
    
    // properties
    public get cards(): ICardsManager{
        return this._cards;
    }
    public get vendors(): IVendorManager{
        return this._vendors;
    }
    public get offers(): IOffersManager{
        return this._offers;
    }
    public get rest(): IRest{
        return this._rest;
    }
    public get user(): IUser{
        return this._user;
    }
    public get deckValidator(): IDeckValidator{
        return this._deckValidator;
    }
}
