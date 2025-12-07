# Spark: `gt`

The `gt` (short for *Greater Than*) is a helper from the `@hive/std/spark` package that compares two values and returns `true` if the first is greater than the second.

## Installation and Import

The `gt` can be imported directly from the sparks package:

```javascript
import { gt } from '@hive/std/spark';
```

## Important Note: Numeric Comparison

The `gt` function converts both values to numbers before comparing, using the `>` operator. This ensures mathematical comparison even when values are strings.

**Practical Comparison Example:**

```javascript
gt('15', 10); // Returns true (15 > 10)
gt(5, 10);    // Returns false (5 is not > 10)
gt(10, 10);   // Returns false (10 is not > 10)
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: A component should only react if a value exceeds a threshold.

**HTML:**

```html
<high-temp-alert on="*/temp-reading:setter/alert|gt=100|always=High Temperature Warning"></high-temp-alert>
```

**Flow:**

1. Event fires with `detail: 105`.
2. `gt(105, 100)` returns `true`.
3. Pipeline continues, setting the alert message.

### Use 2: Internal Component Logic

```javascript
import { gt } from '@hive/std/spark';

class ThresholdMonitor extends HTMLElement {
  isAboveThreshold(value, threshold) {
    return gt(value, threshold);
  }
}
```

## Technical Description

```javascript
function gt(x, y) {
  return Number(x) > Number(y);
}
```
