/**
 * Type declaration for the spark 'inc' (Increment).
 *
 * @description
 * Increments a value by 1. A função converte o valor de entrada para o tipo
 * Number antes da operação para garantir um resultado matemático correto.
 *
 * @param x - The value to be incremented.
 * @returns O valor incrementado como um número.
 *
 * @example
 * import { inc } from '@hive/std/spark';
 *
 * const result = inc("9"); // Returns 10 (number)
 */
export declare function inc(x: number | string): number;
