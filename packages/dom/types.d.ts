import type { css } from "./css/types.d.ts";
import type { didPaint } from "./didPaint/types.d.ts";
import type { html } from "./html/types.d.ts";
import type { paint } from "./paint/types.d.ts";
import type { repaint } from "./repaint/types.d.ts";
import type { retouch } from "./retouch/types.d.ts";
import type { willPaint } from "./willPaint/types.d.ts";

/**
 * @module @hive/std/dom
 *
 * @description
 * This module provides a set of decorators and helpers to simplify
 * rendering and DOM manipulation in Web Components. It facilitates
 * the creation of reactive components and connection with the browser's
 * paint cycle.
 */
declare module "@hive/std/dom" {
  export type { css, didPaint, html, paint, repaint, retouch, willPaint };
}
