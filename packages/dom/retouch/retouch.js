import "@polyfill/setImmediate";
import { cssCallback, isPainted } from "@dom/interfaces";

/**
 * Decorator that reapplies the component's styles after a method or setter execution.
 *
 * @param {Object} target - The prototype of the decorated Custom Element.
 * @param {string|symbol} propertyKey - The name of the decorated method or setter.
 * @param {PropertyDescriptor} descriptor - The descriptor of the method or setter.
 * @returns {void}
 *
 * @description
 * The `retouch` decorator intercepts the execution of methods or setters and,
 * if the component has already been rendered (`isPainted = true`),
 * re-executes the style application defined in the `cssCallback`.
 *
 * This is useful when the component's style depends on dynamic data
 * that may change during the component's execution.
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
const retouch = (_target, _propertyKey, descriptor) => {
  const apply = (original, context, args) => {
    setImmediate(async () => {
      if (context[isPainted]) {
        await new Promise(context[cssCallback]);
      }
    });

    return original.apply(context, args);
  };

  if (descriptor.set) {
    descriptor.set = new Proxy(descriptor.set, { apply });
  }

  if (descriptor.value) {
    descriptor.value = new Proxy(descriptor.value, { apply });
  }
};

export default retouch;
