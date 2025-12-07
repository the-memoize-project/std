# Spark: `subtract`

The `subtract` is a helper from the `@hive/std/spark` package. Its function is to subtract one value from another, converting them to numbers safely before the operation.

## Installation and Import

The `subtract` can be imported directly from the sparks package:

```javascript
import { subtract } from '@hive/std/spark';
```

## Possible Uses

Like other sparks, `subtract` shines when used in data transformation pipelines.

### Use 1: In a Dataflow with the `Echo` Mixin

**Scenario**: A component displays a countdown. When a `tick` event is fired, we subtract 1 from the current time.

**HTML:**

```html
<countdown-timer on="*/tick:setter/timeRemaining|subtract=1"></countdown-timer>
```

### Use 2: Direct Usage in Component Logic

```javascript
import { subtract } from '@hive/std/spark';

class PriceCalculator extends HTMLElement {
  applyDiscount(price, discount) {
    return subtract(price, discount);
  }
}
```

## Technical Description

```javascript
function subtract(x, y) {
  return Number(x) - Number(y);
}
```

The function converts both values to numbers before performing the subtraction, preventing type coercion issues.
