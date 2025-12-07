# Spark: `inc`

The `inc` (short for *Increment*) is a helper from the `@hive/std/spark` package whose function is to increment a value by 1, converting it to the `Number` type safely before the operation.

## Installation and Import

The `inc` can be imported directly from the sparks package:

```javascript
import { inc } from '@hive/std/spark';
```

## Possible Uses

The `inc` is a versatile utility function, ideal for manipulating numeric states in components or for transforming data in an event flow.

### Use 1: Internal Component Logic (Most Common Usage)

The most common way to use `inc` is to manage a component's state, such as in a "like" counter or shopping cart.

**Scenario**: A counter component that allows the user to increase a value.

```javascript
import { define } from '@hive/std/directive';
import { paint, repaint, html } from '@hive/std/dom';
import { inc } from '@hive/std/spark';

const counterHtml = (el) => html`
  <span>Likes: ${el.count}</span>
  <button>Like 👍</button>
`;

@define('like-button')
@paint(counterHtml)
class LikeButton extends HTMLElement {
  private _count = 0;

  get count() {
    return this._count;
  }

  // @repaint ensures the component will be re-rendered
  // whenever the count is changed.
  @repaint
  set count(newCount) {
    this._count = newCount;
  }

  // The method that uses the `inc` spark
  increaseCount() {
    // Direct use of the 'inc' function to update the state
    this.count = inc(this.count);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.increaseCount();
    });
  }
}
```

### Use 2: Transforming Event Data with `Echo`

You can use `inc` in an `Echo` pipeline to increment a value received from an event before applying it to a component.

**Scenario**: A system fires a `page-viewed` event with the current page number. A statistics component listens to this event and uses `inc` to display what will be the "next page".

**HTML:**

```html
<stats-widget on="*/page-viewed:setter/nextPage|inc"></stats-widget>
```

**Flow:**

1. The event occurs with `detail: 3`.
2. The spark `inc` is triggered, executing `inc(3)`.
3. The result `4` is passed to the `nextPage` setter of the `<stats-widget>` component.

## Technical Description

The `inc` implementation is simple and robust, ensuring the operation is always a mathematical addition.

```javascript
function inc(x) {
  return Number(x) + 1;
}
```

By using `Number(x)`, the function safely handles input values that may be strings (like `"9"`), converting them to numbers before incrementing. This prevents the unwanted behavior of string concatenation.
