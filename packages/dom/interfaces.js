/**
 * Symbolic property used to indicate if the component has already been rendered.
 *
 * This flag is automatically set to `true` after executing the `paintCallback`,
 * and is used internally by decorators like `@repaint` to condition new rendering
 * only when the component has already undergone an initial rendering.
 */
export const isPainted = Symbol.for("isPainted");

/**
 * Unique identifier for the callback executed after component rendering.
 *
 * Used internally by decorators and helpers like `@didPaint` to ensure that the
 * associated method is executed after applying styles and updating the DOM.
 */
export const didPaintCallback = Symbol("didPaintCallback");

/**
 * Unique identifier for the callback to update the component's HTML content.
 *
 * This callback is invoked during the `paint` or `repaint` process, and is responsible for
 * rendering the HTML in the `shadowRoot` (or in the element directly, if `shadowRoot` doesn't exist).
 *
 * Can be used in isolation with decorators like `@html`, or in conjunction with `@paint` and `@repaint`.
 */
export const htmlCallback = Symbol("htmlCallback");

/**
 * Unique identifier for the callback to apply component styles.
 *
 * This callback is called to obtain the styles (CSSStyleSheet) that should be applied
 * via `adoptedStyleSheets`. It can be used in isolation through the `@retouch` decorator
 * or combined in broader flows like `@paint`.
 *
 * Must return a `CSSStyleSheet` instance or a Promise that resolves to one.
 */
export const cssCallback = Symbol("cssCallback");

/**
 * Unique identifier for the callback executed before component rendering.
 *
 * Used by decorators like `@willPaint` to indicate that a method should be executed
 * before any DOM manipulation, within the `connectedCallback`.
 */
export const willPaintCallback = Symbol("willPaintCallback");
