# @hive/std/spark

> Pure transformation functions for reactive data pipelines

## Overview

The **spark** package provides a collection of pure, composable functions designed for data transformation. These lightweight functions act as building blocks for creating declarative data pipelines throughout your Hive applications.

## Purpose

Sparks enable powerful data transformations without imperative code:

- **Pure Functions** - No side effects, predictable output
- **Composable** - Chain multiple transformations together
- **Declarative** - Express transformations in HTML attributes
- **Type-Safe** - Convert and validate data types
- **Reusable** - Same functions work in multiple contexts

## Installation

```bash
npm install @hive/std
```

## Quick Start

```javascript
import { prop, inc, truthy } from "@hive/std/spark";

// Extract nested property
const value = prop({ detail: { count: 5 } }, "detail.count");
// Result: 5

// Increment a number
const next = inc(5);
// Result: 6

// Convert to boolean
const isEnabled = truthy("true");
// Result: true
```

**In HTML (with Echo):**
```html
<!-- Transform event data before setting property -->
<display-box on="#counter/count-changed:setter/value|prop=detail.count|inc"></display-box>
```

---

## Where Sparks Are Used

Sparks work as **filters** in three primary contexts:

### 1. Echo's `on` Attribute

Transform event data before it reaches a component:

```html
<!-- Extract nested property and increment -->
<component on="source/event:setter/prop|prop=detail.value|inc"></component>
```

### 2. @attributeChanged Decorator

Convert attribute strings to proper types:

```javascript
import { attributeChanged } from "@hive/std/directive";
import { truthy, inc } from "@hive/std/spark";

class MyComponent extends HTMLElement {
  @attributeChanged("count", Number, inc)
  set count(value) {
    // value is already a number and incremented
  }

  @attributeChanged("disabled", truthy)
  set disabled(value) {
    // value is a proper boolean
  }
}
```

### 3. @event Decorator

Process event objects before handler execution:

```javascript
import { event } from "@hive/std/event";
import { prop } from "@hive/std/spark";

class FormComponent extends HTMLElement {
  @event.input("input", prop("target.value"))
  handleInput(value) {
    // Receives the input value directly, not the event object
    console.log(value);
  }
}
```

---

## Available Sparks

### Arithmetic

| Spark | Description | Example |
|-------|-------------|---------|
| **add(x, y)** | Adds y to x | `add(5, 3)` → `8` |
| **subtract(x, y)** | Subtracts y from x | `subtract(10, 3)` → `7` |
| **inc(x)** | Increments by 1 | `inc(5)` → `6` |
| **dec(x)** | Decrements by 1 | `dec(5)` → `4` |

### Comparison

| Spark | Description | Example |
|-------|-------------|---------|
| **equals(x, y)** | Checks equality (==) | `equals(5, "5")` → `true` |
| **different(x, y)** | Checks inequality (!=) | `different(5, 3)` → `true` |
| **gt(x, y)** | Greater than | `gt(5, 3)` → `true` |
| **gte(x, y)** | Greater than or equal | `gte(5, 5)` → `true` |
| **lt(x, y)** | Less than | `lt(3, 5)` → `true` |
| **lte(x, y)** | Less than or equal | `lte(5, 5)` → `true` |

### Logic

| Spark | Description | Example |
|-------|-------------|---------|
| **not(x)** | Negates boolean | `not(true)` → `false` |
| **truthy(x)** | Converts to boolean | `truthy("false")` → `false` |

### Data Access

| Spark | Description | Example |
|-------|-------------|---------|
| **prop(obj, path)** | Accesses nested property | `prop(data, "user.name")` → `"Alice"` |
| **len(x)** | Returns object key count or string length | `len({a: 1, b: 2})` → `2` |

### Utility

| Spark | Description | Example |
|-------|-------------|---------|
| **always(token, value)** | Returns constant value | `always(x, 42)` → `42` |

---

## Detailed Examples

### Example 1: Form Validation with Echo

