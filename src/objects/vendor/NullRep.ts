import {IVendorReputation} from "../index";

export class NullRep implements IVendorReputation{
    current_xp: number = 0;
    level: number = 0;
    next_level_xp: number = 0;
    prev_level_xp: number = 0;
    
}