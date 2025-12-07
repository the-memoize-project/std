/**
 * Decorator that executes a method after component rendering in the DOM lifecycle.
 *
 * @param {Object} target - Prototype of the decorated Custom Element.
 * @param {string|symbol} method - Name of the method to be executed after render.
 * @returns {void}
 *
 * @description
 * The `didPaint` decorator registers a method to be executed immediately after
 * rendering the component's content, within `connectedCallback`, and after
 * applying styles and updating `innerHTML`.
 *
 * This decorator is useful for performing tasks that depend on the already rendered DOM,
 * such as layout measurement, animations, focus or third-party integration.
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
export declare function didPaint(target: object, method: string | symbol): void;
