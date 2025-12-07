import execute from "@directive/execute";

/**
 * Decorator that executes a method when disabling the Custom Element via form.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `formDisabled` decorator registers a specific method to be executed
 * automatically when the Custom Element is disabled via form,
 * using the `formDisabledCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { formDisabled } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formDisabled
 *   onFormDisabled() {
 *     console.log('Element disabled by form.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formDisabled = (target, method) =>
  execute(method).on(target).after("formDisabledCallback");

export default formDisabled;
