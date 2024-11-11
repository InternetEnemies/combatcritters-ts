import {IClient} from "./IClient";
import {ICardsManager, IVendorManager} from "./index";
import {Rest, IRest, Routes} from "./rest";
import {DeckValidator, IDeckValidator, IUser} from "./objects";
import {DeckRules, UserPayload, CardQuery as CardQueryPayload } from "./rest/payloads";
import {User} from "./objects/user/User";
import {IClientComponentFactory} from "./IClientComponentFactory";
import {ClientComponentFactory} from "./ClientComponentFactory";

export class Client implements IClient{
    
    private readonly _cards:ICardsManager;
    private readonly _vendors:IVendorManager;
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
    }
    
    public async login(username:string, password:string):Promise<void> {
        const userRes:UserPayload = await this.rest.post(Routes.Auth.login(),{ username, password });
        this._user = User.fromUserPayload(this, userRes);
        console.debug(`logged in as ${userRes.username}`);
    }
    public async register(username: string, password: string): Promise<void> {
        await this.rest.post(Routes.Auth.register(),{ username, password });
    }

    public async isLoggedIn(): Promise<boolean> {
        let loggedIn = !!this._user;
        if(!loggedIn) {
            try{
                const userRes:UserPayload = await this.rest.get(Routes.Auth.getUser())
                this._user = User.fromUserPayload(this, userRes);
                loggedIn = true;
            } catch (e) {
                //not logged in (we are catching a 403 here)
            }
        }
        
        return loggedIn;
    }
    
    // properties
    public get cards(): ICardsManager{
        return this._cards;
    }
    public get vendors(): IVendorManager{
        return this._vendors;
    }
    public get rest(): IRest{
        return this._rest;
    }
    public get user(): IUser{
        return this._user;
    }
}
