import {IVendorReputation} from "../interfaces";

/**
 * NullRep.ts
 * @created 2024-10-29
 * @brief Null reputation object
 */

export class NullRep implements IVendorReputation{
    current_xp: number = 0;
    level: number = 0;
    next_level_xp: number = 0;
    prev_level_xp: number = 0;
    
}