/**
 * Extracts the value from an event's target element.
 *
 * This spark returns `event.target.value`, commonly used with
 * input, textarea, and select elements.
 *
 * @param {Event} event - The event containing the target with a value property.
 * @returns {any} The value from `event.target.value`.
 *
 * @example
 * class MyInput extends HTMLElement {
 *   @event.input('input', value)
 *   handleInput(inputValue) {
 *     // Receives the input value directly, not the event
 *     console.log('Input value:', inputValue);
 *   }
 * }
 */
function value(event) {
  return event.target.value;
}

export default value;
