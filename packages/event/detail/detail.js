/**
 * Extracts the detail payload from a CustomEvent.
 *
 * This spark returns `event.detail`, which contains custom data
 * passed when dispatching custom events.
 *
 * @param {CustomEvent} event - The custom event containing detail data.
 * @returns {any} The detail payload from `event.detail`.
 *
 * @example
 * class MyElement extends HTMLElement {
 *   @event('user-selected', detail)
 *   handleUserSelected(userData) {
 *     // Receives the detail payload directly, not the event
 *     console.log('User data:', userData);
 *   }
 * }
 */
function detail(event) {
  return event.detail;
}

export default detail;
