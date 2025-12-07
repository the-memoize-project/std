/**
 * Decorator that executes a method before component rendering in the DOM lifecycle.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|symbol} method - Name of the method to be executed before render.
 * @returns {void}
 *
 * @description
 * The `willPaint` decorator registers a method to be executed immediately before
 * rendering the component's content, within `connectedCallback`, and before
 * applying styles and updating `innerHTML`.
 *
 * This decorator is useful to prepare the component's state before it is painted.
 * It is triggered before `requestAnimationFrame`, ensuring any pre-rendering logic
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
export declare function willPaint(
  target: object,
  method: string | symbol,
): void;
