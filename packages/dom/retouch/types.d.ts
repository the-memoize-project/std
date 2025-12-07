/**
 * Decorator that reapplies the component's styles after executing a method or setter.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|symbol} propertyKey - Name of the decorated method or setter.
 * @param {PropertyDescriptor} descriptor - Descriptor of the method or setter.
 * @returns {void}
 *
 * @description
 * The `retouch` decorator intercepts the execution of methods or setters and,
 * if the component has already been rendered (`isPainted = true`),
 * executes the style application again as defined in `cssCallback`.
 *
 * This is useful when the component's style depends on dynamic data
 * that can change during component execution.
 *
 * @example
 * import { retouch } from '@hive/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   static [cssCallback]() {
 *     const sheet = new CSSStyleSheet();
 *     sheet.replaceSync(`:host { color: ${this.color}; }`);
 *     return sheet;
 *   }
 *
 *   @retouch
 *   set color(value) {
 *     this._color = value;
 *   }
 *
 *   @retouch
 *   updateStyle() {
 *     this._refresh = true;
 *   }
 * }
 */
export declare function retouch(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void;
