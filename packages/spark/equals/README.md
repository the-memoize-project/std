# Spark: `equals`

The `equals` is a helper from the `@hive/std/spark` package that compares two values and returns `true` if they are considered equal.

## Installation and Import

The `equals` can be imported directly from the sparks package:

```javascript
import { equals } from '@hive/std/spark';
```

## Important Note: Non-Strict Comparison (`==`)

Like `different`, `equals` intentionally uses the non-strict equality operator (`==`) instead of the strict one (`===`).

**Why?** In the context of Web Components, it's very common to compare attribute values (which are always `string`) with `number` or `boolean` values from JavaScript. Non-strict comparison performs the necessary type conversion to make these comparisons work intuitively.

**Practical Comparison Example:**

```javascript
equals('10', 10); // Returns true (because 10 equals 10)
equals(1, true);  // Returns true (because 1 equals true after coercion)
equals(0, false); // Returns true

equals('10', 5);   // Returns false
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

The primary use case for `equals` is as a conditional filter in the `on` attribute.

**Scenario**: A component should only react to an event if the event's value matches a specific condition.

**HTML:**

```html
<status-panel on="*/status-change:setter/message|equals=ready|always=System Ready"></status-panel>
```

**Flow:**

1. Event fires with `detail: 'ready'`.
2. `equals('ready', 'ready')` returns `true`.
3. Pipeline continues, `always` sets the message to "System Ready".

### Use 2: Internal Component Logic

```javascript
import { equals } from '@hive/std/spark';

class ConfigPanel extends HTMLElement {
  isProduction() {
    return equals(this.environment, 'production');
  }
}
```

## Technical Description

```javascript
function equals(x, y) {
  return x == y;
}
```
