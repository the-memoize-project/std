import execute from "@dom/execute";
import { willPaintCallback } from "@dom/interfaces";

/**
 * Decorator that executes a method before the component's rendering in the DOM lifecycle.
 *
 * @param {Object} target - The prototype of the decorated Custom Element.
 * @param {string|symbol} method - Name of the method to be executed before render.
 * @returns {void}
 *
 * @description
 * The `willPaint` decorator registers a method to be executed immediately before
 * the component's content rendering, inside the `connectedCallback`, and before
 * applying styles and updating `innerHTML`.
 *
 * This decorator is useful for preparing the component's state before it is painted.
 * It is triggered before `requestAnimationFrame`, ensuring that any pre-rendering logic
 * occurs in advance.
 *
 * @example
 * import { willPaint } from '@hive/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @willPaint
 *   prepare() {
 *     this.setAttribute('data-loading', 'true');
 *   }
 * }
 */
const willPaint = (target, method) =>
  execute(method).on(target).after(willPaintCallback);

export default willPaint;
