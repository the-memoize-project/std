# Spark: `always`

The `always` is a helper from the `@hive/std/spark` package. Its function is very simple but powerful: it **ignores the current value** in a data flow and **replaces it with a fixed value** that you define.

## Installation and Import

The `always` can be imported directly from the sparks package:

```javascript
import { always } from '@hive/std/spark';
```

## Possible Uses

The `always` is almost exclusively used as a "pipe" in the `on` attribute of the `Echo` mixin, where its purpose is to discard event data and provide a constant value in its place.

### Use 1: Setting a Fixed State in Response to an Event

This is the most common use case. You want a state to change to a specific, predetermined value when an event occurs, without caring about any data the event might carry.

**Scenario**: A login panel should display the message "Connecting..." whenever the "Login" button is clicked. The click event doesn't carry any useful data, so we use `always` to provide the text string.

**HTML:**

```html
<login-status on="#login-btn/click:setter/statusMessage|always=Connecting..."></login-status>

<button id="login-btn">Login</button>
```

**Flow:**

1. The click event occurs on the button.
2. The spark `always` is triggered, executing `always(event, 'Connecting...')`.
3. The result `'Connecting...'` (ignoring the event) is passed to the `statusMessage` setter.

### Use 2: Resetting a State to a Default Value

**HTML:**

```html
<modal-dialog on="*/close-modal:setter/isOpen|always=false"></modal-dialog>
```

## Technical Description

```javascript
function always(x, value) {
  return value;
}
```

The function simply returns the second argument, ignoring the first. This makes it perfect for replacing dynamic data with constants.
