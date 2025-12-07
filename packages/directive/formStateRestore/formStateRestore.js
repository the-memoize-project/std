import execute from "@directive/execute";

/**
 * Decorator that executes a method when restoring the state of the associated form.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `formStateRestore` decorator registers a specific method to be executed
 * automatically when the form associated with the Custom Element has its state restored,
 * using the `formStateRestoreCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { formStateRestore } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formStateRestore
 *   onFormStateRestore() {
 *     console.log('Form state restored.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formStateRestore = (target, method) =>
  execute(method).on(target).after("formStateRestoreCallback");

export default formStateRestore;