```javascript
import { Echo } from "@hive/std/echo";
import { define } from "@hive/std/directive";
import { paint, html } from "@hive/std/dom";

@define("email-input")
class EmailInput extends Echo(HTMLElement) {
  connectedCallback() {
    this.innerHTML = `<input type="email" placeholder="Enter email">`;
    this.querySelector("input").addEventListener("input", (e) => {
      this.dispatchEvent(new CustomEvent("email-changed", {
        detail: { value: e.target.value },
        bubbles: true
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
<email-input id="email"></email-input>

<!-- Button disabled when email length < 5 -->
<submit-button
  on="#email/email-changed:setter/disabled|prop=detail.value|len|lt=5">
</submit-button>
```

---

### Example 2: Counter with Multiple Transformations

```javascript
@define("counter-display")
class CounterDisplay extends Echo(HTMLElement) {
  set value(num) {
    this.textContent = `Count: ${num}`;
  }
}
```

**HTML:**
```html
<counter-button id="counter"></counter-button>

<!-- Extract count, add 10, check if greater than 100 -->
<counter-display
  on="#counter/count:setter/value|prop=detail.count|add=10">
</counter-display>

<!-- Check if count is even (using modulo pattern) -->
<indicator-light
  on="#counter/count:attribute/active|prop=detail.count|different=0">
</indicator-light>
```

---

### Example 3: Attribute Type Conversion

```javascript
import { attributeChanged } from "@hive/std/directive";
import { define } from "@hive/std/directive";
import { truthy, inc } from "@hive/std/spark";
import { repaint } from "@hive/std/dom";

@define("smart-input")
class SmartInput extends HTMLElement {
  // Convert string "true"/"false" to boolean
  @attributeChanged("disabled", truthy)
  @repaint
  set disabled(isDisabled) {
    this._disabled = isDisabled;
  }

  // Convert string to number and increment
  @attributeChanged("min", Number, inc)
  @repaint
  set min(value) {
    this._min = value;
  }

  // Convert string to number and decrement
  @attributeChanged("max", Number, dec)
  @repaint
  set max(value) {
    this._max = value;
  }
}
```

**HTML:**
```html
<!-- disabled will be boolean true, min will be 11, max will be 99 -->
<smart-input disabled="true" min="10" max="100"></smart-input>
```

---

### Example 4: Event Data Extraction

```javascript
import { event } from "@hive/std/event";
import { prop, len, gt } from "@hive/std/spark";

@define("search-box")
class SearchBox extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <input type="search" placeholder="Search...">
      <span id="char-count"></span>
    `;
  }

  // Extract input value directly
  @event.input("input", prop("target.value"))
  handleInput(value) {
    this.performSearch(value);
  }

  // Extract value, get length, check if > 3
  @event.input("input", prop("target.value"), len, gt(3))
  handleValidInput(isValid) {
    this.shadowRoot.querySelector("#char-count")
      .textContent = isValid ? "✓" : "Type more...";
  }

  performSearch(query) {
    console.log("Searching for:", query);
  }
}
```

---

## Chaining Sparks

Sparks become powerful when chained together in pipelines:

```html
<!-- Pipeline: extract → transform → validate -->
<component
  on="source/event:setter/prop|prop=detail.user.age|inc|gte=18">
</component>
```

**Data flow:**
1. Event contains `{ detail: { user: { age: 17 } } }`
2. `prop=detail.user.age` → `17`
3. `inc` → `18`
4. `gte=18` → `true`
5. Property setter receives `true`

---

## Creating Custom Sparks

Extend the spark registry with your own functions:

```javascript
import spark from "@hive/std/spark";

// Register a custom spark
spark.set("double", (x) => x * 2);
spark.set("uppercase", (str) => str.toUpperCase());
spark.set("clamp", (value, min, max) => Math.max(min, Math.min(max, value)));

