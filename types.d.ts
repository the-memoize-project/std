/**
 * =================================================================
 * Type Declarations Entry Point - @hive/std
 * =================================================================
 *
 * This file is the main entry point for the TypeScript compiler.
 * It uses references to load type declarations for each module
 * (package) of the library, keeping the structure organized.
 *
 * To add types for a new module, create a declaration file for it
 * (e.g., `packages/my-new-package/types.d.ts`) and add a new
 * reference line here.
 */

/// <reference path="./packages/directive/types.d.ts" />
/// <reference path="./packages/dom/types.d.ts" />
/// <reference path="./packages/echo/types.d.ts" />
/// <reference path="./packages/event/types.d.ts" />
/// <reference path="./packages/spark/types.d.ts" />
