# Spark: `add`

The `add` is a helper from the `@hive/std/spark` package. Its function is to sum two values, converting them to numbers safely before the operation.

## Installation and Import

The `add` can be imported directly from the sparks package:

```javascript
import { add } from '@hive/std/spark';
```

## Possible Uses

The main strength of sparks like `add` is their ability to be composed in different parts of the library to transform data in a flow.

### Use 1: In a Dataflow with the `Echo` Mixin

This is the most common use case for sparks. You can use it as a "pipe" in the `on` attribute to modify event data before it reaches its destination.

**Scenario**: A game component fires a `score-increased` event with the player's score. Another component, which displays the "total bonus points", listens to this event and adds 50 bonus points to the received score.

**HTML:**

```html
<bonus-display on="*/score-increased:setter/bonusPoints|add=50"></bonus-display>
```

**Flow:**

1. The event occurs with `detail: 100`.
2. The spark `add` is triggered, executing `add(100, 50)`.
3. The result `150` is passed to the `bonusPoints` setter of the `<bonus-display>` component.

### Use 2: Internal Component Logic

You can also use `add` directly within your component's methods for calculations.

```javascript
import { add } from '@hive/std/spark';

class Calculator extends HTMLElement {
  calculateTotal(price, tax) {
    return add(price, tax);
  }
}
```

## Technical Description

The `add` implementation is simple and robust, ensuring the operation is always a mathematical addition.

```javascript
function add(x, y) {
  return Number(x) + Number(y);
}
```

By using `Number(x)` and `Number(y)`, the function safely handles input values that may be strings (like `"9"`), converting them to numbers before adding. This prevents the unwanted behavior of string concatenation.