// Use in HTML
```

**HTML:**
```html
<component on="source/event:setter/value|double"></component>
<component on="source/event:setter/text|uppercase"></component>
<component on="source/event:setter/brightness|clamp=0=100"></component>
```

---

## API Reference

### Arithmetic Functions

#### add(x, y)
Adds two numbers.

**Parameters:**
- `x` (number|string) - First value
- `y` (number|string) - Value to add

**Returns:** number

**Example:**
```javascript
add(5, 3);        // 8
add("5", "3");    // 8
```

---

#### subtract(x, y)
Subtracts y from x.

**Parameters:**
- `x` (number|string) - Value to subtract from
- `y` (number|string) - Value to subtract

**Returns:** number

**Example:**
```javascript
subtract(10, 3);   // 7
subtract("10", 3); // 7
```

---

#### inc(x)
Increments a number by 1.

**Parameters:**
- `x` (number|string) - Value to increment

**Returns:** number

**Example:**
```javascript
inc(5);     // 6
inc("5");   // 6
```

---

#### dec(x)
Decrements a number by 1.

**Parameters:**
- `x` (number|string) - Value to decrement

**Returns:** number

**Example:**
```javascript
dec(5);     // 4
dec("5");   // 4
```

---

### Comparison Functions

#### equals(x, y)
Checks if two values are equal using loose equality (==).

**Parameters:**
- `x` (*) - First value
- `y` (*) - Second value

**Returns:** boolean

**Example:**
```javascript
equals(5, 5);      // true
equals(5, "5");    // true (loose equality)
equals(5, 3);      // false
```

---

#### different(x, y)
Checks if two values are different using loose inequality (!=).

**Parameters:**
- `x` (*) - First value
- `y` (*) - Second value

**Returns:** boolean

**Example:**
```javascript
different(5, 3);    // true
different(5, "5");  // false (loose equality)
```

---

#### gt(x, y)
Checks if x is greater than y.

**Parameters:**
- `x` (number|string) - First value
- `y` (number|string) - Second value

**Returns:** boolean

**Example:**
```javascript
gt(5, 3);     // true
gt(3, 5);     // false
gt(5, 5);     // false
```

---

#### gte(x, y)
Checks if x is greater than or equal to y.

**Parameters:**
- `x` (number|string) - First value
- `y` (number|string) - Second value

**Returns:** boolean

**Example:**
```javascript
gte(5, 3);    // true
gte(5, 5);    // true
gte(3, 5);    // false
```

---

#### lt(x, y)
Checks if x is less than y.

**Parameters:**
- `x` (number|string) - First value
- `y` (number|string) - Second value

**Returns:** boolean

**Example:**
```javascript
lt(3, 5);     // true
lt(5, 3);     // false
lt(5, 5);     // false
```

---

#### lte(x, y)
Checks if x is less than or equal to y.

**Parameters:**
- `x` (number|string) - First value
- `y` (number|string) - Second value

**Returns:** boolean

**Example:**
```javascript
lte(3, 5);    // true
lte(5, 5);    // true
lte(5, 3);    // false
```

---

### Logic Functions

#### not(x)
Negates a boolean value.

**Parameters:**
- `x` (boolean) - Value to negate

**Returns:** boolean

**Example:**
```javascript
not(true);    // false
not(false);   // true
```

---

#### truthy(value)
Converts a value to boolean following HTML attribute conventions.

**Parameters:**
- `value` (string|null) - Value to convert

**Returns:** boolean

**Behavior:**
- Returns `false` for: `"false"`, `"0"`, `"no"`, `null`
- Returns `true` for everything else (including `""`)

**Example:**
```javascript
truthy("true");    // true
truthy("false");   // false
truthy("0");       // false
truthy("no");      // false
truthy(null);      // false
truthy("");        // true
truthy("yes");     // true
```

---

### Data Access Functions

#### prop(target, path)
Accesses a nested property from an object.

**Parameters:**
- `target` (object) - Source object
- `path` (string) - Property path (supports dot notation and bracket notation)

**Returns:** any - Property value or `undefined`

**Example:**
```javascript
const data = {
  user: { name: "Alice", age: 30 },
  items: ["a", "b", "c"]
};

