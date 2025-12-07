import "@polyfill/setImmediate";
import {
  cssCallback,
  didPaintCallback,
  htmlCallback,
  isPainted,
  willPaintCallback,
} from "@dom/interfaces";

/**
 * Decorator that forces a new component rendering after a method or setter execution.
 *
 * @param {Object} target - The prototype of the decorated Custom Element.
 * @param {string|symbol} propertyKey - The name of the decorated method or setter.
 * @param {PropertyDescriptor} descriptor - The descriptor of the method or setter.
 * @returns {void}
 *
 * @description
 * The `repaint` decorator intercepts the execution of methods or setters and,
 * if the component has already been rendered (`isPainted = true`),
 * re-executes the rendering cycle through the `paintCallback`.
 *
 * This behavior is useful for keeping the UI automatically updated after state changes.
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
const repaint = (_target, _propertyKey, descriptor) => {
  const apply = (original, context, args) => {
    setImmediate(async () => {
      if (context[isPainted]) {
        await context[willPaintCallback]?.();
        await Promise.all([
          new Promise(context[htmlCallback]),
          new Promise(context[cssCallback]),
        ]);
        await context[didPaintCallback]?.();
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

export default repaint;
