/**
 * IItemStack.ts
 * @created 2024-10-29
 * @brief Item Stack interface
 */

export interface IItemStack<T> {
    /**
     * Get the item in the stack
     * @returns {T} The item in the stack
     */
    getItem(): T;
    /**
     * Get the amount of items in the stack
     * @returns {number} The amount of items in the stack
     */
    getAmount(): number;
}