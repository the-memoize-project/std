/**
 * Defines and registers a Custom Element using a decorator.
 *
 * @param {string} name - Name of the Custom Element to be registered.
 * @param {ElementDefinitionOptions} [options] - Optional Custom Element configuration.
 * @returns {(target: CustomElementConstructor) => void} - Decorator that defines the Custom Element.
 *
 * @description
 * Uses the `customElements.define` API to register a class as a Custom Element.
 * If the Custom Element is already defined, no action is taken.
 *
 * @example
 * import { define } from '@hive/std/directive';
 *
 * @define('my-element', { extends: 'div' })
 * class MyElement extends HTMLDivElement {
 *   constructor() {
 *     super();
 *     this.textContent = 'Hello, world!';
 *   }
 * }
 */
const define = (name, options) => (target) =>
  customElements.get(name) ?? customElements.define(name, target, options);

export default define;
