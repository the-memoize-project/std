# Spark: `gte`

The `gte` (short for *Greater Than or Equal*) is a helper from the `@hive/std/spark` package that compares two values and returns `true` if the first is greater than or equal to the second.

## Installation and Import

The `gte` can be imported directly from the sparks package:

```javascript
import { gte } from '@hive/std/spark';
```

## Important Note: Numeric Comparison

The `gte` function converts both values to numbers before comparing, using the `>=` operator.

**Practical Comparison Example:**

```javascript
gte('15', 10); // Returns true (15 >= 10)
gte(10, 10);   // Returns true (10 >= 10)
gte(5, 10);    // Returns false (5 is not >= 10)
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: Trigger an alert when a value meets or exceeds a minimum threshold.

**HTML:**

```html
<stock-alert on="*/stock-level:setter/warning|gte=50|always=Adequate Stock"></stock-alert>
```

### Use 2: Internal Component Logic

```javascript
import { gte } from '@hive/std/spark';

class InventoryCheck extends HTMLElement {
  hasMinimumStock(quantity, minimum) {
    return gte(quantity, minimum);
  }
}
```

## Technical Description

```javascript
function gte(x, y) {
  return Number(x) >= Number(y);
}
```
