/**
 * Decorator that forces a new component rendering after executing a method or setter.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|symbol} propertyKey - Name of the decorated method or setter.
 * @param {PropertyDescriptor} descriptor - Descriptor of the method or setter.
 * @returns {void}
 *
 * @description
 * The `repaint` decorator intercepts the execution of methods or setters and,
 * if the component has already been rendered (`isPainted = true`),
 * executes the rendering cycle again through `paintCallback`.
 *
 * This behavior is useful to keep the UI automatically updated after state changes.
 *
 * @example
 * import { repaint } from '@hive/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @repaint
 *   set data(value) {
 *     this._data = value;
 *   }
 *
 *   @repaint
 *   update() {
 *     this._updated = true;
 *   }
 * }
 */
export declare function repaint(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void;
