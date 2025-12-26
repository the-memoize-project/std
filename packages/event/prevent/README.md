# Event Spark: `prevent`

The `prevent` is a helper from the `@hive/std/event` package that prevents the default action of an event by calling `event.preventDefault()`.

## Installation and Import

The `prevent` can be imported directly from the event package:

```javascript
import { prevent } from '@hive/std/event';
```

## How It Works

The `prevent` function cancels the event's default behavior (e.g., form submission, link navigation, checkbox toggling). It calls `event.preventDefault()` and returns the event for chaining with other sparks.

**Practical Examples:**

```javascript
const event = new Event('submit');
prevent(event); // Calls event.preventDefault()
```

## Possible Uses

### Use 1: Custom Form Handling

This is the most common use case - preventing default form submission to handle it with JavaScript.

**Scenario**: A form should be submitted via AJAX instead of normal form submission.

```javascript
import event, { prevent, formData } from '@hive/std/event';
import { define } from '@hive/std/directive';

@define('ajax-form')
class AjaxForm extends HTMLElement {
  @event.submit('form', prevent, formData)
  async handleSubmit(data) {
    // Form won't submit normally
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    console.log('Form submitted via AJAX');
  }
}
```

**HTML:**

```html
<ajax-form>
  <form>
    <input name="username" />
    <button type="submit">Submit</button>
  </form>
</ajax-form>
```

### Use 2: Custom Link Behavior

Prevent link navigation to implement custom routing or actions.

```javascript
import event, { prevent } from '@hive/std/event';

@define('spa-router')
class SPARouter extends HTMLElement {
  @event.click('a', prevent)
  handleLinkClick(evt) {
    // Link won't navigate normally
    const href = evt.target.getAttribute('href');
    this.navigateTo(href);
  }

  navigateTo(path) {
    // Custom routing logic
    console.log('Navigating to:', path);
  }
}
```

### Use 3: Custom Checkbox Behavior

Override default checkbox behavior for custom toggle logic.

```javascript
@define('custom-toggle')
class CustomToggle extends HTMLElement {
  @event.click('input[type="checkbox"]', prevent)
  handleToggle(evt) {
    // Checkbox won't toggle automatically
    const shouldToggle = this.validateToggle();
    if (shouldToggle) {
      evt.target.checked = !evt.target.checked;
    }
  }
}
```

### Use 4: Combining with Other Sparks

The `prevent` spark is often combined with other sparks for complete event handling.

```javascript
import event, { prevent, stop, formData } from '@hive/std/event';

@define('isolated-form')
class IsolatedForm extends HTMLElement {
  @event.submit('form', prevent, stop, formData)
  handleSubmit(data) {
    // 1. Prevents default form submission
    // 2. Stops event propagation
    // 3. Extracts form data as object
    console.log('Isolated form submission:', data);
  }
}
```

## Technical Description

```javascript
function prevent(event) {
  event.preventDefault();
  return event;
}
```

The function calls `preventDefault()` on the event and returns the event object, allowing it to be chained with other spark functions.

## Related Sparks

- **[stop](../stop)** - Stops event propagation
- **[formData](../formData)** - Converts FormData to plain object
- **[value](../value)** - Extracts event.target.value
