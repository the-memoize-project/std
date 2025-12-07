# Spark: `dec`

The `dec` is a helper from the `@hive/std/spark` package whose function is to decrement a value by 1, converting it to the `Number` type safely before the operation.

## Installation and Import

The `dec` can be imported directly from the sparks package:

```javascript
import { dec } from '@hive/std/spark';
```

## Possible Uses

Like other sparks, `dec` can be used as a data transformer in a flow or as a pure utility function within your component's logic.

### Use 1: Internal Component Logic (Most Common Usage)

The most direct use of `dec` is to manipulate a component's state, such as in a counter. It ensures that the decrement operation is always mathematical, even if the state is stored as a string.

**Scenario**: A "shopping cart" component allows the user to decrease the quantity of an item.

```javascript
import { define } from '@hive/std/directive';
import { paint, repaint, html } from '@hive/std/dom';
import { dec } from '@hive/std/spark';

const cartItemHtml = (el) => html`
  <span>Quantity: ${el.quantity}</span>
  <button>Remove 1</button>
`;

@define('cart-item')
@paint(cartItemHtml)
class CartItem extends HTMLElement {
  private _quantity = 5;

  get quantity() {
    return this._quantity;
  }

  @repaint
  set quantity(newQuantity) {
    this._quantity = newQuantity;
  }

  decreaseQuantity() {
    this.quantity = dec(this.quantity);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.decreaseQuantity();
    });
  }
}
```

### Use 2: In a Dataflow with `Echo`

**HTML:**

```html
<timer-display on="*/countdown:setter/seconds|dec"></timer-display>
```

## Technical Description

```javascript
function dec(x) {
  return Number(x) - 1;
}
```

The function converts the value to a number before decrementing, ensuring mathematical operations.
