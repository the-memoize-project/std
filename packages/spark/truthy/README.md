# Spark: `truthy`

The `truthy` is a helper from the `@hive/std/spark` package that evaluates whether a value can be considered truthy, following HTML boolean attribute conventions.

## Installation and Import

The `truthy` can be imported directly from the sparks package:

```javascript
import { truthy } from '@hive/std/spark';
```

## Important Note: HTML Boolean Attribute Convention

The `truthy` function follows the HTML convention for boolean attributes, where the presence of an attribute indicates `true`, and certain specific values indicate `false`.

**Special falsy values:**
- `"false"` (string)
- `"0"` (string)
- `"no"` (string)
- `null`

All other values are considered truthy.

**Practical Examples:**

```javascript
truthy("true");     // Returns true
truthy("yes");      // Returns true
truthy("1");        // Returns true
truthy("anything"); // Returns true

truthy("false");    // Returns false
truthy("0");        // Returns false
truthy("no");       // Returns false
truthy(null);       // Returns false
```

## Possible Uses

### Use 1: Converting Attribute Values to Booleans

This is the primary use case - converting HTML attribute strings to proper boolean values.

**Scenario**: A component has a `disabled` attribute that should be interpreted as a boolean.

```javascript
import { truthy } from '@hive/std/spark';
import { attributeChanged } from '@hive/std/directive';

class CustomButton extends HTMLElement {
  @attributeChanged('disabled', truthy)
  set disabled(isDisabled) {
    // isDisabled is now a proper boolean
    this.button.disabled = isDisabled;
  }
}
```

**HTML:**

```html
<custom-button disabled="false"></custom-button> <!-- Will be false -->
<custom-button disabled="true"></custom-button>  <!-- Will be true -->
<custom-button disabled></custom-button>         <!-- Will be true (empty string) -->
```

### Use 2: In Echo Dataflow

**HTML:**

```html
<modal-dialog on="*/toggle:setter/isOpen|truthy"></modal-dialog>
```

## Technical Description

```javascript
function truthy(value) {
  if (value === "false" || value === "0" || value === "no" || value === null) {
    return false;
  }
  return true;
}
```
