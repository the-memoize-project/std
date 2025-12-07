# Spark: `different`

The `different` is a helper from the `@hive/std/spark` package that compares two values and returns `true` if they are different.

## Installation and Import

The `different` can be imported directly from the sparks package:

```javascript
import { different } from '@hive/std/spark';
```

## Important Note: Non-Strict Comparison (`!=`)

The `different` intentionally uses the non-strict inequality operator (`!=`) instead of the strict one (`!==`).

**Why?** In the context of HTML and Web Components, attribute values are always strings. If we used strict comparison, comparing the attribute `value="5"` (string) with the number `5` (number) would be `true` (since `string` is different from `number`), which is usually not the desired behavior.

Non-strict comparison performs type coercion before comparing, allowing for more flexible and intuitive checking in the DOM environment.

**Practical Comparison Example:**

```javascript
different('10', 10); // Returns false (because 10 is not different from 10)
different(1, true);  // Returns false (because 1 is not different from true after coercion)
different(0, false); // Returns false

different('10', 5);   // Returns true
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: A component should only react to an event if the value is different from a specific threshold.

**HTML:**

```html
<alert-panel on="*/temperature-change:setter/alert|different=20|always=Warning: Temperature Changed"></alert-panel>
```

### Use 2: Internal Component Logic

```javascript
import { different } from '@hive/std/spark';

class FormValidator extends HTMLElement {
  hasChanged(newValue, oldValue) {
    return different(newValue, oldValue);
  }
}
```

## Technical Description

```javascript
function different(x, y) {
  return x != y;
}
```
