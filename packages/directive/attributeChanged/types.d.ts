/**
 * Decorator that executes a setter when an observed attribute is changed.
 *
 * @param {string} attribute - Name of the attribute to be monitored.
 * @param {...Function} filters - Functions that transform the new value before assignment.
 * @returns {void}
 *
 * @description
 * The `attributeChanged` decorator registers the attribute as observed and
 * executes the decorated setter whenever it is changed, using
 * the `attributeChangedCallback` API. The new value can be transformed by filters.
 *
 * @example
 * import { attributeChanged } from '@hive/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @attributeChanged('visible', value => value === 'true')
 *   set visible(value) {
 *     this.toggleAttribute('hidden', !value);
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function attributeChanged(
  attribute: string,
  ...filters: ((value: any) => any)[]
): (target: object, propertyKey: string | symbol) => void;
