# Hive Architecture

This document describes the architecture, design decisions, and internal workings of the Hive Standard Library.

## Table of Contents

- [Philosophy](#philosophy)
- [Core Concepts](#core-concepts)
- [Architecture Overview](#architecture-overview)
- [Package Design](#package-design)
- [Data Flow](#data-flow)
- [Performance Considerations](#performance-considerations)
- [Design Patterns](#design-patterns)
- [Future Roadmap](#future-roadmap)

---

## Philosophy

### The Beehive Analogy

Hive is named after the natural system where simple, autonomous cells (bees) work together through communication (pheromones) to create complex emergent behavior and sophisticated structures (hive). Similarly:

- **Cells (Components)** - Independent Web Components with clear responsibilities
- **Communication (Message Bus)** - Components communicate through events, not direct references
- **Emergence (Application)** - Complex applications emerge from simple component interactions
- **Autonomy** - Each component is self-contained and can function independently

### Design Principles

1. **Declarative First** - Describe what, not how
2. **Composition Over Inheritance** - Build complex behavior by combining simple pieces
3. **Single Responsibility** - Each package does one thing well
4. **Standards-Based** - Built on Web Platform APIs
5. **Zero Dependencies** - No runtime dependencies on external libraries
6. **Progressive Enhancement** - Works without build tools, better with them

---

## Core Concepts

### Web Components as Foundation

Hive is built on the Web Components standards:

- **Custom Elements** - Define new HTML elements
- **Shadow DOM** - Encapsulate markup and styles
- **HTML Templates** - Reusable markup fragments

### Decorator Pattern

Decorators provide a clean API for extending functionality:

```javascript
@define("my-component")
@paint(template, styles)
class MyComponent extends HTMLElement {
  @attributeChanged("value")
  @repaint
  set value(newValue) { /* ... */ }

  @event.click("button")
  handleClick() { /* ... */ }
}
```

### Reactive Model

Components automatically respond to changes:

- **Attribute changes** trigger updates via `@attributeChanged`
- **Property setters** can trigger re-rendering with `@repaint`
- **Events** flow through the message bus with Echo

---

## Architecture Overview

### High-Level Structure

```
┌─────────────────────────────────────────┐
│          Application Layer              │
│  (User's Web Components & Apps)         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Hive Framework Layer            │
│  ┌──────────┐  ┌─────┐  ┌────────┐     │
│  │Directive │  │ DOM │  │  Echo  │     │
│  └──────────┘  └─────┘  └────────┘     │
│  ┌──────────┐  ┌─────┐  ┌────────┐     │
│  │  Event   │  │Spark│  │Polyfill│     │
│  └──────────┘  └─────┘  └────────┘     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Web Platform APIs                  │
│  Custom Elements, Shadow DOM, Events    │
└─────────────────────────────────────────┘
```

### Package Dependencies

```
┌─────────────────────────────────────────┐
│           User Application              │
└───────────────┬─────────────────────────┘
                │
     ┌──────────┴──────────┐
     │                     │
┌────▼──────┐      ┌───────▼────┐
│ Directive │      │    DOM     │
└───────────┘      └────────────┘
                          │
     ┌────────────────────┼────────────┐
     │                    │            │
┌────▼──────┐      ┌──────▼─┐   ┌─────▼────┐
│   Echo    │      │  Event │   │  Spark   │
└───────────┘      └────────┘   └──────────┘
     │                    │            │
     └────────────────────┴────────────┘
                    │
         ┌──────────▼──────────┐
         │  Web Platform APIs  │
         └─────────────────────┘
```

**Key Points:**
- All packages are independent
- No circular dependencies
- Tree-shakeable imports
- Minimal coupling

---

## Package Design

### 1. Directive Package

**Purpose:** Lifecycle management for Custom Elements

**Structure:**
```
packages/directive/
├── index.js                    # Re-exports all decorators
├── define/
│   ├── index.js               # @define decorator
│   └── index.spec.js
├── connected/
│   ├── index.js               # @connected decorator
│   └── index.spec.js
├── disconnected/
├── adopted/
├── attributeChanged/
└── form*/                     # Form-associated callbacks
```

**Key Concepts:**

**Lifecycle Wrapping:**
```javascript
export function connected(method) {
  return function decorator(target, propertyKey, descriptor) {
    const originalConnected = target.connectedCallback || function() {};

    target.connectedCallback = function() {
      originalConnected.call(this);
      method.call(this);
    };

    return descriptor;
  };
}
```

**Attribute Observation:**
```javascript
export function attributeChanged(attributeName, converter = String) {
  return function decorator(target, propertyKey, descriptor) {
    // Add to observedAttributes
    const observed = target.constructor.observedAttributes || [];
    if (!observed.includes(attributeName)) {
      target.constructor.observedAttributes = [...observed, attributeName];
    }

    // Wrap attributeChangedCallback
    const originalCallback = target.attributeChangedCallback || function() {};

    target.attributeChangedCallback = function(name, oldValue, newValue) {
      originalCallback.call(this, name, oldValue, newValue);

      if (name === attributeName && oldValue !== newValue) {
        const converted = converter(newValue);
        descriptor.set.call(this, converted);
      }
    };

    return descriptor;
  };
}
```

---

### 2. DOM Package

**Purpose:** Declarative rendering and styling

**Structure:**
```
packages/dom/
├── index.js
├── paint/          # Initial render
├── repaint/        # Full re-render
├── retouch/        # Style-only update
├── willPaint/      # Pre-render hook
├── didPaint/       # Post-render hook
├── html/           # HTML template tag
└── css/            # CSS stylesheet factory
```

**Rendering Pipeline:**

```
┌──────────────┐
│ Component    │
│ Connected    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ @willPaint   │ (optional hook)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ @paint       │ Render template & styles
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ @didPaint    │ (optional hook)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Component    │
│ Ready        │
└──────────────┘

  State Change
       │
       ▼
┌──────────────┐
│ @repaint     │ Full re-render
└──────────────┘
  or
┌──────────────┐
│ @retouch     │ Style update only
└──────────────┘
```

**Template System:**

```javascript
// html template tag
export function html(strings, ...values) {
  const template = strings.reduce((result, string, i) => {
    return result + string + (values[i] || "");
  }, "");

  return template;
}

// css stylesheet factory
export function css(strings, ...values) {
  const styleText = strings.reduce((result, string, i) => {
    return result + string + (values[i] || "");
  }, "");

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styleText);
  return sheet;
}
```

**Adopted Stylesheets:**

For performance, we use the Constructable Stylesheets API:

```javascript
// One-time parse
const styles = css`
  button { color: blue; }
`;

// Efficient sharing across instances
shadowRoot.adoptedStyleSheets = [styles];
```

---

### 3. Echo Package

**Purpose:** Message bus for component communication

**Structure:**
```
packages/echo/
├── index.js              # Mixin implementation
└── index.spec.js
```

**Architecture:**

Echo implements a global event bus using CustomEvent:

```
┌───────────────┐         ┌───────────────┐
│ Component A   │         │ Component B   │
│ (Publisher)   │         │ (Subscriber)  │
└───────┬───────┘         └───────▲───────┘
        │                         │
        │ dispatch                │ listen
        │                         │
        ▼                         │
    ┌───────────────────────────┐
    │     Global Event Bus      │
    │    (document.body)        │
    └───────────────────────────┘
```

**Declarative Syntax:**

```html
<button-component
  on="click:target/methodName|spark1|spark2">
</button-component>

Format: "sourceEvent:targetElement/targetMethod|filter1|filter2"
```

**Implementation:**

```javascript
export function Echo(Base = HTMLElement) {
  return class extends Base {
    connectedCallback() {
      super.connectedCallback?.();

      const onAttribute = this.getAttribute("on");
      if (onAttribute) {
        this.#setupEventFlow(onAttribute);
      }
    }

    #setupEventFlow(onAttribute) {
      const [source, sink] = onAttribute.split(":");
      const [eventName, rest] = source.split("/");
      const [targetSelector, method, ...filters] = rest?.split("/") || [];

      this.addEventListener(eventName, (event) => {
        let data = event.detail;

        // Apply spark filters
        for (const filter of filters) {
          data = applyFilter(filter, data);
        }

        // Dispatch to target
        const target = document.querySelector(targetSelector);
        target?.[method]?.(data);
      });
    }
  };
}
```

---

### 4. Spark Package

**Purpose:** Pure data transformation functions

**Structure:**
```
packages/spark/
├── index.js              # Re-exports all sparks
├── add/
├── subtract/
├── inc/
├── dec/
├── prop/                 # Property accessor
├── equals/
├── truthy/
├── len/
└── ... (20+ functions)
```

**Design:**

All spark functions are:
- **Pure** - No side effects
- **Composable** - Can be chained
- **Type-agnostic** - Work with any data type when appropriate

**Example Spark:**

```javascript
// packages/spark/inc/index.js
export function inc(value) {
  return Number(value) + 1;
}

// packages/spark/prop/index.js
export function prop(path) {
  return function(obj) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };
}
```

**Chaining:**

```html
<button on="click:counter/setValue|prop=detail.value|inc|truthy">
```

Pipeline: `event.detail.value → increment → check truthiness → call setValue`

---

### 5. Event Package

**Purpose:** Dynamic event listener decorator

**Structure:**
```
packages/event/
├── index.js              # Proxy-based decorator
└── index.spec.js
```

**Proxy Pattern:**

```javascript
export const event = new Proxy({}, {
  get(target, eventName) {
    return function(selector, ...filters) {
      return function decorator(target, propertyKey, descriptor) {
        const originalConnected = target.connectedCallback || function() {};

        target.connectedCallback = function() {
          originalConnected.call(this);

          const root = this.shadowRoot || this;

          root.addEventListener(eventName, (e) => {
            if (e.target.matches(selector)) {
              let data = e;

              // Apply spark filters
              for (const filter of filters) {
                data = filter(data);
              }

              descriptor.value.call(this, data);
            }
          });
        };

        return descriptor;
      };
    };
  }
});
```

**Usage:**

```javascript
@event.click("button")           // Any click event
@event.input("input", prop("target.value"))  // With filter
@event.customEvent("*")          // Custom events
```

---

### 7. Polyfill Package

**Purpose:** Browser API compatibility shims

**Structure:**
```
packages/polyfill/
├── index.js
└── setImmediate/        # setImmediate polyfill
    ├── index.js
    └── index.spec.js
```

**Design:**

Polyfills detect missing APIs and provide fallback implementations:

```javascript
// setImmediate polyfill
if (typeof globalThis.setImmediate !== "function") {
  Reflect.defineProperty(globalThis, "setImmediate", {
    value(fn, ...args) {
      return setTimeout(() => fn(...args), 0);
    },
    configurable: true,
    writable: true,
  });
}
```

**Usage:**

```javascript
// Import at app entry point
import "@hive/std/polyfill/setImmediate";

// Now available everywhere
setImmediate(() => {
  console.log("Runs asynchronously");
});
```

**Characteristics:**
- **Zero-cost**: Only loads when API is missing
- **Lightweight**: Minimal implementations
- **Automatic**: Just import and forget
- **Standards-compliant**: Follows spec behavior

**Future Polyfills:**
- `requestIdleCallback`
- `queueMicrotask`
- `AbortController` (for older browsers)
- `ResizeObserver`

---

## Data Flow

### Unidirectional Data Flow

```
User Action
   │
   ▼
DOM Event
   │
   ▼
Event Handler (@event or Echo)
   │
   ▼
State Change (property setter)
   │
   ▼
@repaint or @retouch
   │
   ▼
DOM Update
   │
   ▼
User sees change
```

### Echo Message Flow

```
┌─────────────┐
│  Component  │
│   Source    │
└──────┬──────┘
       │ 1. User action (click, input, etc.)
       ▼
┌──────────────┐
│   Echo "on"  │
│  Attribute   │
└──────┬───────┘
       │ 2. Parse attribute
       │ 3. Apply spark filters
       ▼
┌──────────────┐
│  Event Bus   │
│ (document)   │
└──────┬───────┘
       │ 4. Dispatch custom event
       ▼
┌──────────────┐
│  Component   │
│    Target    │
└──────┬───────┘
       │ 5. Invoke method
       │ 6. Update state
       ▼
┌──────────────┐
│  Re-render   │
│  (@repaint)  │
└──────────────┘
```

---

## Performance Considerations

### 1. Adopted Stylesheets

**Why:** Constructable stylesheets are parsed once and shared across instances.

**Impact:**
- ✅ Fast style application
- ✅ Low memory footprint
- ✅ No style re-parsing

### 2. Shadow DOM

**Why:** Provides style encapsulation and scoped DOM queries.

**Impact:**
- ✅ Fast CSS selector matching
- ✅ Isolated component styles
- ⚠️ Slightly higher memory per component

### 3. Event Delegation

**Why:** The `@event` decorator uses event delegation internally.

**Impact:**
- ✅ Single event listener per component
- ✅ Works with dynamically added elements
- ✅ Lower memory usage

### 4. Tree Shaking

**Why:** Each package and feature is independently importable.

**Impact:**
- ✅ Smaller bundle sizes
- ✅ Only pay for what you use
- ✅ Better compression

**Example:**

```javascript
// Only imports what you need
import { define } from "@hive/std/directive";
import { paint, html } from "@hive/std/dom";

// Bundle only includes: define, paint, html
// Everything else is tree-shaken away
```

### 5. Lazy Rendering

**Why:** `@paint` only renders once, `@repaint` only when state changes.

**Impact:**
- ✅ No unnecessary re-renders
- ✅ Predictable performance
- ⚠️ Manual control required

---

## Design Patterns

### 1. Decorator Pattern

Decorators extend functionality without modifying the original class.

### 2. Mixin Pattern

Echo uses a mixin to add functionality to any base class.

### 3. Proxy Pattern

The `@event` decorator uses a Proxy for dynamic property access.

### 4. Template Method Pattern

Rendering decorators (`@paint`, `@repaint`) define the template structure.

### 5. Observer Pattern

Attribute observation and event listening follow the observer pattern.

### 6. Builder Pattern

The `html` and `css` template tags use builder-like syntax.

---

## Future Roadmap

### Near Term (v0.19-0.20)

- [ ] Async rendering support
- [ ] Better TypeScript inference
- [ ] Performance monitoring decorators
- [ ] Dev tools integration

### Mid Term (v0.21-0.25)

- [ ] Server-side rendering (SSR)
- [ ] React/Vue adapters
- [ ] Component library (UI kit)
- [ ] CLI for scaffolding

### Long Term (v1.0+)

- [ ] Stable 1.0 API
- [ ] Official documentation site
- [ ] Video tutorials
- [ ] Enterprise support

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to the architecture and design of Hive.

---

## References

- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees)
- [Constructable Stylesheets](https://wicg.github.io/construct-stylesheets/)
- [JavaScript Decorators](https://github.com/tc39/proposal-decorators)

---

**Built with ❤️ by the Hive community** 🐝
