/**
 * Decorator that executes a method when the Custom Element is moved to another Document.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `adopted` decorator registers a specific method to be executed
 * automatically whenever the Custom Element is moved from one document to another,
 * using the `adoptedCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { adopted } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @adopted
 *   onAdopted() {
 *     console.log('Element moved to another document.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function adopted(target: object, method: string | symbol): void;
