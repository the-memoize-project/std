import execute from "@directive/execute";

/**
 * Decorator that executes a method when the Custom Element is associated with a form.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|Symbol} method - Name of the method to be executed.
 * @returns {void}
 *
 * @description
 * The `formAssociated` decorator registers a specific method to be executed
 * automatically when the Custom Element is associated with a `<form>`, using
 * the `formAssociatedCallback` API with Proxy to maintain the original flow.
 *
 * @example
 * import { formAssociated } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formAssociated
 *   onFormAssociated() {
 *     console.log('Element associated with form.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formAssociated = (target, method) =>
  execute(method).on(target).after("formAssociatedCallback");

export default formAssociated;
