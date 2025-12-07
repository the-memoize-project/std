/**
 * Type declaration for the spark 'dec'.
 *
 * @description
 * Decrements a value by 1. A função converte o valor de entrada para o tipo
 * Number antes da operação para garantir um resultado matemático correto.
 *
 * @param x - The value to be decremented.
 * @returns O valor decrementado como um número.
 *
 * @example
 * import { dec } from '@hive/std/spark';
 *
 * const result = dec("10"); // Returns 9 (number)
 */
export declare function dec(x: number | string): number;
