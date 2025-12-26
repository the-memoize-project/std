# @hive/std/event

> Dynamic event listener decorator with automatic lifecycle management

## Overview

The **event** package provides a powerful decorator for handling DOM events within Shadow DOM with automatic lifecycle management. Using Proxy-based dynamic property access, you can listen to any event without memory leaks.

## Purpose

Instead of manually adding and removing event listeners, the `@event` decorator:

- Automatically manages listener lifecycle
- Uses event delegation for performance
- Works with any DOM event (native or custom)
- Integrates seamlessly with Spark filters
- Prevents memory leaks with automatic cleanup

## Installation

```bash
npm install @hive/std
```

## Quick Start

```javascript
import { event } from "@hive/std/event";
import { define } from "@hive/std/directive";
import { paint, html } from "@hive/std/dom";

@define("click-counter")
@paint(template)
class ClickCounter extends HTMLElement {
  #count = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.click("button")
  handleClick() {
    this.#count++;
    console.log("Clicked:", this.#count);
  }
}

function template() {
  return html`<button>Click me!</button>`;
}
```

**Usage:**
```html
<click-counter></click-counter>
```

---

## Dynamic Event Syntax

The magic of `@event` is its dynamic nature. You can listen to **any event**:

```javascript
@event.eventName(selector, ...filters)
```

| Part | Description |
|------|-------------|
| **eventName** | Any DOM event: `click`, `input`, `customEvent`, etc. |
| **selector** | CSS selector for target element(s) |
| **filters** | Optional Spark functions to transform event data |

---

## Detailed Examples

### Example 1: Basic Click Handler

```javascript
import { event } from "@hive/std/event";
import { define } from "@hive/std/directive";
import { paint, html } from "@hive/std/dom";

@define("my-button")
@paint(() => html`<button>Click me</button>`)
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.click("button")
  handleClick(evt) {
    evt.target.textContent = "Clicked!";
    console.log("Button was clicked");
  }
}
```

---

### Example 2: Form Input Handling

```javascript
import { event } from "@hive/std/event";
import { define } from "@hive/std/directive";
import { paint, html } from "@hive/std/dom";

@define("input-form")
@paint(() => html`
  <div>
    <input type="text" placeholder="Type something">
    <p id="output"></p>
  </div>
`)
class InputForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.input("input")
  handleInput(evt) {
    const value = evt.target.value;
    this.shadowRoot.querySelector("#output").textContent = `You typed: ${value}`;
  }
}
```

---

### Example 3: Multiple Buttons

```javascript
@define("action-panel")
@paint(() => html`
  <div>
    <button class="save">Save</button>
    <button class="cancel">Cancel</button>
    <button class="delete">Delete</button>
  </div>
`)
class ActionPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.click("button.save")
  handleSave(evt) {
    console.log("Saving...");
  }

  @event.click("button.cancel")
  handleCancel(evt) {
    console.log("Cancelling...");
  }

  @event.click("button.delete")
  handleDelete(evt) {
    console.log("Deleting...");
  }
}
```

---

### Example 4: Custom Events

```javascript
// Child component that dispatches custom event
@define("list-item")
@paint(() => html`<slot></slot>`)
class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("item-selected", {
        bubbles: true,
        composed: true,
        detail: { id: this.id, text: this.textContent }
      }));
    });
  }
}

// Parent component that listens
@define("my-list")
@paint(() => html`
  <list-item id="item-1">Apple</list-item>
  <list-item id="item-2">Banana</list-item>
  <list-item id="item-3">Cherry</list-item>
`)
class MyList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.itemSelected("list-item")
  handleSelection(evt) {
    const { id, text } = evt.detail;
    console.log(`Selected: ${text} (ID: ${id})`);
  }
}
```

---

## Using with Spark Filters

Combine `@event` with Spark for powerful data transformations:

```javascript
import { event } from "@hive/std/event";
import { prop, truthy, inc } from "@hive/std/spark";

class MyComponent extends HTMLElement {
  // Extract nested property from event
  @event.input("input", prop("target.value"))
  handleInput(value) {
    console.log("Input value:", value);
  }

  // Chain multiple transformations
  @event.click("button", prop("detail.count"), inc, truthy)
  handleClick(isValid) {
    console.log("Valid click:", isValid);
  }
}
```

**Common patterns:**

```javascript
// Get input value
@event.input("input", prop("target.value"))
setValue(value) { ... }

// Check if checked
@event.change("input[type='checkbox']", prop("target.checked"))
toggleOption(checked) { ... }

// Extract nested data
@event.customEvent("*", prop("detail.data.user.name"))
updateUser(name) { ... }

// Validate length
@event.input("input", prop("target.value"), len, gt(5))
validateInput(isValid) { ... }
```

---

## Built-in Event Sparks

The event package provides built-in spark functions for common event handling patterns:

### stop

Stops event propagation by calling `event.stopPropagation()`.

```javascript
import event, { stop } from "@hive/std/event";

class MyElement extends HTMLElement {
  @event.click("button", stop)
  handleClick(event) {
    // Event won't bubble to parent elements
    console.log("Button clicked");
  }
}
```

### prevent

Prevents the default action by calling `event.preventDefault()`.

```javascript
import event, { prevent } from "@hive/std/event";

class MyForm extends HTMLElement {
  @event.submit("form", prevent)
  handleSubmit(event) {
    // Form won't submit normally
    console.log("Custom form handling");
  }
}
```

