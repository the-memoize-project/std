/**
 * Type declaration for the spark 'add'.
 *
 * @description
 * Adds two values, converting them to Number type before the operation
 * to ensure a mathematical result and avoid string concatenation.
 *
 * @param x - The first value (base number).
 * @param y - The second value to be added.
 * @returns The sum of the two values as a number.
 *
 * @example
 * import { add } from '@hive/std/spark';
 *
 * const result = add("10", 5); // Returns 15 (number)
 */
export declare function add(x: number | string, y: number | string): number;
