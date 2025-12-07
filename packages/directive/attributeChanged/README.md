# Decorator `@attributeChanged`

The `@attributeChanged` decorator is a powerful tool that connects a class *setter* to an HTML attribute. It monitors the attribute and executes the setter automatically whenever its value is changed, also allowing for data transformation of the received value.

## Installation and Import

The decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { attributeChanged } from '@hive/std/directive';
```

## How to Use

`@attributeChanged` is a factory decorator, which means you invoke it as a function, passing configuration arguments.

  - **`attribute` (string):** The name of the HTML attribute to be observed (e.g., `'value'`, `'visible'`).
  - **`filters` (...Function):** (Optional) One or more functions that receive the attribute's new value (which is always a string) and transform it before being passed to the setter.

### Example 1: Basic Usage

In this example, the `username` setter will be called every time the element's `username` attribute is changed.

```javascript
import { attributeChanged, define } from '@hive/std/directive';

@define('user-greeting')
class UserGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello, <span>traveler</span>!</h1>`;
  }

  // Links the 'username' setter to the 'username' attribute
  @attributeChanged('username')
  set username(newName) {
    // newName is the attribute's value (e.g., "John")
    this.querySelector('span').textContent = newName;
  }
}
```

**In HTML:**

```html
<user-greeting username="John"></user-greeting>
```

### Example 2: With Transformation Filter

It's very common for attributes to represent boolean values (`true`/`false`). The decorator facilitates the conversion of the attribute's string to a real boolean.

```javascript
import { attributeChanged, define } from '@hive/std/directive';

@define('my-modal')
class MyModal extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none'; // Starts hidden
  }

  // 1. Observes the 'visible' attribute.
  // 2. The attribute's value (e.g., "true") is passed to the filter.
  // 3. The filter `value => value === 'true'` returns a boolean.
  // 4. The boolean is passed to the 'visible' setter.
  @attributeChanged('visible', value => value === 'true')
  set visible(isVisible) {
    console.log(`Is the modal visible? ${isVisible}`); // true or false
    this.style.display = isVisible ? 'block' : 'none';
  }
}
```

## Description

The `@attributeChanged` decorator abstracts two manual and repetitive tasks in Web Component development:

1.  **Automatic Attribute Registration:** It automatically adds the attribute name to the class's static `observedAttributes` array, which is necessary for the `attributeChangedCallback` to be triggered.
2.  **Routing and Transformation:** It intercepts the `attributeChangedCallback`, checks if the changed attribute is the one being observed, and if so, passes the new value through the filter chain before invoking the corresponding setter.

This keeps the component's code cleaner and more declarative, concentrating the logic for reacting to attribute changes directly in the responsible setter.
