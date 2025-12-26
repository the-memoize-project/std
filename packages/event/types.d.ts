/**
 * @module @hive/std/event
 *
 * @description
 * Type declaration for the dynamic '@event' decorator. This module
 * enables declarative listening to DOM events within the Shadow DOM.
 */
declare module "@hive/std/event" {
  /**
   * Defines the signature of an event decorator.
   *
   * @param selector - A CSS selector for the target element within the Shadow DOM.
   * @param filters - (Optional) Functions that transform the event object.
   * @returns A method decorator.
   */
  type EventDecorator = (
    selector: string,
    ...filters: ((event: Event) => any)[]
  ) => (target: object, propertyKey: string | symbol) => void;

  /**
   * Decorator that adds an event listener to an element within the Shadow DOM.
   *
   * @param {string} type - Event type (e.g., 'click').
   * @param {string} selector - CSS selector to identify the event target.
   * @param {...Function} filters - Functions applied to the event before method execution.
   * @returns {Function} A decorator that associates the method with the event.
   *
   * @description
   * The `event` decorator allows listening to DOM events fired on elements
   * in the Custom Element's Shadow DOM. It allows applying filters to the event
   * before calling the decorated method, and performs automatic management
   * with `AbortController` for listener removal on `disconnectedCallback`.
   *
   * @example
   * class MyElement extends HTMLElement {
   *   @event.click('button')
   *   handleClick(event) {
   *     console.log('Button clicked', event);
   *   }
   * }
   */
  const event: {
    [K in keyof GlobalEventHandlersEventMap]: EventDecorator;
  } & {
    [key: string]: EventDecorator;
  };

  export default event;

  /**
   * Stops event propagation by calling event.stopPropagation().
   *
   * @param event - The event to stop propagation for.
   * @returns The same event for chaining.
   */
  export function stop(event: Event): Event;

  /**
   * Prevents the default event action by calling event.preventDefault().
   *
   * @param event - The event to prevent default action for.
   * @returns The same event for chaining.
   */
  export function prevent(event: Event): Event;

  /**
   * Extracts the value from an event target.
   *
   * @param event - The event containing the target with a value property.
   * @returns The value from event.target.value.
   */
  export function value(event: Event): any;

  /**
   * Extracts the detail payload from a custom event.
   *
   * @param event - The custom event containing detail data.
   * @returns The detail payload from event.detail.
   */
  export function detail(event: CustomEvent): any;

  /**
   * Converts form data to a plain object.
   *
   * @param event - The form submission event.
   * @returns An object representation of the form data.
   */
  export function formData(event: Event): Record<string, FormDataEntryValue>;
}
