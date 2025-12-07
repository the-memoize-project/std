# Decorator `@repaint`

The `@repaint` decorator is the main tool for creating reactive components in the `@hive/std` ecosystem. It connects changes in your component's state to a new UI rendering, ensuring that the screen always reflects the most recent data.

## Installation and Import

This decorator is part of the `@hive/std/dom` package and is usually used in conjunction with `@paint`.

```javascript
import { repaint, paint, html } from '@hive/std/dom';
```

## How to Use

Apply the `@repaint` decorator to a **setter** or a **method**. Every time that setter is called (or the method executed), the decorator will trigger a complete new rendering (HTML and CSS) of your component.

The condition for `@repaint` to work is that the component has already been rendered at least once by the `@paint` decorator.

### Usage Example (Counter Component)

In this example, the `count` property's setter is decorated with `@repaint`. Whenever the value of `count` is changed, the entire component will be "repainted" with the new value.

```javascript
import { define } from '@hive/std/directive';
import { repaint, paint, html } from '@hive/std/dom';

// The component's HTML depends on the 'count' property.
const counterHtml = (el) => html`
  <p>Current count: <strong>${el.count}</strong></p>
  <button>Increment +1</button>
`;

@define('my-counter')
@paint(counterHtml)
class MyCounter extends HTMLElement {
  private _count = 0;

  get count() {
    return this._count;
  }

  // The @repaint decorator on the setter is the key to reactivity.
  // Whenever 'this.count = ...' is called, the component will be
  // rendered again, updating the <strong>.
  @repaint
  set count(newValue) {
    this._count = newValue;
  }

  // In connectedCallback, we add the logic to change the state.
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      // This line invokes the setter, which in turn triggers @repaint.
      this.count++;
    });
  }
}
```

## Description

The `@repaint` decorator intercepts the execution of a method or setter. After executing the original logic, it checks if the component has already been rendered (`isPainted = true`).

If affirmative, it re-executes the entire rendering cycle defined by `@paint`:

1.  Calls the `willPaintCallback` (if it exists).
2.  Calls the `html` function to generate the new HTML.
3.  Calls the `css` function to generate the new styles.
4.  Calls the `didPaintCallback` (if it exists).

This behavior ensures that any change in your component's state is automatically and completely reflected in the user interface, making `@repaint` the bridge between data logic and visualization.
