# Spark: `not`

The `not` is a helper from the `@hive/std/spark` package that inverts the truthiness of a value. It returns `true` if the value is falsy, and `false` if the value is truthy.

## Installation and Import

The `not` can be imported directly from the sparks package:

```javascript
import { not } from '@hive/std/spark';
```

## Important Note: Boolean Negation

The `not` function uses the JavaScript logical NOT operator (`!`), which evaluates the truthiness of a value before inverting it.

**Practical Examples:**

```javascript
not(true);       // Returns false
not(false);      // Returns true
not('');         // Returns true (empty string is falsy)
not('hello');    // Returns false (non-empty string is truthy)
not(0);          // Returns true (0 is falsy)
not(42);         // Returns false (non-zero number is truthy)
not(null);       // Returns true
not(undefined);  // Returns true
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: Toggle a state when a boolean value is false.

**HTML:**

```html
<toggle-panel on="*/is-collapsed:setter/isExpanded|not"></toggle-panel>
```

**Flow:**

1. Event fires with `detail: false`.
2. `not(false)` returns `true`.
3. The `isExpanded` setter receives `true`.

### Use 2: Internal Component Logic

```javascript
import { not } from '@hive/std/spark';

class ToggleButton extends HTMLElement {
  toggle() {
    this.active = not(this.active);
  }
}
```

## Technical Description

```javascript
function not(x) {
  return !x;
}
```
