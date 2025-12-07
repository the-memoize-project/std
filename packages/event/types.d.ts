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
}
