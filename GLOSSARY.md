# Glossary

> **Complete reference of concepts, patterns, and terminology used throughout @hive/std**

## Core Concepts

### Component
A Custom Element (Web Component) that encapsulates structure, style, and behavior. In Hive, components are built declaratively using decorators.

### Decorator
A design pattern that wraps class methods or properties to add behavior. Hive uses decorators extensively to provide lifecycle hooks, rendering, and reactive updates without boilerplate.

### Reactive
A programming paradigm where changes in state automatically trigger UI updates. Hive achieves reactivity through decorators like `@repaint` and `@retouch`.

### Dataflow
The directed flow of data between components through events. Hive's Echo mixin enables declarative dataflow using the `on` attribute.

### Spark
A pure transformation function used in dataflow pipelines. Sparks modify data as it flows from source to destination (e.g., `add`, `inc`, `prop`).

---

## Package Overview

### @hive/std/directive
Decorators for Custom Element lifecycle and attributes. Provides the foundation for defining and managing components.

**Key Concepts:**
- Component registration (`@define`)
- Lifecycle hooks (`@connected`, `@disconnected`, `@adopted`)
- Attribute observation (`@attributeChanged`)
- Form integration (`@formAssociated`, `@formReset`, `@formDisabled`, `@formStateRestore`)

### @hive/std/dom
Rendering and styling decorators that manage component presentation.

**Key Concepts:**
- Initial rendering (`@paint`)
- Reactive re-rendering (`@repaint`)
- Style-only updates (`@retouch`)
- Render lifecycle (`@willPaint`, `@didPaint`)
- Template helpers (`html`, `css`)

### @hive/std/echo
Mixin that enables declarative dataflow between components via the `on` attribute.

**Key Concepts:**
- Event bus architecture
- Declarative event binding
- Pipeline transformations using sparks
- Component communication without direct references

### @hive/std/spark
Collection of pure transformation functions for data pipelines.

**Key Concepts:**
- Mathematical operations (`add`, `subtract`, `inc`, `dec`)
- Comparisons (`equals`, `different`, `gt`, `gte`, `lt`, `lte`)
- Logic operations (`not`, `truthy`, `always`)
- Data access (`prop`, `len`)

### @hive/std/event
Decorator for DOM event handling within Shadow DOM.

**Key Concepts:**
- Dynamic event binding (`@event.click`, `@event.keydown`)
- Event delegation
- Filter pipelines using sparks
- Automatic cleanup

---

## Architectural Patterns

### Declarative Component Definition

```javascript
import { define } from '@hive/std/directive';
import { paint, repaint, html, css } from '@hive/std/dom';

@define('my-counter')
@paint(counterHtml, counterCss)
class MyCounter extends HTMLElement {
  @repaint
  set count(value) {
    this._count = value;
  }
}
```

**Pattern:** Decorators eliminate boilerplate by handling registration, rendering, and reactivity declaratively.

### Reactive State Management

```javascript
@repaint  // Full re-render (HTML + CSS)
set data(value) { ... }

@retouch  // Style-only update (performance optimized)
set color(value) { ... }
```

**Pattern:** Choose the appropriate decorator based on what needs to update.

### Dataflow Architecture

```html
<source-component></source-component>
<sink-component on="*/event-name:setter/property|spark1|spark2"></sink-component>
```

**Pattern:** Components communicate through events, transformed by sparks, without direct coupling.

### Form-Associated Components

```javascript
@define('custom-input')
class CustomInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    this.internals = this.attachInternals();
  }

  @formReset
  handleReset() { ... }
}
```

**Pattern:** Native form integration with validation, submission, and state restoration.

---

## Terminology

### adoptedStyleSheets
Modern browser API for sharing stylesheets across Shadow DOM instances. More performant than `<style>` tags.

### Custom Element
Native browser API for creating reusable HTML elements with encapsulated logic.

### ElementInternals
Browser API that connects Custom Elements to forms, enabling native form behaviors.

### Factory Decorator
A decorator that accepts parameters: `@decoratorName(param1, param2)`. Returns the actual decorator function.

### Form-Associated Custom Element
A Custom Element that participates in form submission, validation, and state management.

### Mixin
A class that extends another class to add functionality. Echo is a mixin that adds dataflow capabilities.

### observedAttributes
Static array that tells the browser which attributes to monitor for changes.