prop(data, "user.name");      // "Alice"
prop(data, "user.age");       // 30
prop(data, "items[0]");       // "a"
prop(data, "missing.path");   // undefined
```

---

#### len(x)
Returns the number of keys in an object or length of a string.

**Parameters:**
- `x` (object|string) - Object or string to measure

**Returns:** number

**Example:**
```javascript
len({ a: 1, b: 2, c: 3 });   // 3
len("hello");                // 5
len([1, 2, 3]);              // 3
len(null);                   // 0
```

---

### Utility Functions

#### always(token, value)
Returns a constant value, ignoring the input.

**Parameters:**
- `token` (*) - Input value (ignored)
- `value` (*) - Value to return

**Returns:** * - The second parameter

**Example:**
```javascript
always(123, "fixed");   // "fixed"
always("anything", 42); // 42
```

**Use case:**
```html
<!-- Always set value to "active" regardless of event data -->
<component on="source/event:attribute/status|always=active"></component>
```

---

### spark.get(name)
Retrieves a registered spark function by name.

**Parameters:**
- `name` (string) - Spark name

**Returns:** Function - The spark function or a no-op function

**Example:**
```javascript
import spark from "@hive/std/spark";

const incFn = spark.get("inc");
incFn(5);  // 6

const unknown = spark.get("nonexistent");
unknown(42); // 42 (no-op)
```

---

### spark.set(name, fn)
Registers a new spark function.

**Parameters:**
- `name` (string) - Spark name
- `fn` (Function) - Transform function

**Returns:** spark - For chaining

**Example:**
```javascript
import spark from "@hive/std/spark";

spark
  .set("triple", x => x * 3)
  .set("square", x => x * x);
```

---

## Best Practices

### 1. Keep Sparks Pure

```javascript
// Good - Pure function
spark.set("double", x => x * 2);

// Bad - Side effects
spark.set("logAndDouble", x => {
  console.log(x); // Side effect!
  return x * 2;
});
```

### 2. Handle Type Coercion

```javascript
// Good - Explicit conversion
spark.set("safeAdd", (x, y) => Number(x) + Number(y));

// Bad - Implicit coercion may surprise
spark.set("add", (x, y) => x + y); // "5" + 3 = "53"
```

### 3. Provide Defaults for Safety

```javascript
// Good - Handles null/undefined
spark.set("safeLength", x => (x?.length ?? 0));

// Bad - May throw error
spark.set("length", x => x.length);
```

### 4. Use Descriptive Names

```javascript
// Good - Clear intent
spark.set("toUpperCase", str => str.toUpperCase());

// Bad - Unclear
spark.set("uc", str => str.toUpperCase());
```

### 5. Chain for Readability

```html
<!-- Good - Clear pipeline -->
<component on="source/event:setter/value|prop=detail.count|inc|gte=10"></component>

<!-- Bad - One complex spark -->
<component on="source/event:setter/value|complexValidation"></component>
```

---

## Performance Considerations

Sparks are designed for performance:

- **Pure Functions** - No side effects enable optimization
- **Lightweight** - Each spark adds ~0.01ms overhead
- **Composable** - Chain multiple without significant cost
- **Tree-Shakeable** - Import only what you use

**Recommendations:**
- Chain up to 5-7 sparks without performance concerns
- Avoid heavy computation in sparks (use methods instead)
- Cache results when processing large datasets
- Use sparks for transformation, not business logic

---

## Common Patterns

### Extract and Transform

```html
<!-- Extract nested property and transform -->
<component on="source/event:setter/value|prop=detail.user.score|add=10"></component>
```

### Validate Input

```html
<!-- Check if input is valid length -->
<button
  on="#input/change:setter/disabled|prop=target.value|len|lt=3">
</button>
```

### Toggle Boolean

```html
<!-- Negate boolean value -->
<component on="source/event:setter/visible|prop=detail.hidden|not"></component>
```

### Constant Assignment

```html
<!-- Always set to specific value -->
<component on="source/event:attribute/status|always=active"></component>
```

### Comparison Chain

```html
<!-- Complex validation pipeline -->
<form
  on="#age/input:setter/valid|prop=target.value|gte=18|truthy">
</form>
```

---

## Related Packages

- **[@hive/std/echo](../echo)** - Uses sparks for data transformation in `on` attribute
- **[@hive/std/directive](../directive)** - `@attributeChanged` decorator accepts spark filters
- **[@hive/std/event](../event)** - `@event` decorator supports spark filters

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
