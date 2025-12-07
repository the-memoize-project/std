/**
 * Decorator that executes a method when the form associated with the Custom Element is reset.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `formReset` decorator registers a specific method to be executed
 * automatically when the form associated with the Custom Element is reset,
 * using the `formResetCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { formReset } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formReset
 *   onFormReset() {
 *     console.log('Form reset.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formReset(
  target: object,
  method: string | symbol,
): void;
