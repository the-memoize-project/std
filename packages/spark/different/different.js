/**
 * Compares two values and returns `true` if they are different.
 *
 * @param {*} x - Current value.
 * @param {*} y - Comparison value.
 * @returns {boolean} `true` if `x != y`, otherwise `false`.
 */
export function different(x, y) {
  // biome-ignore lint/suspicious/noDoubleEquals: intentional type coercion comparison
  return x != y;
}
