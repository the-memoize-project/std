/**
 * Template tag `html` to generate HTML strings safely and in a controlled manner.
 *
 * @param {TemplateStringsArray} strings - Array with literal pieces of the template.
 * @param {...any} values - Values interpolated in the template.
 * @returns {string} Combined HTML as a string.
 *
 * @description
 * This function is used in the `component` helper to define HTML content
 * of Web Components declaratively, using template literals.
 *
 * The current behavior just concatenates values and strings,
 * respecting data interpolation without applying any transformation
 * or sanitization. Future versions may include minification, cleanup or validation.
 *
 * @example
 * const name = "World";
 * const text = html`<h1>Hello, ${name}!</h1>`;
 * console.log(text); // "<h1>Hello, World!</h1>"
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;
