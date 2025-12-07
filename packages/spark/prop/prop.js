/**
 * Dynamically accesses a property from an object.
 *
 * @param {object} target - Source object.
 * @param {string} path - Property path, can contain bracket notation.
 * @returns {any} Property value or `undefined`.
 */
export function prop(target, path) {
  try {
    return new Function(
      "target",
      `return target${/\[/.test(path) ? "" : "."}${path}`,
    )(target);
  } catch (_) {
    return undefined;
  }
}
