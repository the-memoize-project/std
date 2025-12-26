/**
 * Converts form data to a plain JavaScript object.
 *
 * This spark creates a FormData instance from the event's target form
 * and converts it to a plain object using `Object.fromEntries()`.
 * Includes the submitter element if present.
 *
 * @param {Event} event - The form submission event.
 * @returns {Object.<string, FormDataEntryValue>} An object representation of the form data.
 *
 * @example
 * class MyForm extends HTMLElement {
 *   @event.submit('form', prevent, formData)
 *   handleSubmit(data) {
 *     // Receives form data as a plain object
 *     console.log('Form data:', data);
 *     // { username: 'john', email: 'john@example.com' }
 *   }
 * }
 */
const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));

export default formData;
