/**
 * Type declaration for the spark 'prop'.
 *
 * @description
 * Safely accesses a nested property within an object
 * using a string as path. Returns .* instead of throwing
 * an error if any part of the path does not exist.
 *
 * @param target - The object from which the property will be extracted.
 * @param path - The path to the desired property (ex: 'user.address.city').
 * @returns The value of the found property or .* if the path is invalid.
 *
 * @example
 * import { prop } from '@hive/std/spark';
 *
 * const user = { data: { name: 'Alice' } };
 *
 * prop(user, 'data.name'); // 'Alice'
 * prop(user, 'data.address.street'); // undefined
 */
export declare function prop(target: object, path: string): any;
