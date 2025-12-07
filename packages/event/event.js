import listen from "./listen";

/**
 * Decorator that adds an event listener to an element within the Shadow DOM.
 *
 * @param {string} type - Event type (e.g., 'click').
 * @param {string} selector - CSS selector to identify the event target.
 * @param {...Function} filters - Functions applied to the event before executing the method.
 * @returns {Function} A decorator that associates the method with the event.
 *
 * @description
 * The `event` decorator allows listening to DOM events fired in elements
 * of the Custom Element's Shadow DOM. It allows applying filters to the event
 * before calling the decorated method, and performs automatic management
 * with `AbortController` for listener removal in `disconnectedCallback`.
 *
 * @example
 * class MyElement extends HTMLElement {
 *   @event.click('button')
 *   handleClick(event) {
 *     console.log('Button clicked', event);
 *   }
 * }
 */
const event = new Proxy(
  {},
  {
    get(_, type) {
      return (selector, ...filters) =>
        (target, method) => {
          listen(type)
            .on(selector)
            .with(...filters)
            .in(target)
            .call(method);
        };
    },
  },
);

export default event;
