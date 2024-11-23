import {IVendorReputation} from "../interfaces";
import {VendorReputation as VendorReputationPayload} from "../../rest/payloads";

/**
 * VendorReputation.ts
 * @created 2024-10-29
 * @brief Vendor reputation object
 */

export class VendorReputation implements IVendorReputation {
    private readonly _current_xp: number;
    private readonly _level: number;
    private readonly _next_level_xp: number;
    private readonly _prev_level_xp: number;
    
    public static fromVendorReputationPayload(payload: VendorReputationPayload): IVendorReputation {
        return new VendorReputation(
            payload.current_xp,
            payload.level,
            payload.next_level_xp,
            payload.prev_level_xp
        );
    }

    constructor(current_xp: number, level: number, next_level_xp: number, prev_level_xp: number) {
        this._current_xp = current_xp;
        this._level = level;
        this._next_level_xp = next_level_xp;
        this._prev_level_xp = prev_level_xp;
    }

    public get current_xp(): number {
        return this._current_xp;
    }
    public get level(): number {
        return this._level;
    }
    public get next_level_xp(): number {
        return this._next_level_xp;
    }
    public get prev_level_xp(): number {
        return this._prev_level_xp;
    }
}