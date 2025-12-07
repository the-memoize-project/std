/**
 * @module @hive/std/polyfill
 *
 * @description
 * This module provides polyfills for modern browser APIs that may
 * not be available in all environments. Automatically detects missing APIs
 * and provides fallback implementations.
 */
declare module "@hive/std/polyfill" {
  /**
   * Polyfill for setImmediate.
   *
   * @description
   * Executes a function asynchronously after the current event loop iteration.
   * If native `setImmediate` is not available, uses `setTimeout(fn, 0)`
   * as fallback.
   *
   * This polyfill is loaded automatically when you import the module.
   * After importing, `setImmediate` will be available globally.
   *
   * @example
   * import "@hive/std/polyfill/setImmediate";
   *
   * setImmediate(() => {
   *   console.log('Executed asynchronously');
   * });
   *
   * // With arguments
   * setImmediate((msg) => {
   *   console.log(msg);
   * }, 'Hello World');
   */
  export {};
}

declare global {
  /**
   * Executes a function asynchronously after the current event loop iteration.
   *
   * @param callback - Function to be executed
   * @param args - Arguments to be passed to the function
   * @returns Timeout ID (can be used with clearTimeout)
   */
  function setImmediate<TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    ...args: TArgs
  ): number;
}
