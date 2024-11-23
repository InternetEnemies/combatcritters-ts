/**
 * IVendorReputation.ts
 * @created 2024-10-29
 * @brief Interface for the vendor reputation object
 */

export interface IVendorReputation {
    // User reputation with the vendor
    current_xp: number;
    level: number;
    next_level_xp: number;
    prev_level_xp: number;
}