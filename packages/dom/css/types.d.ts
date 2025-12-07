/**
 * Template tag `css` that generates a `CSSStyleSheet` instance from a template literal.
 *
 * @param {TemplateStringsArray} strings - Literal string fragments of the CSS template.
 * @param {...any} values - Values interpolated in the template.
 * @returns {CSSStyleSheet} A stylesheet instance ready to be applied.
 *
 * @description
 * Ideal for use in Web Components with `adoptedStyleSheets`, providing a declarative API
 * to define encapsulated styles.
 *
 * @example
 * const primary = "blue";
 * const styleSheet = css`
 *   :host {
 *     color: ${primary};
 *     display: block;
 *   }
 * `;
 *
 * shadowRoot.adoptedStyleSheets = [styleSheet];
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;
