# @hive/std/echo

> Declarative event bus for component communication

## Overview

The **echo** package provides a message bus mixin that enables Web Components to communicate through a centralized event system. Components can publish and subscribe to events without direct references, creating a loosely coupled, reactive architecture.

## Purpose

Echo implements the **dataflow pillar** of Hive. Instead of prop drilling or maintaining direct component references, Echo establishes a global event bus where:

- **Producers** dispatch events to the bus
- **Consumers** subscribe declaratively via the `on` attribute
- **Data flows** through the system without tight coupling

## Installation

```bash
npm install @hive/std
```

## Quick Start

```javascript
import { Echo } from "@hive/std/echo";
import { define } from "@hive/std/directive";

// Producer component
@define("color-picker")
class ColorPicker extends Echo(HTMLElement) {
  connectedCallback() {
    this.innerHTML = `<input type="color">`;
    this.querySelector("input").addEventListener("input", (e) => {
      this.dispatchEvent(new CustomEvent("color-change", {
        detail: e.target.value
      }));
    });
  }
}

// Consumer component
@define("display-box")
class DisplayBox extends Echo(HTMLElement) {
  set backgroundColor(color) {
    this.style.backgroundColor = color;
  }
}
```

**Usage:**
```html
<color-picker id="picker"></color-picker>
<display-box on="#picker/color-change:setter/backgroundColor"></display-box>
```

---

## The `on` Attribute Syntax

The `on` attribute is the declarative way to connect components to the event bus:

```
on="source/event:type/sink|spark1|spark2=value"
```

### Parts Explained

| Part | Description | Example |
|------|-------------|---------|
| **source** | Event source selector | `#picker`, `color-picker`, `*` |
| **event** | Event name | `click`, `color-change`, `data-loaded` |
| **type** | How to apply data | `setter`, `method`, `attribute` |
| **sink** | Where to apply data | `backgroundColor`, `updateData`, `disabled` |
| **sparks** | Data transformations (optional) | `prop=detail\|inc\|truthy` |

### Source Selectors

- **ID**: `#my-id` - Listen to element with specific ID
- **Tag**: `my-tag` - Listen to all elements with that tag
- **Name**: `myName` - Listen to elements with that name
- **Wildcard**: `*` - Listen to all events

### Types

- **setter**: Calls a property setter
  ```html
  <component on="source/event:setter/propName"></component>
  ```

- **method**: Calls a method
  ```html
  <component on="source/event:method/methodName"></component>
  ```

- **attribute**: Sets an HTML attribute
  ```html
  <component on="source/event:attribute/attrName"></component>
  ```

---

## Detailed Examples

### Example 1: Color Picker and Display

Producer dispatches color changes:

```javascript
import { Echo } from "@hive/std/echo";
import { define } from "@hive/std/directive";

@define("hive-color-picker")
class ColorPicker extends Echo(HTMLElement) {
  connectedCallback() {
    this.innerHTML = `
      <label>Choose a color:</label>
      <input type="color" value="#3498db">
    `;

    this.querySelector("input").addEventListener("input", (e) => {
      this.dispatchEvent(new CustomEvent("color-selected", {
        detail: { color: e.target.value },
        bubbles: true,
        composed: true
      }));
    });
  }
}

@define("hive-color-display")
class ColorDisplay extends Echo(HTMLElement) {
  set backgroundColor(value) {
    this.style.backgroundColor = value;
  }

  connectedCallback() {
    this.style.width = "200px";
    this.style.height = "200px";
    this.style.border = "2px solid #333";
    this.style.borderRadius = "8px";
  }
}
```

**HTML:**
```html
<hive-color-picker id="picker"></hive-color-picker>
<hive-color-display
  on="#picker/color-selected:setter/backgroundColor|prop=detail.color">
</hive-color-display>
```

---

### Example 2: Counter with Multiple Displays

One source, multiple consumers:

```javascript
@define("counter-button")
class CounterButton extends Echo(HTMLElement) {
  #count = 0;

  connectedCallback() {
    this.innerHTML = `<button>Count: 0</button>`;
    this.querySelector("button").addEventListener("click", () => {
      this.#count++;
      this.querySelector("button").textContent = `Count: ${this.#count}`;

      this.dispatchEvent(new CustomEvent("count-changed", {
        detail: { count: this.#count }
      }));
    });
  }
}

@define("count-display")
class CountDisplay extends Echo(HTMLElement) {
  set count(value) {
    this.textContent = `Current count: ${value}`;
  }
}
```

**HTML:**
```html
<counter-button id="counter"></counter-button>

<!-- Multiple displays listening to the same event -->
<count-display on="#counter/count-changed:setter/count|prop=detail.count"></count-display>
<count-display on="#counter/count-changed:setter/count|prop=detail.count"></count-display>
```

---

### Example 3: Form Validation with Sparks

Using spark filters to transform data:

```javascript
import { prop, truthy, len, gt } from "@hive/std/spark";

