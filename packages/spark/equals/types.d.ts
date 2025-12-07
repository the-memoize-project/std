/**
 * Type declaration for the spark 'equals'.
 *
 * @description
 * Compara dois valores e retorna `true` se eles forem iguais. Utiliza a
 * comparação não-estrita (`==`) para permitir a coerção de tipo, o que é
 * útil no contexto do DOM onde valores como `5` e `"5"` devem ser
 * considerados iguais.
 *
 * @param x - The first value to be compared.
 * @param y - The second value to be compared.
 * @returns `true` if the values are equal após a coerção de tipo, senão `false`.
 *
 * @example
 * import { equals } from '@hive/std/spark';
 *
 * equals('5', 5); // true
 * equals(1, true); // true
 * equals('hello', 'world'); // false
 */
export declare function equals(x: any, y: any): boolean;
