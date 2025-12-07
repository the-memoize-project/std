/**
 * Decorator that renders a component with styles when connected to the DOM.
 *
 * @param {Function} component - Function responsible for returning the component's HTML. Receives `this` as argument.
 * @param {...Function} styles - Functions that return `CSSStyleSheet`. Each receives `this` as argument.
 * @returns {void}
 *
 * @description
 * The `paint` decorator allows executing the rendering of a custom component
 * at the moment it is connected to the DOM, also applying encapsulated styles
 * via `adoptedStyleSheets` in the `shadowRoot` or directly on the element itself.
 *
 * It supports executing the `willPaintCallback`, `paintCallback` and `didPaintCallback` callbacks
 * to allow control over the rendering cycle.
 *
 * @example
 * import { paint } from '@hive/std/dom';
 *
 * const component = (el) => `<p>Hello, ${el.name}</p>`;
 * const style = (el) => new CSSStyleSheet();
 *
 * @paint(component, style)
 * class MyElement extends HTMLElement {
 *   name = 'world';
 * }
 */
export declare function paint(
  component: (context: any) => string,
  ...styles: ((context: any) => CSSStyleSheet)[]
): (target: any) => void;
