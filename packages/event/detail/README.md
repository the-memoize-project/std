# Event Spark: `detail`

The `detail` is a helper from the `@hive/std/event` package that extracts the detail payload from a CustomEvent.

## Installation and Import

The `detail` can be imported directly from the event package:

```javascript
import { detail } from '@hive/std/event';
```

## How It Works

The `detail` function returns `event.detail`, which contains custom data passed when dispatching custom events. This allows your event handler to receive the payload directly instead of the event object.

**Practical Examples:**

```javascript
const event = new CustomEvent('user-selected', {
  detail: { id: 123, name: 'John' }
});
detail(event); // Returns { id: 123, name: 'John' }
```

## Possible Uses

### Use 1: Component Communication

This is the most common use case - extracting data from custom events dispatched by child components.

**Scenario**: A list component dispatches custom events when items are selected.

```javascript
import event, { detail } from '@hive/std/event';
import { define } from '@hive/std/directive';

// Child component
@define('user-item')
class UserItem extends HTMLElement {
  handleClick() {
    this.dispatchEvent(new CustomEvent('user-selected', {
      detail: {
        id: this.dataset.id,
        name: this.dataset.name,
        email: this.dataset.email
      },
      bubbles: true,
      composed: true
    }));
  }
}

// Parent component
@define('user-list')
class UserList extends HTMLElement {
  @event('user-selected', 'user-item', detail)
  handleUserSelection(userData) {
    // Receives the detail payload directly
    console.log('Selected user:', userData);
    // { id: '123', name: 'John', email: 'john@example.com' }
    this.showUserDetails(userData);
  }
}
```

**HTML:**

```html
<user-list>
  <user-item data-id="123" data-name="John" data-email="john@example.com"></user-item>
  <user-item data-id="456" data-name="Jane" data-email="jane@example.com"></user-item>
</user-list>
```

### Use 2: State Change Events

Extract state change data from custom events.

```javascript
@define('theme-switcher')
class ThemeSwitcher extends HTMLElement {
  changeTheme(themeName) {
    this.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: themeName, timestamp: Date.now() },
      bubbles: true
    }));
  }
}

@define('app-root')
class AppRoot extends HTMLElement {
  @event('theme-changed', 'theme-switcher', detail)
  handleThemeChange(themeData) {
    // Receives { theme: 'dark', timestamp: 1234567890 }
    this.applyTheme(themeData.theme);
  }
}
```

### Use 3: Form Validation Events

Extract validation results from custom validation events.

```javascript
@define('email-input')
class EmailInput extends HTMLElement {
  validate() {
    const isValid = this.checkEmail();
    this.dispatchEvent(new CustomEvent('validation-complete', {
      detail: {
        valid: isValid,
        field: 'email',
        message: isValid ? 'Valid email' : 'Invalid email format'
      },
      bubbles: true
    }));
  }
}

@define('registration-form')
class RegistrationForm extends HTMLElement {
  @event('validation-complete', 'email-input', detail)
  handleValidation(validationResult) {
    // Receives validation detail object
    if (!validationResult.valid) {
      this.showError(validationResult.message);
    }
  }
}
```

### Use 4: Combining with Other Sparks

The `detail` spark can be combined with other event sparks.

```javascript
import event, { stop, detail } from '@hive/std/event';

@define('isolated-handler')
class IsolatedHandler extends HTMLElement {
  @event('data-updated', '*', stop, detail)
  handleDataUpdate(data) {
    // 1. Stops event propagation
    // 2. Extracts detail payload
    console.log('Isolated data update:', data);
  }
}
```

### Use 5: WebSocket Message Events

Extract message data from WebSocket-related custom events.

```javascript
@define('chat-client')
class ChatClient extends HTMLElement {
  @event('message-received', 'ws-connection', detail)
  handleMessage(messageData) {
    // Receives { sender: 'John', text: 'Hello!', timestamp: ... }
    this.displayMessage(messageData);
  }
}
```

## Technical Description

```javascript
function detail(event) {
  return event.detail;
}
```

The function extracts and returns the `detail` property from the CustomEvent. The return type is `any` since custom events can contain any type of data in their detail property.

## Related Sparks

- **[value](../value)** - Extracts event.target.value
- **[formData](../formData)** - Converts FormData to plain object
- **[stop](../stop)** - Stops event propagation
