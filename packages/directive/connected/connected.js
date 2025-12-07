import execute from "@directive/execute";

/**
 * Decorator that executes a method when inserting the Custom Element into the DOM.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `connected` decorator registers a specific method to be executed
 * automatically whenever the Custom Element is connected to the DOM.
 * Internally, the registration is performed using an interceptor to ensure
 * organized and predictable execution of the decorated method.
 *
 * @example
 * import { connected } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   initializeComponent() {
 *     console.log('Component connected to the DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const connected = (target, method) =>
  execute(method).on(target).after("connectedCallback");

export default connected;
