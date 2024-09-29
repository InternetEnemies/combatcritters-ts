import {IClient} from "./IClient";
import {CardsManager, ICardsManager, IUserManager, UserManger} from "./managers";
import {Rest, IRest} from "./rest";
import {IUser} from "./objects";

export class Client implements IClient{
    
    private readonly _cards:ICardsManager;
    private readonly _rest: IRest;
    private readonly _users:IUserManager;
    private _user!:IUser; //user is initialized late

    /**
     * initialize a client instance from the api URI using default implementations
     * @param api URI of the api
     */
    static fromApi(api:string):IClient{
        return new Client(
            new UserManger(),
            new Rest(api),
            new CardsManager()
        )
    }
    
    
    constructor(cards:ICardsManager, rest:IRest, users:IUserManager){
        this._cards = cards;
        this._rest = rest;
        this._users = users;
    }
    
    public async login(username:string, password:string):Promise<void> {
        
    }
    public async register(username: string, password: string): Promise<void> {
    }
    
    // properties
    public get cards(): ICardsManager{
        return this._cards;
    }
    public get rest(): IRest{
        return this._rest;
    }
    public get user(): IUser{
        return this._user;
    }
    public get users(): IUserManager{
        return this._users;
    }
    
}
