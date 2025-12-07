# Spark: `lte`

The `lte` (short for *Less Than or Equal*) is a helper from the `@hive/std/spark` package that compares two values and returns `true` if the first is less than or equal to the second.

## Installation and Import

The `lte` can be imported directly from the sparks package:

```javascript
import { lte } from '@hive/std/spark';
```

## Important Note: Numeric Comparison

The `lte` function converts both values to numbers before comparing, using the `<=` operator.

**Practical Comparison Example:**

```javascript
lte('5', 10);  // Returns true (5 <= 10)
lte(10, 10);   // Returns true (10 <= 10)
lte(15, 10);   // Returns false (15 is not <= 10)
```

## Possible Uses

### Use 1: Conditional Filtering in Echo Dataflow

**Scenario**: Validate that a value doesn't exceed a maximum limit.

**HTML:**

```html
<cart-validator on="*/item-quantity:setter/valid|lte=99|always=Valid Quantity"></cart-validator>
```

### Use 2: Internal Component Logic

```javascript
import { lte } from '@hive/std/spark';

class RangeValidator extends HTMLElement {
  isWithinMax(value, max) {
    return lte(value, max);
  }
}
```

## Technical Description

```javascript
function lte(x, y) {
  return Number(x) <= Number(y);
}
```
