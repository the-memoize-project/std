/**
 * Prevents the default action of an event by calling `event.preventDefault()`.
 *
 * This spark cancels the event's default behavior (e.g., form submission,
 * link navigation, checkbox toggling).
 *
 * @param {Event} event - The event to prevent default action for.
 * @returns {Event} The same event for chaining.
 *
 * @example
 * class MyForm extends HTMLElement {
 *   @event.submit('form', prevent)
 *   handleSubmit(event) {
 *     // Form won't submit normally, handle it with JavaScript
 *     console.log('Custom form handling');
 *   }
 * }
 */
function prevent(event) {
  event.preventDefault();
  return event;
}

export default prevent;
