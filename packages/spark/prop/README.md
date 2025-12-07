# Spark: `prop`

The `prop` is a helper from the `@hive/std/spark` package that extracts a property from an object. It's especially useful for accessing nested properties in event data.

## Installation and Import

The `prop` can be imported directly from the sparks package:

```javascript
import { prop } from '@hive/std/spark';
```

## How It Works

The `prop` function accepts a property path as a string (using dot notation) and returns the value at that path in the object. It safely handles nested properties and returns `undefined` if the path doesn't exist.

**Practical Examples:**

```javascript
const data = {
  user: {
    name: 'Alice',
    profile: {
      age: 30
    }
  }
};

prop(data, 'user.name');          // Returns 'Alice'
prop(data, 'user.profile.age');   // Returns 30
prop(data, 'user.email');         // Returns undefined
```

## Possible Uses

### Use 1: Extracting Event Detail Properties in Echo Dataflow

This is the most common use case - extracting specific properties from CustomEvent `detail` objects.

**Scenario**: A server event fires with a complex payload, and you only need one specific property.

**JavaScript (Event dispatch):**

```javascript
this.dispatchEvent(new CustomEvent('user-login', {
  detail: {
    user: {
      id: 123,
      name: 'Alice',
      email: 'alice@example.com'
    },
    timestamp: Date.now()
  },
  bubbles: true
}));
```

**HTML:**

```html
<user-display on="*/user-login:setter/userName|prop=detail.user.name"></user-display>
<user-id-badge on="*/user-login:setter/userId|prop=detail.user.id"></user-id-badge>
```

**Flow:**

1. Event fires with the complex `detail` object.
2. `prop(event, 'detail.user.name')` extracts `'Alice'`.
3. The `userName` setter receives `'Alice'`.

### Use 2: Internal Component Logic

```javascript
import { prop } from '@hive/std/spark';

class DataProcessor extends HTMLElement {
  extractValue(obj, path) {
    return prop(obj, path);
  }
}
```

## Technical Description

```javascript
function prop(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
```

The function uses `reduce` to traverse the property path, safely accessing nested properties with optional chaining.
