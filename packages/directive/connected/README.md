# Decorator `@connected`

The `@connected` decorator provides a declarative and clean way to execute initialization logic at the exact moment a Custom Element is inserted into the DOM.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { connected } from '@hive/std/directive';
```

## How to Use

Apply the `@connected` decorator directly to the class method that should be executed when the component is connected to the page.

### Usage Example

In this example, the `initializeComponent` method will be invoked automatically as soon as the `<my-element>` element is added to the HTML document.

```javascript
import { connected, define } from '@hive/std/directive';

@define('my-element')
class MyElement extends HTMLElement {
  /**
   * This method is executed automatically by the @connected decorator.
   * It's the ideal place to perform initial configurations, fetch data,
   * or manipulate the component's DOM for the first time.
   */
  @connected
  initializeComponent() {
    console.log('Component connected to DOM.');
    this.textContent = 'Hello, world! I am ready.';
  }
}
```

**In HTML:**

```html
<my-element></my-element>
```

## Description

The `@connected` decorator is a shortcut for the `connectedCallback()` lifecycle method of Web Components. Instead of implementing `connectedCallback` manually, you can simply decorate a method with a more meaningful name (such as `initialize`, `setup`, or `fetchData`) to execute your initialization logic.

Internally, the decorator uses an interceptor to attach to the lifecycle's `connectedCallback`. This ensures that the decorated method is called in an organized and predictable manner, without overwriting any other logic that may exist in the original `connectedCallback`. It's the perfect tool for any task that needs to happen as soon as the element becomes "alive" on the page.