### Shadow DOM
Encapsulation mechanism that isolates component styles and DOM from the rest of the page.

### Tagged Template Literal
JavaScript syntax: `` tag`string ${expression}` ``. Used by `html` and `css` helpers.

---

## Decision Trees

### When to Use Which Rendering Decorator?

```
Need to render component initially?
├─ YES → Use @paint
└─ NO → Already using @paint?
    ├─ YES → Need to update on state change?
    │   ├─ Change affects HTML structure? → Use @repaint
    │   └─ Change affects only styles? → Use @retouch
    └─ NO → Start with @paint first
```

### When to Use Which Lifecycle Hook?

```
What do you need to do?
├─ Initialize component → @connected
├─ Clean up resources → @disconnected
├─ React to attribute change → @attributeChanged
├─ Handle document adoption → @adopted
├─ React to form events → @formReset, @formDisabled, @formStateRestore
├─ Get form reference → @formAssociated
├─ Prepare before render → @willPaint
└─ Execute after render → @didPaint
```

### When to Use Which Spark?

```
What transformation do you need?
├─ Math operations → add, subtract, inc, dec
├─ Comparisons → equals, different, gt, gte, lt, lte
├─ Boolean logic → not, truthy, always
├─ Data access → prop (nested properties), len (length)
└─ Custom logic → Create your own spark function
```

---

## Performance Guidelines

### Rendering Performance

1. **Use @retouch for style-only changes** - Avoids DOM manipulation
2. **Batch state updates** - Multiple state changes trigger only one re-render
3. **Use adoptedStyleSheets** - Styles are shared across instances
4. **Leverage Shadow DOM** - Scoped styles are more performant

### Dataflow Performance

1. **Keep spark functions pure** - No side effects, easy to optimize
2. **Use specific event sources** - `#id/event` instead of `*/event`
3. **Minimize spark chains** - Each spark adds processing overhead
4. **Consider event delegation** - `@event` uses delegation automatically

### Memory Management

1. **Clean up in @disconnected** - Remove intervals, listeners, etc.
2. **Use AbortController** - For cancellable async operations
3. **Avoid circular references** - Between components and DOM
4. **Weak references for caches** - Use WeakMap/WeakSet when appropriate

---

## Common Patterns

### Counter Component
```javascript
@define('counter-button')
@paint(html`<button>Count: ${el => el.count}</button>`)
class CounterButton extends HTMLElement {
  private _count = 0;

  @repaint
  set count(value) { this._count = value; }

  @event.click('button')
  increment() { this.count++; }
}
```

### Form Input Component
```javascript
@define('custom-input')
class CustomInput extends HTMLElement {
  static formAssociated = true;

  @formReset
  handleReset() { /* restore default */ }

  @formDisabled
  handleDisabled(disabled) { /* update UI */ }
}
```

### Dataflow Component
```javascript
@define('data-display')
class DataDisplay extends Echo(HTMLElement) {
  @attributeChanged('value', Number)
  @repaint
  set value(v) { this._value = v; }
}

// HTML: <data-display on="*/value-changed:setter/value|inc"></data-display>
```

---

## Anti-Patterns

### ❌ Don't: Manual connectedCallback
```javascript
connectedCallback() {
  this.shadowRoot = this.attachShadow({ mode: 'open' });
  this.shadowRoot.innerHTML = '<div>Content</div>';
}
```

### ✅ Do: Use @paint
```javascript
@paint(html`<div>Content</div>`)
class MyComponent extends HTMLElement {}
```

### ❌ Don't: Imperative event listening
```javascript
connectedCallback() {
  this.button = this.shadowRoot.querySelector('button');
  this.button.addEventListener('click', this.handleClick);
}
```

### ✅ Do: Use @event decorator
```javascript
@event.click('button')
handleClick() { /* ... */ }
```

### ❌ Don't: Manual state updates
```javascript
set value(v) {
  this._value = v;
  this.render(); // Manual trigger
}
```

### ✅ Do: Use @repaint
```javascript
@repaint
set value(v) { this._value = v; }
```

---

## API Reference Quick Links

- [Complete API Reference](./API.md)
- [Architecture Deep Dive](./ARCHITECTURE.md)
- [Examples & Tutorials](./EXAMPLES.md)
- [Package Index](./packages/README.md)
