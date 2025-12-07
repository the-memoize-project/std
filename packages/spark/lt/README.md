# Spark: `lt`

The `lt` (short for *Less Than*) is a helper from the `@hive/std/spark` package that compares two values and returns `true` if the first is less than the second.

## Installation and Import

The `lt` can be imported directly from the sparks package:

```javascript
import { lt } from '@hive/std/spark';
```

## Important Note: Numeric Comparison

The `lt` function converts both values to numbers before comparing, using the `<` operator.

**Practical Comparison Example:**

```javascript
lt('5', 10);  // Returns true (5 < 10)
lt(15, 10);   // Returns false (15 is not < 10)
lt(10, 10);   // Returns false (10 is not < 10)
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: Alert when a value falls below a threshold.

**HTML:**

```html
<low-battery-alert on="*/battery-level:setter/alert|lt=20|always=Low Battery Warning"></low-battery-alert>
```

### Use 2: Internal Component Logic

```javascript
import { lt } from '@hive/std/spark';

class BatteryMonitor extends HTMLElement {
  isBelowThreshold(level, threshold) {
    return lt(level, threshold);
  }
}
```

## Technical Description

```javascript
function lt(x, y) {
  return Number(x) < Number(y);
}
```