### value

Extracts `event.target.value` from the event.

```javascript
import event, { value } from "@hive/std/event";

class MyInput extends HTMLElement {
  @event.input("input", value)
  handleInput(inputValue) {
    // Receives the value directly, not the event
    console.log("Input value:", inputValue);
  }
}
```

### detail

Extracts `event.detail` from CustomEvents.

```javascript
import event, { detail } from "@hive/std/event";

class MyElement extends HTMLElement {
  @event("user-selected", detail)
  handleUserSelected(userData) {
    // Receives the detail payload directly
    console.log("User data:", userData);
  }
}
```

### formData

Converts FormData to a plain object.

```javascript
import event, { formData, prevent } from "@hive/std/event";

class MyForm extends HTMLElement {
  @event.submit("form", prevent, formData)
  handleSubmit(data) {
    // Receives form data as a plain object
    console.log("Form data:", data);
    // { username: "john", email: "john@example.com" }
  }
}
```

### Chaining Event Sparks

Event sparks can be chained together for powerful combinations:

```javascript
import event, { prevent, stop, formData } from "@hive/std/event";

class MyForm extends HTMLElement {
  @event.submit("form", prevent, stop, formData)
  handleSubmit(data) {
    // 1. Prevents default form submission
    // 2. Stops event propagation
    // 3. Extracts form data as an object
    console.log("Clean form data:", data);
  }
}
```

**Common combinations:**

```javascript
// Form submission with data extraction
@event.submit("form", prevent, formData)

// Input with value extraction
@event.input("input", value)

// Custom event with detail extraction
@event("custom-event", detail)

// Click handler that doesn't bubble
@event.click("button", stop, prevent)
```

---

## API Reference

### @event.eventName(selector, ...filters)

Dynamic decorator for listening to DOM events.

**Parameters:**
- `selector` (string) - CSS selector for target elements
- `filters` (...Function) - Optional Spark transformation functions

**Returns:** Method decorator

**Behavior:**
- Adds event listener on component connection
- Removes event listener on component disconnection
- Uses event delegation within Shadow DOM
- Applies filters before calling decorated method

---

## Event Delegation

The decorator uses event delegation for performance:

```javascript
// Instead of:
element.addEventListener("click", handler); // Per element

// It uses:
shadowRoot.addEventListener("click", (e) => {
  if (e.target.matches(selector)) {
    handler(e);
  }
}); // Single listener
```

**Benefits:**
- Single listener handles multiple elements
- Works with dynamically added elements
- Better memory efficiency
- Automatic cleanup

---

## Automatic Lifecycle Management

The decorator uses `AbortController` for clean listener removal:

```javascript
// Internally managed - no manual cleanup needed
const controller = new AbortController();

shadowRoot.addEventListener(eventName, handler, {
  signal: controller.signal
});

// On disconnect:
controller.abort(); // Automatically removes listener
```

**You don't need to:**
- Remove listeners manually
- Track listener references
- Worry about memory leaks

---

## Best Practices

### 1. Use Specific Selectors

```javascript
// Good - Specific selector
@event.click("button.submit")
handleSubmit() { ... }

// Bad - Too broad
@event.click("*")
handleAnyClick() { ... }
```

### 2. Keep Handlers Small

```javascript
// Good - Delegates to other methods
@event.click("button")
handleClick() {
  this.validateInput();
  this.submitForm();
}

// Bad - Too much logic in handler
@event.click("button")
handleClick() {
  // 50 lines of code...
}
```

### 3. Use Filters for Common Patterns

```javascript
// Good - Extract once with filter
@event.input("input", prop("target.value"))
handleInput(value) {
  this.value = value;
}

// Bad - Extract in every handler
@event.input("input")
handleInput(evt) {
  this.value = evt.target.value;
}
```

### 4. Name Handlers Descriptively

```javascript
// Good - Clear intent
@event.click("button.save")
handleSaveClick() { ... }

// Bad - Vague
@event.click("button")
onClick() { ... }
```

---

## Supported Events

The `@event` decorator works with **any DOM event**:

### Standard Events

- **Mouse**: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`
- **Keyboard**: `keydown`, `keyup`, `keypress`
- **Form**: `input`, `change`, `submit`, `reset`, `focus`, `blur`
- **Touch**: `touchstart`, `touchmove`, `touchend`, `touchcancel`
- **Drag**: `drag`, `dragstart`, `dragend`, `dragover`, `drop`
- **Media**: `play`, `pause`, `ended`, `timeupdate`
- **Other**: `scroll`, `resize`, `load`, `error`

### Custom Events

Any custom event you create:

```javascript
@event.myCustomEvent("*")
handleCustom(evt) {
  console.log(evt.detail);
}
```

---

## Performance Considerations

The `@event` decorator is optimized for performance:

1. **Event Delegation** - Single listener per event type
2. **Lazy Attachment** - Listeners added only on connection
3. **Automatic Cleanup** - No memory leaks
4. **Efficient Matching** - Uses native `matches()` API

---

## Related Packages

- **[@hive/std/echo](../echo)** - Message bus for component communication
- **[@hive/std/spark](../spark)** - Data transformation functions
- **[@hive/std/directive](../directive)** - Lifecycle decorators

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
