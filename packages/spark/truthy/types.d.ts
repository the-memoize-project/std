/**
 * Type declaration for the spark 'truthy'.
 *
 * @description
 * Evaluates if a value can be considered "truthy" following the conventions
 * of HTML boolean attributes, where strings like "false", "0", "no" and the
 * value .null. are treated as false.
 *
 * @param value - The value to be evaluated, usually from an HTML attribute.
 * @returns `true` if the value is considered truthy, otherwise `false`.
 *
 * @example
 * import { truthy } from '@hive/std/spark';
 *
 * truthy("false"); // false
 * truthy(null);    // false
 * truthy("true");  // true
 * truthy("");      // true (present attribute is considered truthy)
 */
export declare function truthy(value: string | null): boolean;
