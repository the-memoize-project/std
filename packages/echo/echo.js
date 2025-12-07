import spark from "@spark";
import { connectArc, disconnectArc, on } from "./interfaces";
import target from "./target";

/**
 * Echo Mixin
 *
 * @param {CustomElementConstructor} Klass - The base class (usually HTMLElement).
 * @returns {Klass} A new class extended with support for the `on` attribute.
 *
 * @description
 * The `Echo` mixin adds support for the `on` attribute, allowing external events
 * to be mapped to attributes, methods, or setters of the component itself.
 *
 * It observes the `on` attribute, listens to events in the DOM scope, and performs
 * declarative routing via arcs in the format: `source/event:type/sink|sparks`.
 *
 * Filters (sparks) are applied before assigning the value to the destination.
 * This mixin is non-opinionated, compatible with the native lifecycle and other decorators.
 *
 * @example
 * class MyElement extends Echo(HTMLElement) {
 *   set color(value) {
 *     this.style.color = value;
 *   }
 * }
 */
const Echo = (Klass) => {
  class Host extends Klass {
    #controllers = {};

    /**
     * Defines the attributes observed by the component, including `on`.
     * This allows dynamically reacting to changes in the `on` attribute and
     * registering or removing declared arcs.
     */
    static observedAttributes = [...(Klass.observedAttributes ?? []), on];

    /**
     * Intercepts changes to observed attributes.
     * In the case of Echo, handles the activation/deactivation of arcs declared via `on`.
     *
     * @param {string} name - Name of the changed attribute.
     * @param {string|null} oldValue - Previous attribute value.
     * @param {string|null} newValue - New attribute value.
     * @returns {this}
     */
    attributeChangedCallback(name, oldValue, newValue) {
      super.attributeChangedCallback?.(name, oldValue, newValue);

      if (name === on) {
        this[disconnectArc](oldValue);
        this[connectArc](newValue);
      }

      return this;
    }

    /**
     * Terminates all active arcs when the element is removed from the DOM.
     *
     * @returns {this}
     */
    disconnectedCallback() {
      super.disconnectedCallback?.();

      for (const arc of Object.keys(this.#controllers)) {
        this[disconnectArc](arc);
      }

      return this;
    }

    /**
     * Dispatches a custom event so that other Echo components can react.
     *
     * The event name is kept (without prefix) and the `detail` payload includes:
     *
     * - `attribute.id`: value of the component's `id` attribute.
     * - `attribute.name`: value of the `name` attribute.
     * - `node`: tag name (`localName`).
     * - `token`: original content of the received `event.detail`.
     *
     * This structure standardizes the source metadata for filtering by listeners.
     *
     * @param {CustomEvent} event - Event to be dispatched.
     */
    dispatchEvent(event) {
      super.dispatchEvent?.(event);

      target.dispatchEvent(
        new CustomEvent(event.type, {
          detail: {
            attribute: {
              id: this.getAttribute("id"),
              name: this.getAttribute("name"),
            },
            node: this.localName,
            token: event.detail,
          },
        }),
      );
    }

    /**
     * Interprets and executes an arc defined in the `on` attribute.
     *
     * An arc defines:
     * - `source`: event origin (`id`, `name`, or `tag`).
     * - `event`: event type.
     * - `type`: execution type (method, setter, or attribute).
     * - `sink`: destination in the component.
     * - `filters`: transformations applied to the value before reaching the destination.
     *
     * @param {string} arc - Arc in the format `source/event:type/sink|filters`.
     * @returns {this}
     */
    [connectArc](arc) {
      this.#controllers[arc] = new AbortController();

      const [, source, event, type, sink, filters] =
        arc.match(/^([*#\w-]+)\/([\w-]+):([a-z]+)\/([\w-]+)(?:\|(.*))?$/i) ||
        [];

      const transforms = (filters || "")
        .split("|")
        .filter(Boolean)
        .map((filter) => filter.split("="))
        .map(([name, value]) => [spark.get(name), value]);

      target.addEventListener(
        event,
        (e) => {
          const {
            attribute: { id, name },
            node,
            token,
          } = e.detail;

          if (new RegExp(`^(\\*|#${id}|${name}|${node})$`, "i").test(source)) {
            const payload = transforms.reduce(
              (data, [fn, value]) => fn(data, value),
              token,
            );

            if (/method$/i.test(type)) this[sink]?.(payload);
            if (/attribute$/i.test(type)) this.setAttribute(sink, payload);
            if (/setter$/i.test(type)) this[sink] = payload;
          }

          return this;
        },
        {
          signal: this.#controllers[arc].signal,
        },
      );

      return this;
    }

    /**
     * Removes the listener associated with a specific arc using AbortController.
     *
     * @param {string} arc - Arc that will be disconnected.
     * @returns {this}
     */
    [disconnectArc](arc) {
      this.#controllers[arc]?.abort();
      return this;
    }
  }

  return Host;
};

export default Echo;
