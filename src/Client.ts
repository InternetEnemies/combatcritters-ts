import {IClient} from "./IClient";
import {CardsManager, ICardsManager, IOffersManager, IVendorManager, OffersManager, VendorManager} from "./index";
import {Rest, IRest, Routes} from "./rest";
import {IUser} from "./objects";
import {UserPayload} from "./rest/payloads";
import {User} from "./objects/User";

export class Client implements IClient{
    
    private readonly _cards:ICardsManager;
    private readonly _vendors:IVendorManager;
    private readonly _offers:IOffersManager;
    private readonly _rest: IRest;
    private _user!:IUser; //user is initialized late

    /**
     * initialize a client instance from the api URI using default implementations
     * @param api URI of the api
     */
    static fromApi(api:string):IClient{
        var passingRest = new Rest(api)
        return new Client(
            passingRest,
            new CardsManager(passingRest),
            new VendorManager(passingRest),
            new OffersManager(passingRest)
        )
    }
    
    
    constructor(rest:IRest, cards:ICardsManager, vendors:IVendorManager, offers:IOffersManager){
        this._cards = cards;
        this._rest = rest;
        this._vendors = vendors;
        this._offers = offers;
    }
    
    public async login(username:string, password:string):Promise<void> {
        const userRes:UserPayload = await this.rest.post(Routes.Auth.login(),{ username, password });
        this._user = User.fromUserPayload(this, userRes);
        console.debug(`logged in as ${userRes.username}`);
    }
    public async register(username: string, password: string): Promise<void> {
        await this.rest.post(Routes.Auth.register(),{ username, password });
    }

    public async logout(): Promise<void> {
        await this.rest.post(Routes.Auth.logout(),{});
        console.debug(`${this._user.username} logged out`);
        this._user = undefined;
    }

    public isLoggedIn(): boolean {
        if(this._user) {
            return true;
        } else {
            return false;
        }
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
}
