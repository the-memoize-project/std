import { registry } from "./registry";

/**
 * The `spark` object provides dynamic access to the transformer registry.
 *
 * @description
 * It allows retrieval (`get`) and registration (`set`) of functions that transform
 * values in Echo's dataflow arcs. Each registered function can be referenced
 * by name in declarative protocols like: `source/event:type/sink|add=1|len`.
 *
 * @example
 * spark.get("len")("abc") // 3
 * spark.set("double", x => x * 2)
 */
const spark = {
  /**
   * Retrieves a registered function by name.
   *
   * @param {string} name - Name of the spark.
   * @returns {Function} The corresponding function or a no-op function.
   *
   * @example
   * spark.get("len")("abc") // 3
   * spark.get("unknown")(42) // 42 (no-op)
   */
  get(name) {
    return registry[name] ?? ((x) => x);
  },

  /**
   * Registers a new spark function.
   *
   * @param {string} name - Name of the function.
   * @param {Function} fn - Function to be registered.
   * @returns {typeof spark} Returns the API itself for chaining.
   *
   * @example
   * spark.set("square", x => x * x)
   */
  set(name, fn) {
    registry[name] = fn;
    return spark;
  },
};

export default spark;
