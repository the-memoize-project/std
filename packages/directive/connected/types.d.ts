/**
 * Decorator that executes a method when the Custom Element is inserted into the DOM.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `connected` decorator registers a specific method to be executed
 * automatically whenever the Custom Element is connected to the DOM.
 * Internally, registration is performed using an interceptor to ensure
 * organized and predictable execution of the decorated method.
 *
 * @example
 * import { connected } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   initializeComponent() {
 *     console.log('Component connected to DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function connected(
  target: object,
  method: string | symbol,
): void;
