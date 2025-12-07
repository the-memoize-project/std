import execute from "@directive/execute";

/**
 * Decorator that executes a method when removing the Custom Element from the DOM.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `disconnected` decorator registers a specific method to be executed
 * automatically whenever the Custom Element is disconnected from the DOM,
 * using the `disconnectedCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { disconnected } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @disconnected
 *   cleanup() {
 *     console.log('Element removed from the DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const disconnected = (target, method) =>
  execute(method).on(target).after("disconnectedCallback");

export default disconnected;
