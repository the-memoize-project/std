/**
 * @module @hive/std/echo
 *
 * @description
 * Type declaration for the 'Echo' mixin, the Dataflow pillar
 * of the @hive/std ecosystem.
 */
declare module "@hive/std/echo" {
  type CustomElementConstructor = new (...args: any[]) => HTMLElement;

  /**
   * Echo Mixin
   *
   * @param {CustomElementConstructor} Klass - The base class (usually HTMLElement).
   * @returns {Klass} A new extended class with `on` attribute support.
   *
   * @description
   * The `Echo` mixin adds support for the `on` attribute, allowing external events
   * to be mapped to attributes, methods or setters of the component itself.
   *
   * It observes the `on` attribute, listens to events in the DOM scope and performs
   * declarative routing via arcs in the format: `source/event:type/sink|sparks`.
   *
   * Filters (sparks) are applied before assigning the value to the target.
   * This mixin is non-opinionated, compatible with the native lifecycle and other decorators.
   *
   * @example
   * class MyElement extends Echo(HTMLElement) {
   *   set color(value) {
   *     this.style.color = value;
   *   }
   * }
   */
  export default function Echo<TBase extends CustomElementConstructor>(
    Klass: TBase,
  ): TBase;
}
