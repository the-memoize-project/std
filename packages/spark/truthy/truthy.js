/**
 * Evaluates whether a value can be considered truthy, following HTML boolean attribute conventions.
 *
 * @param {string|null} value - Raw value from the DOM.
 * @returns {boolean} `false` for `"false"`, `"0"`, `"no"`, or `null`; `true` otherwise.
 *
 * @description
 * This spark interprets the values `"false"`, `"0"`, `"no"`, and `null` as `false`,
 * and any other value as `true`. It's useful for HTML attributes
 * that represent boolean flags, such as `disabled`, `checked`, etc.
 *
 * @example
 * truthy("no");     // false
 * truthy("false");  // false
 * truthy("0");      // false
 * truthy(null);     // false
 * truthy("true");   // true
 * truthy("");       // true
 */
export function truthy(value) {
  if (value === "no") return false;
  if (value === "false") return false;
  if (value === "0") return false;
  if (value === null) return false;
  return true;
}
