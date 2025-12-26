# Event Spark: `stop`

The `stop` is a helper from the `@hive/std/event` package that stops event propagation by calling `event.stopPropagation()`.

## Installation and Import

The `stop` can be imported directly from the event package:

```javascript
import { stop } from '@hive/std/event';
```

## How It Works

The `stop` function prevents an event from bubbling up the DOM tree, stopping any parent handlers from being notified of the event. It calls `event.stopPropagation()` and returns the event for chaining with other sparks.

**Practical Examples:**

```javascript
const event = new Event('click', { bubbles: true });
stop(event); // Calls event.stopPropagation()
```

## Possible Uses

### Use 1: Preventing Event Bubbling in Components

This is the primary use case - preventing events from bubbling to parent elements.

**Scenario**: A button click inside a card should not trigger the card's click handler.

```javascript
import event, { stop } from '@hive/std/event';
import { define } from '@hive/std/directive';

@define('action-card')
class ActionCard extends HTMLElement {
  @event.click('.card', stop)
  handleCardClick(evt) {
    console.log('Card clicked');
  }

  @event.click('button', stop)
  handleButtonClick(evt) {
    // Event won't bubble to card
    console.log('Button clicked - card handler won\'t fire');
  }
}
```

**HTML:**

```html
<action-card>
  <div class="card">
    <button>Action</button>
  </div>
</action-card>
```

### Use 2: Combining with Other Sparks

The `stop` spark can be chained with other event sparks for powerful combinations.

```javascript
import event, { stop, prevent, value } from '@hive/std/event';

@define('my-form')
class MyForm extends HTMLElement {
  @event.submit('form', prevent, stop)
  handleSubmit(evt) {
    // 1. Prevents default form submission
    // 2. Stops event propagation
    console.log('Form submitted');
  }

  @event.input('input', stop, value)
  handleInput(inputValue) {
    // 1. Stops event propagation
    // 2. Extracts the input value
    console.log('Input value:', inputValue);
  }
}
```

### Use 3: Isolating Component Behavior

Prevent child component events from affecting parent components.

```javascript
@define('nested-widget')
class NestedWidget extends HTMLElement {
  @event.click('*', stop)
  handleAnyClick(evt) {
    // All clicks inside this component stay isolated
    this.processClick(evt);
  }
}
```

## Technical Description

```javascript
function stop(event) {
  event.stopPropagation();
  return event;
}
```

The function calls `stopPropagation()` on the event and returns the event object, allowing it to be chained with other spark functions.

## Related Sparks

- **[prevent](../prevent)** - Prevents the default event action
- **[value](../value)** - Extracts event.target.value
- **[formData](../formData)** - Converts FormData to plain object
