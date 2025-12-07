/**
 * Type declaration for the spark 'subtract'.
 *
 * @description
 * Subtracts the second value from the first. A função garante que a operação
 * seja matemática, convertendo os valores para o tipo Number.
 *
 * @param x - The base value (minuendo).
 * @param y - The value to be subtracted (subtraendo).
 * @returns The difference between the two values como um número.
 *
 * @example
 * import { subtract } from '@hive/std/spark';
 *
 * const result = subtract(100, "25.5"); // Returns 74.5 (number)
 */
export declare function subtract(
  x: number | string,
  y: number | string,
): number;
