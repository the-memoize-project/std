# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview: @hive/std (formerly @nodusjs/std)

**Hive** is a framework that enables building complete web applications using native Web Components without writing imperative JavaScript. It follows the philosophy of a beehive: simple, autonomous components that communicate through a message bus to create emergent behavior and complex applications.

Key principles:
- **Declarative**: Components describe what they do, not how
- **Reactive**: Components automatically respond to state changes
- **Message-driven**: Components communicate through a central event bus (dataflow)
- **Composition over control**: Applications emerge from component collaboration

The project is in active development and APIs may change between minor versions.

## Architecture

### Five Core Packages

The library is organized as a monorepo with five independent packages under `packages/`:

1. **`directive/`** - Lifecycle and attribute decorators
   - Wraps Custom Element lifecycle callbacks (`connectedCallback`, `disconnectedCallback`, `adoptedCallback`, `attributeChangedCallback`)
   - Wraps form-associated element callbacks (`formAssociatedCallback`, `formDisabledCallback`, `formResetCallback`, `formStateRestoreCallback`)
   - Key decorators: `@define`, `@connected`, `@disconnected`, `@adopted`, `@attributeChanged`

2. **`dom/`** - Rendering and styling decorators
   - Manages component rendering lifecycle declaratively
   - Provides template tag helpers for HTML and CSS
   - Uses modern APIs like Shadow DOM and `adoptedStyleSheets`
   - Key decorators: `@paint` (initial render), `@repaint` (full re-render), `@retouch` (style-only re-render)
   - Key helpers: `html` (template tag), `css` (CSSStyleSheet factory)

3. **`echo/`** - Dataflow via event bus (mixin)
   - Implements the central message bus for component communication
   - Exports a mixin (not decorators) that adds the `on` attribute capability
   - Enables declarative component-to-component communication without direct references
   - Syntax: `on="source/event:type/sink|spark1|spark2"`

4. **`spark/`** - Data transformation functions
   - Pure, composable functions for data transformation pipelines
   - Used as filters in three contexts: `on` attribute (Echo), `@attributeChanged` decorator, `@event` decorator
   - Examples: `add`, `subtract`, `inc`, `dec`, `prop`, `equals`, `truthy`, `len`, etc.
   - Functions chain via `|` operator in attribute syntax

5. **`event/`** - DOM event listener decorator
   - Dynamic decorator with Proxy-based API: `@event.eventName(selector, ...filters)`
   - Handles any DOM event (native or custom) within Shadow DOM
   - Automatically manages listener lifecycle to prevent memory leaks
   - Uses event delegation for performance

### Build System

- **Bundler**: Vite
- **Entry points**: Each package has an `index.js` that re-exports submodules
- **Output**: Dual format (ESM + CommonJS) to `dist/` directory
- **Path aliases**: Configured in both `vite.config.js` and `vitest.config.js` (e.g., `@directive`, `@dom`, `@echo`)

### Testing

- **Framework**: Vitest with happy-dom for DOM simulation
- **Location**: Tests are co-located with source files as `*.spec.js`
- **Coverage**: 80% threshold for statements, branches, functions, and lines
- **Setup file**: `happydom.js` registers global DOM APIs

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (Vite dev server)
bun dev

# Build all packages for distribution
bun run build

# Run tests with coverage report
bun run test

# Run a single test file
bun run test path/to/file.spec.js

# Lint and format with Biome
biome check .

# Lint with auto-fix
biome check --write .
```

## Code Standards

- **Language**: JavaScript with JSDoc/TSDoc comments for types
- **Type declarations**: Each package has a `types.d.ts` file; main entry at root `types.d.ts` uses triple-slash references
- **Formatter**: Biome with space indentation
- **Style**: Double quotes, semicolons always (enforced by Biome)
- **Linting**: Biome with custom rules (see `biome.json`)
- **Commits**: Conventional Commits enforced via commitlint and husky

## Decorator Pattern

Most packages export **decorators** (functions that wrap class methods). Decorators in this codebase typically:
- Proxy or wrap lifecycle callbacks from Custom Element APIs
- Accept configuration parameters (e.g., attribute name, event name)
- Return a decorator function that modifies the class or method
- Maintain the original method logic while adding framework behavior

Example pattern:
```javascript
@define('my-component')
@paint(htmlFunction, cssFunction)
class MyComponent extends HTMLElement {
  @attributeChanged('value', Number)
  @repaint
  set value(newValue) {
    // Framework handles attribute observation and re-rendering
  }
}
```

## Important Patterns

### Echo Mixin Usage
Unlike decorators, `Echo` is applied as a mixin to the class being extended:
```javascript
class MyComponent extends Echo(HTMLElement) {
  // Now supports 'on' attribute for dataflow
}
```

### Spark Composition
Sparks chain in the `on` attribute syntax:
```html
<my-component on="source/event:setter/prop|prop=detail.value|inc"></my-component>
```
This extracts `detail.value` from the event, increments it, then calls the `prop` setter.

### Testing Custom Elements
Tests use happy-dom to simulate browser environment. Register components in tests before using them:
```javascript
customElements.define('my-component', MyComponent);
```

## Project History Note

This project was previously named **@nodusjs/std** and is being transitioned to **@hive/std** following the new Hive framework philosophy.
