# @hive/std/dom

> Declarative rendering and styling for Web Components

## Overview

The **dom** package provides decorators and template helpers for managing the rendering lifecycle of Web Components in a declarative and efficient way.

## Purpose

Instead of manually manipulating the DOM, creating Shadow DOM, and managing styles, this package allows you to define your component's appearance and rendering behavior using decorators and helpers. The result is cleaner, more reactive, and easier to maintain code.

## Installation

```bash
npm install @hive/std
```

## Available Tools

### Rendering Decorators

| Decorator | Purpose | When to Use |
|-----------|---------|-------------|
| `@paint` | Initial render (HTML + CSS) | Component creation |
| `@repaint` | Full re-render (HTML + CSS) | State changes requiring full update |
| `@retouch` | Style-only update | Visual changes only (performance) |
| `@willPaint` | Pre-render hook | Setup before rendering |
| `@didPaint` | Post-render hook | Cleanup or DOM queries after rendering |

### Template Helpers

| Helper | Purpose | Returns |
|--------|---------|---------|
| `html` | Create HTML templates | String template |
| `css` | Create stylesheets | CSSStyleSheet instance |

## Quick Start

```javascript
import { define } from "@hive/std/directive";
import { paint, repaint, html, css } from "@hive/std/dom";

@define("my-component")
@paint(template, styles)
class MyComponent extends HTMLElement {
  #count = 0;

  get count() {
    return this.#count;
  }

  @repaint
  set count(value) {
    this.#count = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

function template(component) {
  return html`
    <div class="container">
      <h1>Count: ${component.count}</h1>
      <button>Increment</button>
    </div>
  `;
}

function styles(component) {
  return css`
    .container {
      padding: 2rem;
      text-align: center;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  `;
}
```

## Detailed Examples

### @paint - Initial Rendering

The `@paint` decorator renders your component when it connects to the DOM.

```javascript
import { define } from "@hive/std/directive";
import { paint, html, css } from "@hive/std/dom";

@define("greeting-card")
@paint(template, styles)
class GreetingCard extends HTMLElement {
  name = "World";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

function template(card) {
  return html`
    <div class="card">
      <h1>Hello, ${card.name}!</h1>
      <p>Welcome to Hive</p>
    </div>
  `;
}

function styles() {
  return css`
    .card {
      padding: 2rem;
      border-radius: 12px;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #667eea;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #4a5568;
      margin: 0;
    }
  `;
}
```

**Usage:**
```html
<greeting-card></greeting-card>
```

---

### @repaint - Reactive Updates

The `@repaint` decorator triggers a full re-render when a property changes.

```javascript
import { define, attributeChanged } from "@hive/std/directive";
import { paint, repaint, html, css } from "@hive/std/dom";

@define("counter-display")
@paint(template, styles)
class CounterDisplay extends HTMLElement {
  #count = 0;

  get count() {
    return this.#count;
  }

  @attributeChanged("count", Number)
  @repaint
  set count(value) {
    this.#count = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

function template(counter) {
  return html`
    <div class="counter">
      <button class="decrement">-</button>
      <span class="count">${counter.count}</span>
      <button class="increment">+</button>
    </div>
  `;
}

function styles() {
  return css`
    .counter {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: system-ui, sans-serif;
    }

    button {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
      border: 2px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
    }

    button:hover {
      background: #667eea;
      color: white;
    }

    .count {
      font-size: 2rem;
      font-weight: 600;
      color: #2d3748;
      min-width: 60px;
      text-align: center;
    }
  `;
}
```

---

### @retouch - Style-Only Updates

The `@retouch` decorator only updates styles, which is more performant than full re-renders.

```javascript
import { define, attributeChanged } from "@hive/std/directive";
import { paint, retouch, html, css } from "@hive/std/dom";

@define("theme-box")
@paint(template, styles)
class ThemeBox extends HTMLElement {
  #theme = "light";

  get theme() {
    return this.#theme;
  }

  @attributeChanged("theme")
  @retouch
  set theme(value) {
    this.#theme = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}

function template() {
  return html`
    <div class="box">
      <h2>Theme Box</h2>
      <p>Watch the colors change!</p>
    </div>
  `;
}

function styles(box) {
  const isDark = box.theme === "dark";

  return css`
    .box {
      padding: 2rem;
      background: ${isDark ? "#2d3748" : "#ffffff"};
      color: ${isDark ? "#ffffff" : "#2d3748"};
      border-radius: 12px;
      transition: all 0.3s;
    }

    h2 {
      margin: 0 0 0.5rem 0;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `;
}
```

**Usage:**
```html
<theme-box theme="light"></theme-box>
<theme-box theme="dark"></theme-box>
```

---

### @willPaint and @didPaint - Lifecycle Hooks

```javascript
import { define, connected } from "@hive/std/directive";
import { paint, willPaint, didPaint, html, css } from "@hive/std/dom";

@define("lifecycle-component")
@paint(template, styles)
class LifecycleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @willPaint
  beforeRender() {
    console.log("About to render...");
    // Prepare data, fetch resources, etc.
  }

  @didPaint
  afterRender() {
    console.log("Rendering complete!");
    // Query DOM, add event listeners, etc.
    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", () => {
      console.log("Button clicked!");
    });
  }
}

function template() {
  return html`
    <div>
      <p>Component with lifecycle hooks</p>
      <button>Click me</button>
    </div>
  `;
}

function styles() {
  return css`
    div {
      padding: 1rem;
    }
  `;
}
```

---

## Template Helpers

### html - HTML Template Tag

Creates HTML templates with interpolation:

```javascript
const name = "World";
const template = html`
  <div>
    <h1>Hello, ${name}!</h1>
    <p>Current time: ${new Date().toLocaleTimeString()}</p>
  </div>
`;
```

**Features:**
- Simple string interpolation
- Dynamic content
- Clean syntax

---

### css - CSS Template Tag

Creates CSSStyleSheet instances for use with adopted stylesheets:

```javascript
const primaryColor = "#667eea";

const styles = css`
  .button {
    background: ${primaryColor};
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
  }
`;

// Applied via adoptedStyleSheets for performance
shadowRoot.adoptedStyleSheets = [styles];
```

**Benefits:**
- Parse styles once, share across instances
- Better performance than inline styles
- Modern browser API (Constructable Stylesheets)

---

## Performance Considerations

### When to Use Each Decorator

| Use Case | Decorator | Reason |
|----------|-----------|--------|
| Initial render | `@paint` | Sets up HTML and CSS once |
| Full state change | `@repaint` | Content and styles need update |
| Theme/style change only | `@retouch` | Faster than full re-render |
| Before rendering | `@willPaint` | Prepare data or resources |
| After rendering | `@didPaint` | DOM queries or event setup |

### Optimization Tips

1. **Use @retouch for visual changes:**
   ```javascript
   // Good - Only updates styles
   @retouch
   set theme(value) { ... }

   // Less efficient - Re-renders everything
   @repaint
   set theme(value) { ... }
   ```

2. **Leverage adopted stylesheets:**
   ```javascript
   // Good - Parsed once, shared across instances
   const styles = css`...`;

   // Less efficient - Parsed for each instance
   const styles = () => `<style>...</style>`;
   ```

3. **Minimize re-renders:**
   ```javascript
   // Good - Batched updates
   @repaint
   set data(value) {
    this.#data = value;
   }

   // Bad - Multiple re-renders
   setData(key, value) {
     this.data[key] = value;
     this.repaint(); // Avoid manual repaint
   }
   ```

---

## API Reference

### @paint(templateFn, stylesFn)

Renders the component on connection.

**Parameters:**
- `templateFn(component)` - Function returning HTML template
- `stylesFn(component)` - Function returning CSSStyleSheet

**Returns:** Class decorator

---

### @repaint

Triggers full re-render (HTML + CSS) when decorated property changes.

**Returns:** Method/setter decorator

---

### @retouch

Updates styles only when decorated property changes.

**Returns:** Method/setter decorator

---

### @willPaint

Executes before rendering.

**Returns:** Method decorator

---

### @didPaint

Executes after rendering.

**Returns:** Method decorator

---

### html`...`

Creates HTML template string.

**Parameters:** Template literal with interpolations

**Returns:** String

---

### css`...`

Creates CSSStyleSheet instance.

**Parameters:** Template literal with interpolations

**Returns:** CSSStyleSheet

---

## Best Practices

### 1. Always Use Shadow DOM

```javascript
// Good
constructor() {
  super();
  this.attachShadow({ mode: "open" });
}

// Bad - No style encapsulation
constructor() {
  super();
}
```

### 2. Separate Template and Logic

```javascript
// Good
@paint(template, styles)
class MyComponent extends HTMLElement {}

function template(component) { return html`...`; }
function styles(component) { return css`...`; }

// Bad - Mixed concerns
class MyComponent extends HTMLElement {
  render() {
    this.shadowRoot.innerHTML = `...`;
  }
}
```

### 3. Use @retouch for Performance

```javascript
// Good - Fast style updates
@retouch
set color(value) {
  this.#color = value;
}

// Less efficient for style-only changes
@repaint
set color(value) {
  this.#color = value;
}
```

---

## Related Packages

- **[@hive/std/directive](../directive)** - Lifecycle decorators
- **[@hive/std/event](../event)** - Event listener decorators
- **[@hive/std/echo](../echo)** - Message bus for component communication

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
