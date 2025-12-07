# Decorator `@paint`

The `@paint` decorator is the main tool in the `@hive/std/dom` package. It orchestrates the initial rendering of a Web Component's structure (HTML) and styles (CSS) in a declarative way, executing the process as soon as the element is connected to the DOM.

## Installation and Import

This decorator is designed to work together with the `html` and `css` helpers, all available in the `@hive/std/dom` package.

```javascript
import { paint, html, css } from '@hive/std/dom';
```

## How to Use

`@paint` is a factory decorator that should be applied directly to your component class. It accepts a `component` function (for HTML) as the first argument, followed by one or more `styles` functions (for CSS).

### The Usage Recipe

1.  **Define the HTML**: Create a function that receives the element instance (`el`) and returns an HTML string, preferably using the `html` helper.
2.  **Define the Styles**: Create one or more functions that receive the element instance (`el`) and return a `CSSStyleSheet`, preferably using the `css` helper.
3.  **Apply the Decorator**: Add `@paint(componentHtml, componentStyle)` directly above your class declaration.

### Complete Usage Example

```javascript
import { define } from '@hive/std/directive';
import { paint, html, css } from '@hive/std/dom';

// 1. Function that defines the component's HTML structure.
//    It can access element properties, like 'el.title'.
const cardHtml = (el) => html`
  <h3>${el.title}</h3>
  <p><slot>Default card content.</slot></p>
`;

// 2. Function that defines the styles.
//    Can also be dynamic, reading element attributes.
const cardCss = (el) => css`
  :host {
    display: block;
    font-family: sans-serif;
    border: 1px solid ${el.getAttribute('borderColor') || 'lightgray'};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  }
  h3 {
    margin-top: 0;
    color: #333;
  }
`;

// 3. Application of the decorator on the component class.
@define('my-card')
@paint(cardHtml, cardCss)
class MyCard extends HTMLElement {
  title = 'Card Title';

  connectedCallback() {
    // @paint has already taken care of rendering at this point.
    // We can add additional logic here if needed.
  }
}
```

**In HTML:**

```html
<my-card borderColor="royalblue">
  This is the content that will be inserted by the slot.
</my-card>
```

## Description

The `@paint` decorator is an orchestrator that automates the initial rendering process of a Web Component. Internally, it attaches to the `connectedCallback` and performs the following actions:

1.  Ensures the component has a `shadowRoot` for encapsulation.
2.  Calls its `component` function to obtain the HTML string and inserts it into the `shadowRoot`.
3.  Calls each of its `styles` functions to obtain `CSSStyleSheet` instances.
4.  Applies the stylesheets to the `shadowRoot` through the `adoptedStyleSheets` API, ensuring performant rendering.
5.  Supports the complete rendering lifecycle, allowing the use of `@willPaint` decorators (for logic *before* rendering) and `@didPaint` (for logic *after* rendering).

---

## Related Concepts

### Core Dependencies

**Required for basic usage:**
- [`html`](../html/README.md) - Template helper for building HTML structures
- [`css`](../css/README.md) - Template helper for creating stylesheets
- [`@define`](../../directive/define/README.md) - Required to register the Custom Element

**Example:**
```javascript
import { define } from '@hive/std/directive';
import { paint, html, css } from '@hive/std/dom';

@define('my-component')  // ← Required first
@paint(html`...`, css`...`)  // ← Then paint
class MyComponent extends HTMLElement {}
```

### Works Well With

**Lifecycle hooks** - Execute logic before/after rendering:
- [`@willPaint`](../willPaint/README.md) - Runs *before* `@paint` renders (setup, add attributes)
- [`@didPaint`](../didPaint/README.md) - Runs *after* `@paint` renders (focus elements, measure DOM)
- [`@connected`](../../directive/connected/README.md) - Runs when element enters DOM (general initialization)

**State management** - Trigger re-renders when state changes:
- [`@repaint`](../repaint/README.md) - Full re-render (HTML + CSS) when state changes
- [`@retouch`](../retouch/README.md) - Style-only update (performance optimization)
- [`@attributeChanged`](../../directive/attributeChanged/README.md) - React to attribute changes

**Example - Complete component with lifecycle:**
```javascript
@define('user-card')
@paint(userCardHtml, userCardCss)
class UserCard extends HTMLElement {
  @willPaint
  prepare() {
    this.setAttribute('loading', 'true');  // Before render
  }

  @didPaint
  afterRender() {
    this.shadowRoot.querySelector('input').focus();  // After render
  }

  @attributeChanged('user-id', Number)
  @repaint  // Re-render when user-id changes
  set userId(id) {
    this._userId = id;
  }
}
```

### Common Patterns

**Pattern 1: Static content** (no re-rendering needed)
```javascript
@paint(html`<h1>Welcome</h1>`, css`:host { display: block; }`)
```

**Pattern 2: Reactive content** (re-renders on state changes)
```javascript
@paint(counterHtml, counterCss)
class Counter extends HTMLElement {
  @repaint  // Triggers re-render
  set count(v) { this._count = v; }
}
```

**Pattern 3: Multiple stylesheets**
```javascript
@paint(componentHtml, baseStyles, themeStyles, responsiveStyles)
```

### Part Of

- **Package:** [`@hive/std/dom`](../README.md)
- **Category:** Rendering & Styling
- **Related packages:** [`@hive/std/directive`](../../directive/README.md) (lifecycle)

### Decision Guide

**When to use `@paint`?**
- ✅ Every component that needs a visual representation
- ✅ Components with Shadow DOM encapsulation
- ✅ When you want declarative rendering without boilerplate

**When NOT to use `@paint`?**
- ❌ Components that only emit events (no UI)
- ❌ Components that manipulate external DOM (use Light DOM instead)
- ❌ When you need manual `innerHTML` control (edge cases only)

**`@paint` vs manual rendering:**
```javascript
// ❌ Manual (verbose, error-prone)
connectedCallback() {
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.innerHTML = '<div>Content</div>';
  const sheet = new CSSStyleSheet();
  sheet.replaceSync('div { color: red; }');
  this.shadowRoot.adoptedStyleSheets = [sheet];
}

// ✅ With @paint (declarative, clean)
@paint(html`<div>Content</div>`, css`div { color: red; }`)
class MyComponent extends HTMLElement {}
```

---

## Performance Considerations

**Rendering lifecycle:**
1. `connectedCallback` fires
2. `@willPaint` executes (sync)
3. `html` function generates HTML string
4. `css` function(s) generate CSSStyleSheet(s)
5. DOM updated + styles applied
6. `requestAnimationFrame` → `@didPaint` executes

**Optimization tips:**
- Use `@retouch` instead of `@repaint` for style-only changes (10x faster)
- Create CSS functions once, don't recreate on every render
- Use `adoptedStyleSheets` API (already handled by `@paint`) - shared across instances

---

## Learn More

- **Glossary:** [Rendering concepts](../../../GLOSSARY.md#rendering)
- **Examples:** [Complete Todo App](../../../EXAMPLES.md#1-todo-application)
- **Architecture:** [Rendering pipeline](../../../ARCHITECTURE.md#rendering-architecture)
- **API Reference:** [Complete DOM API](../../../API.md#dom-package)