@define("form-input")
class FormInput extends Echo(HTMLElement) {
  connectedCallback() {
    this.innerHTML = `<input type="text" placeholder="Enter name">`;
    this.querySelector("input").addEventListener("input", (e) => {
      this.dispatchEvent(new CustomEvent("value-changed", {
        detail: { value: e.target.value }
      }));
    });
  }
}

@define("submit-button")
class SubmitButton extends Echo(HTMLElement) {
  set disabled(value) {
    this.querySelector("button").disabled = value;
  }

  connectedCallback() {
    this.innerHTML = `<button>Submit</button>`;
  }
}
```

**HTML:**
```html
<form-input id="nameInput"></form-input>

<!-- Button is disabled when input length <= 3 -->
<submit-button
  on="#nameInput/value-changed:setter/disabled|prop=detail.value|len|gt=3|not">
</submit-button>
```

---

### Example 4: Broadcast to All (*)

Using wildcard to listen to any source:

```javascript
@define("logger-component")
class Logger extends Echo(HTMLElement) {
  #logs = [];

  log(data) {
    this.#logs.push(data);
    this.render();
  }

  render() {
    this.innerHTML = `
      <h3>Event Log:</h3>
      <ul>
        ${this.#logs.map(log => `<li>${JSON.stringify(log)}</li>`).join("")}
      </ul>
    `;
  }
}
```

**HTML:**
```html
<!-- Listen to 'data-event' from ANY source -->
<logger-component on="*/data-event:method/log"></logger-component>

<!-- These will all be logged -->
<some-component id="c1"></some-component>
<other-component id="c2"></other-component>
```

---

## Using with Spark Filters

Echo seamlessly integrates with Spark for data transformation:

```html
<!-- Extract nested property -->
<component on="source/event:setter/value|prop=detail.data.user.name"></component>

<!-- Transform before applying -->
<component on="source/event:setter/count|prop=detail.value|inc|truthy"></component>

<!-- Chain multiple transforms -->
<component on="source/event:setter/text|prop=detail.message|len|gt=10|not"></component>
```

Common patterns:

| Pattern | Description |
|---------|-------------|
| `prop=detail.value` | Extract nested property |
| `inc` | Increment number |
| `dec` | Decrement number |
| `truthy` | Convert to boolean |
| `not` | Negate boolean |
| `len` | Get length |
| `add=5` | Add value |
| `equals=test` | Check equality |

---

## API Reference

### Echo(Base)

Mixin that adds event bus capabilities to a class.

**Parameters:**
- `Base` - Base class to extend (default: `HTMLElement`)

**Returns:** Extended class with Echo capabilities

**Usage:**
```javascript
class MyComponent extends Echo(HTMLElement) {
  // Component now supports 'on' attribute
}
```

---

## Best Practices

### 1. Use Descriptive Event Names

```javascript
// Good - Clear intent
this.dispatchEvent(new CustomEvent("user-logged-in", {
  detail: { userId: 123 }
}));

// Bad - Vague
this.dispatchEvent(new CustomEvent("event1", {
  detail: data
}));
```

### 2. Always Include Detail Object

```javascript
// Good - Structured data
detail: { value: newValue, timestamp: Date.now() }

// Bad - Primitive value
detail: newValue
```

### 3. Use Bubbles and Composed for Global Events

```javascript
// Good - Event can cross shadow boundaries
this.dispatchEvent(new CustomEvent("state-changed", {
  detail: { state },
  bubbles: true,
  composed: true
}));
```

### 4. Namespace Your Events

```javascript
// Good - Namespaced
"user:logged-in", "cart:item-added", "theme:changed"

// Bad - Too generic
"change", "update", "event"
```

### 5. Document Event Contracts

```javascript
/**
 * Dispatches when color changes.
 *
 * @event color-changed
 * @type {CustomEvent}
 * @property {Object} detail - Event details
 * @property {string} detail.color - Hex color value
 * @property {number} detail.timestamp - Change timestamp
 */
```

---

## Architecture Pattern

Echo implements the **Event Bus** (also known as Message Bus or Pub/Sub) pattern:

```
┌─────────────┐         ┌─────────────┐
│  Producer   │         │  Consumer   │
│ Component   │         │ Component   │
└──────┬──────┘         └──────▲──────┘
       │                       │
       │ dispatch              │ listen
       │                       │
       ▼                       │
   ┌───────────────────────────┐
   │     Echo Event Bus        │
   │  (document-level events)  │
   └───────────────────────────┘
```

**Benefits:**
- Loose coupling between components
- Easy to add/remove components
- Clear data flow
- Testable in isolation

---

## Performance Considerations

Echo is designed for performance:

1. **Event Delegation** - Uses single document-level listener
2. **Lazy Initialization** - Only activates when `on` attribute is present
3. **Automatic Cleanup** - Removes listeners on component disconnect
4. **Efficient Matching** - Optimized selector matching

---

## Related Packages

- **[@hive/std/spark](../spark)** - Data transformation functions for pipelines
- **[@hive/std/directive](../directive)** - Lifecycle decorators
- **[@hive/std/event](../event)** - DOM event listener decorators

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
