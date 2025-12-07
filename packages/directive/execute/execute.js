/**
 * Creates a fluent API for executing a method after a lifecycle event.
 *
 * @param {string} method - Name of the method to execute.
 * @returns {Object} Fluent API with `on` method.
 *
 * @description
 * The `execute` function provides a fluent interface for hooking into
 * Custom Element lifecycle events. It allows you to specify a method
 * that should be executed after a particular lifecycle callback.
 *
 * @example
 * import { execute } from "@hive/std/directive";
 *
 * class MyComponent extends HTMLElement {
 *   constructor() {
 *     super();
 *     execute("init").on(this).after("connectedCallback");
 *   }
 *
 *   init() {
 *     console.log("Component initialized after connection");
 *   }
 * }
 */
const execute = (method) => ({
  on: (target) => ({
    after: (event) => {
      target[event] = new Proxy(target[event] || (() => {}), {
        apply(original, context, args) {
          original.apply(context, args);
          context[method](...args);
        },
      });
    },
  }),
});

export default execute;
