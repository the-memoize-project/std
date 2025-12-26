/**
 * Stops event propagation by calling `event.stopPropagation()`.
 *
 * This spark prevents the event from bubbling up the DOM tree,
 * stopping any parent handlers from being notified of the event.
 *
 * @param {Event} event - The event to stop propagation for.
 * @returns {Event} The same event for chaining.
 *
 * @example
 * class MyElement extends HTMLElement {
 *   @event.click('button', stop)
 *   handleClick(event) {
 *     // Event won't bubble to parent elements
 *     console.log('Button clicked');
 *   }
 * }
 */
function stop(event) {
  event.stopPropagation();
  return event;
}

export default stop;
