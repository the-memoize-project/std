import execute from "@dom/execute";
import { didPaintCallback } from "@dom/interfaces";

/**
 * Decorator that executes a method after the component's rendering in the DOM lifecycle.
 *
 * @param {Object} target - The prototype of the decorated Custom Element.
 * @param {string|symbol} method - Name of the method to be executed after render.
 * @returns {void}
 *
 * @description
 * The `didPaint` decorator registers a method to be executed immediately after
 * the component's content rendering, inside the `connectedCallback`, and after
 * applying styles and updating `innerHTML`.
 *
 * This decorator is useful for performing tasks that depend on the already rendered DOM,
 * such as layout measurement, animations, focus, or third-party integration.
 * It is triggered after `requestAnimationFrame`.
 *
 * @example
 * import { didPaint } from '@hive/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @didPaint
 *   finalize() {
 *     console.log('render completed');
 *   }
 * }
 */
const didPaint = (target, method) =>
  execute(method).on(target).after(didPaintCallback);

export default didPaint;
