import type { adopted } from "./adopted/types.d.ts";
import type { attributeChanged } from "./attributeChanged/types.d.ts";
import type { connected } from "./connected/types.d.ts";
import type { define } from "./define/types.d.ts";
import type { disconnected } from "./disconnected/types.d.ts";
import type { formAssociated } from "./formAssociated/types.d.ts";
import type { formDisabled } from "./formDisabled/types.d.ts";
import type { formReset } from "./formReset/types.d.ts";
import type { formStateRestore } from "./formStateRestore/types.d.ts";

/**
 * @module @hive/std/directive
 *
 * @description
 * This module provides a collection of TypeScript decorators designed to
 * simplify interaction with the native lifecycle and APIs of
 * Web Components. With them, you can write more declarative,
 * clean code focused on your component's business logic.
 */
declare module "@hive/std/directive" {
  export type {
    adopted,
    attributeChanged,
    connected,
    define,
    disconnected,
    formAssociated,
    formDisabled,
    formReset,
    formStateRestore,
  };
}
