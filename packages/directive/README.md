# @hive/std/directive

> Lifecycle and attribute decorators for Web Components

## Overview

The **directive** package provides a collection of decorators that simplify Web Component development by making interactions with the Custom Elements lifecycle and platform APIs more declarative and less verbose.

## Purpose

Instead of manually implementing lifecycle callbacks like `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback`, you can use elegant decorators directly on your methods, keeping your class code clean and focused on business logic.

## Installation

```bash
npm install @hive/std
```

## Available Decorators

### Component Lifecycle

| Decorator | Purpose | Maps to |
|-----------|---------|---------|
| `@define` | Register custom element | `customElements.define()` |
| `@connected` | Execute when element connects to DOM | `connectedCallback` |
| `@disconnected` | Execute when element disconnects from DOM | `disconnectedCallback` |
| `@adopted` | Execute when element moves to new document | `adoptedCallback` |
| `@attributeChanged` | Execute when observed attribute changes | `attributeChangedCallback` |

### Form Association

These decorators simplify working with form-associated custom elements:

| Decorator | Purpose | Maps to |
|-----------|---------|---------|
| `@formAssociated` | Execute when element associates with form | `formAssociatedCallback` |
| `@formDisabled` | Execute when disabled state changes | `formDisabledCallback` |
| `@formReset` | Execute when form resets | `formResetCallback` |
| `@formStateRestore` | Execute when form state restores | `formStateRestoreCallback` |

## Quick Start

```javascript
import { define, connected, attributeChanged } from "@hive/std/directive";

@define("my-component")
class MyComponent extends HTMLElement {
  @connected
  initialize() {
    console.log("Component connected!");
  }

  @attributeChanged("visible", Boolean)
  set visible(newValue) {
    console.log(`Visibility changed to: ${newValue}`);
    this.style.display = newValue ? "block" : "none";
  }
}
```

## Detailed Examples

### @define - Register Custom Element

```javascript
import { define } from "@hive/std/directive";

@define("hello-world")
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "<h1>Hello, World!</h1>";
  }
}
```

**Usage:**
```html
<hello-world></hello-world>
```

---

### @connected - Component Initialization

```javascript
import { define, connected } from "@hive/std/directive";

@define("data-fetcher")
class DataFetcher extends HTMLElement {
  @connected
  async fetchData() {
    const response = await fetch("/api/data");
    const data = await response.json();
    this.render(data);
  }

  render(data) {
    this.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}
```

---

### @disconnected - Cleanup

```javascript
import { define, connected, disconnected } from "@hive/std/directive";

@define("timer-component")
class TimerComponent extends HTMLElement {
  #intervalId = null;

  @connected
  startTimer() {
    this.#intervalId = setInterval(() => {
      this.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
  }

  @disconnected
  stopTimer() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      console.log("Timer stopped and cleaned up");
    }
  }
}
```

---

### @attributeChanged - Reactive Attributes

```javascript
import { define, attributeChanged } from "@hive/std/directive";

@define("color-box")
class ColorBox extends HTMLElement {
  @attributeChanged("color")
  set color(newColor) {
    this.style.backgroundColor = newColor;
  }

  @attributeChanged("size", Number)
  set size(newSize) {
    this.style.width = `${newSize}px`;
    this.style.height = `${newSize}px`;
  }
}
```

**Usage:**
```html
<color-box color="blue" size="200"></color-box>
```

**Type Conversion:**

The second parameter to `@attributeChanged` specifies a type converter:

```javascript
@attributeChanged("count", Number)    // Converts to number
@attributeChanged("enabled", Boolean) // Converts to boolean
@attributeChanged("name", String)     // Converts to string (default)
```

---

### @formAssociated - Form Integration

```javascript
import { define, formAssociated, formReset } from "@hive/std/directive";

@define("custom-input")
class CustomInput extends HTMLElement {
  static formAssociated = true;

  #internals;
  #value = "";

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @formAssociated
  onFormAssociated(form) {
    console.log("Associated with form:", form);
  }

  @formReset
  onFormReset() {
    this.#value = "";
    this.#internals.setFormValue("");
    this.render();
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
    this.#internals.setFormValue(newValue);
  }
}
```

**Usage:**
```html
<form>
  <custom-input name="username"></custom-input>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

---

## API Reference

### @define(tagName: string)

Registers a custom element with the given tag name.

**Parameters:**
- `tagName` - Custom element tag name (must contain a hyphen)

**Returns:** Class decorator

**Throws:**
- `TypeError` if tagName is not a string
- `Error` if tagName doesn't contain a hyphen

---

### @connected

Executes the decorated method when the element connects to the DOM.

**Returns:** Method decorator

---

### @disconnected

Executes the decorated method when the element disconnects from the DOM.

**Returns:** Method decorator

---

### @adopted

Executes the decorated method when the element is adopted into a new document.

**Returns:** Method decorator

---

### @attributeChanged(attributeName: string, converter?: Function)

Executes the decorated method/setter when the specified attribute changes.

**Parameters:**
- `attributeName` - Name of the attribute to observe
- `converter` - Optional type converter (String, Number, Boolean, or custom function)

**Returns:** Method/setter decorator

---

### @formAssociated, @formDisabled, @formReset, @formStateRestore

These decorators wrap the corresponding form-associated element callbacks.

**Note:** Requires `static formAssociated = true` on the class.

---

## Best Practices

### 1. Always Use @define

```javascript
// Good
@define("my-component")
class MyComponent extends HTMLElement {}

// Bad - manual registration is error-prone
class MyComponent extends HTMLElement {}
customElements.define("my-component", MyComponent);
```

### 2. Combine with Other Packages

```javascript
import { define, connected, attributeChanged } from "@hive/std/directive";
import { paint, repaint } from "@hive/std/dom";

@define("reactive-component")
@paint(template, styles)
class ReactiveComponent extends HTMLElement {
  @connected
  initialize() {
    // Setup code
  }

  @attributeChanged("value")
  @repaint
  set value(newValue) {
    // Triggers re-render
  }
}
```

### 3. Use Type Converters

```javascript
@attributeChanged("count", Number)
set count(value) {
  // value is already a number
}

@attributeChanged("enabled", Boolean)
set enabled(value) {
  // value is already a boolean
}
```

### 4. Clean Up Resources

```javascript
@connected
setup() {
  this.#timer = setInterval(() => {}, 1000);
}

@disconnected
cleanup() {
  clearInterval(this.#timer);
}
```

---

## Related Packages

- **[@hive/std/dom](../dom)** - Rendering and styling decorators
- **[@hive/std/event](../event)** - Event listener decorators
- **[@hive/std/echo](../echo)** - Message bus for component communication

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
