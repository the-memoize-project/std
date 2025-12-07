# Decorator `@define`

The `@define` decorator simplifies the process of registering a class as a Custom Element. It acts as a convenient and safe wrapper for the browser's standard `customElements.define()` API.

## Installation and Import

The decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { define } from '@hive/std/directive';
```

## How to Use

`@define` is a factory decorator that should be applied directly to the class you want to register as a Custom Element.

  - **`name` (string):** The Custom Element's tag name (e.g., `'my-component'`). Must contain a hyphen.
  - **`options` (ElementDefinitionOptions):** (Optional) A configuration object, used primarily to create customized built-in elements (that extend native HTML elements like `<div>` or `<p>`).

### Example 1: Autonomous Element (Common Usage)

This is the most common use case, where you create a completely new element that extends `HTMLElement`.

```javascript
import { define } from '@hive/std/directive';

@define('my-widget')
class MyWidget extends HTMLElement {
  constructor() {
    super();
    this.textContent = 'This is my widget!';
  }
}
```

**In HTML:**

```html
<my-widget></my-widget>
```

### Example 2: Customized Built-in Element

You can also use `@define` to extend existing HTML elements, such as `<div>`, `<a>`, or `<button>`.

```javascript
import { define } from '@hive/std/directive';

// Extends the functionality of a native <div>
@define('expanding-div', { extends: 'div' })
class ExpandingDiv extends HTMLDivElement {
  constructor() {
    super();
    this.style.backgroundColor = 'lightblue';
    this.addEventListener('focus', () => this.textContent = 'Focused!');
    this.addEventListener('blur', () => this.textContent = 'Out of focus.');
  }
}
```

**In HTML:**

```html
<div is="expanding-div" tabindex="0">Click here</div>
```

## Description

The `@define` decorator wraps the `customElements.define(name, constructor, options)` call, but with a crucial safety advantage: **it prevents redefinition errors**.

Before attempting to register a new element, the decorator first checks if an element with the same name has already been defined, using `customElements.get(name)`. If the element already exists, no action is taken, preventing "already defined" errors that are common in large applications or in development environments with hot-reload. If it doesn't exist, it proceeds with registration.
