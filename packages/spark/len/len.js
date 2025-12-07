/**
 * Returns the number of keys in an object.
 *
 * @param {object|string} x
 * @returns {number}
 */
export function len(x) {
  return Object.keys(x ?? {})?.length;
}
