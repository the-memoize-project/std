# Spark: `len`

The `len` (short for *Length*) is a helper from the `@hive/std/spark` package that returns the length of a string, array, or any object with a `length` property.

## Installation and Import

The `len` can be imported directly from the sparks package:

```javascript
import { len } from '@hive/std/spark';
```

## How It Works

The `len` function accesses the `length` property of the input value. It works with strings, arrays, and any object that has a `length` property.

**Practical Examples:**

```javascript
len('hello');           // Returns 5
len([1, 2, 3, 4]);      // Returns 4
len('');                // Returns 0
len([]);                // Returns 0
```

## Possible Uses

### Use 1: Counting Items in Echo Dataflow

**Scenario**: Display the number of items in a list received from an event.

**JavaScript (Event dispatch):**

```javascript
this.dispatchEvent(new CustomEvent('items-loaded', {
  detail: { items: ['apple', 'banana', 'orange'] },
  bubbles: true
}));
```

**HTML:**

```html
<item-counter on="*/items-loaded:setter/count|prop=detail.items|len"></item-counter>
```

**Flow:**

1. Event fires with `detail: { items: ['apple', 'banana', 'orange'] }`.
2. `prop` extracts the array `['apple', 'banana', 'orange']`.
3. `len` returns `3`.
4. The `count` setter receives `3`.

### Use 2: Validation in Internal Logic

```javascript
import { len } from '@hive/std/spark';

class FormValidator extends HTMLElement {
  validateLength(value, minLength) {
    return len(value) >= minLength;
  }
}
```

### Use 3: String Manipulation

```javascript
import { len } from '@hive/std/spark';

class CharCounter extends HTMLElement {
  countCharacters(text) {
    return len(text);
  }
}
```

## Technical Description

```javascript
function len(x) {
  return x.length;
}
```

The function simply accesses the `length` property. It assumes the input has a `length` property and will return `undefined` if it doesn't.
