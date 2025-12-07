/**
 * Polyfill for setImmediate function.
 *
 * @description
 * Provides setImmediate functionality for environments that don't support it natively.
 * Falls back to setTimeout with 0 delay.
 *
 * @example
 * import "@hive/std/polyfill/setImmediate";
 *
 * setImmediate(() => {
 *   console.log("This runs asynchronously");
 * });
 */
if (typeof globalThis.setImmediate !== "function") {
  Reflect.defineProperty(globalThis, "setImmediate", {
    value(fn) {
      return setTimeout(fn, 0);
    },
    writable: true,
    configurable: true,
  });
}
