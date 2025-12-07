/**
 * Unique identifier for the callback executed when connecting an Echo arc.
 *
 * @const {symbol}
 * @description
 * Used internally by the `Echo` mixin to configure listeners associated
 * with the `on` attribute. This callback is called when the `on` attribute is added or modified,
 * allowing the registration of new declarative arcs (events arriving at the component).
 */
export const connectArc = Symbol.for("connectArc");

/**
 * Unique identifier for the callback executed when disconnecting an Echo arc.
 *
 * @const {symbol}
 * @description
 * Used internally by the `Echo` mixin to remove event listeners
 * registered via the `on` attribute. It's called when removing the value of the `on` attribute or
 * when the component is disconnected from the DOM.
 */
export const disconnectArc = Symbol.for("disconnectArc");

/**
 * Unique identifier for the `on` attribute, used to declare reactive listeners.
 *
 * @const {symbol}
 * @description
 * Used to indicate that the `Echo` mixin should observe changes to the `on` attribute,
 * which defines routing protocols for external events to internal destinations
 * (attributes, setters, or methods). Each value of `on` represents a declarative graph.
 */
export const on = "on";
