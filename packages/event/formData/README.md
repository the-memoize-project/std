# Event Spark: `formData`

The `formData` is a helper from the `@hive/std/event` package that converts form data to a plain JavaScript object.

## Installation and Import

The `formData` can be imported directly from the event package:

```javascript
import { formData } from '@hive/std/event';
```

## How It Works

The `formData` function creates a FormData instance from the event's target form and converts it to a plain object using `Object.fromEntries()`. It includes the submitter element if present, allowing you to work with form data as a simple JavaScript object.

**Practical Examples:**

```javascript
const form = document.querySelector('form');
const event = { target: form, submitter: null };
formData(event); // Returns { username: 'john', email: 'john@example.com', ... }
```

## Possible Uses

### Use 1: Form Submission Handling

This is the most common use case - extracting all form data as a clean object for processing.

**Scenario**: A registration form should send data to an API endpoint.

```javascript
import event, { prevent, formData } from '@hive/std/event';
import { define } from '@hive/std/directive';

@define('registration-form')
class RegistrationForm extends HTMLElement {
  @event.submit('form', prevent, formData)
  async handleSubmit(data) {
    // Receives form data as a plain object
    // { username: 'john', email: 'john@example.com', password: '...' }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Registration successful');
    }
  }
}
```

**HTML:**

```html
<registration-form>
  <form>
    <input name="username" required />
    <input name="email" type="email" required />
    <input name="password" type="password" required />
    <button type="submit">Register</button>
  </form>
</registration-form>
```

### Use 2: Search Forms

Extract search parameters for filtering or API calls.

```javascript
import event, { prevent, formData } from '@hive/std/event';

@define('search-form')
class SearchForm extends HTMLElement {
  @event.submit('form', prevent, formData)
  handleSearch(searchParams) {
    // { query: 'laptop', category: 'electronics', minPrice: '100' }
    this.performSearch(searchParams);
  }

  performSearch(params) {
    const url = new URL('/api/search', location.origin);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    fetch(url).then(/* ... */);
  }
}
```

**HTML:**

```html
<search-form>
  <form>
    <input name="query" placeholder="Search..." />
    <select name="category">
      <option value="all">All</option>
      <option value="electronics">Electronics</option>
    </select>
    <input name="minPrice" type="number" />
    <button type="submit">Search</button>
  </form>
</search-form>
```

### Use 3: Multi-Step Forms

Collect data from multi-step wizards.

```javascript
@define('wizard-form')
class WizardForm extends HTMLElement {
  #formData = {};

  @event.submit('.step-1', prevent, formData)
  handleStep1(data) {
    // { firstName: 'John', lastName: 'Doe' }
    Object.assign(this.#formData, data);
    this.showStep(2);
  }

  @event.submit('.step-2', prevent, formData)
  handleStep2(data) {
    // { email: 'john@example.com', phone: '555-1234' }
    Object.assign(this.#formData, data);
    this.submitFinalForm();
  }

  submitFinalForm() {
    console.log('Complete form data:', this.#formData);
    // { firstName: 'John', lastName: 'Doe', email: '...', phone: '...' }
  }
}
```

### Use 4: File Uploads

Handle file uploads with other form data.

```javascript
@define('upload-form')
class UploadForm extends HTMLElement {
  @event.submit('form', prevent, formData)
  async handleUpload(data) {
    // data includes file inputs, but as FormDataEntryValue
    // For actual file uploads, you'd create a FormData manually

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await fetch('/api/upload', {
      method: 'POST',
      body: formData // Send as multipart/form-data
    });
  }
}
```

### Use 5: Combining with Validation

Chain with validation before submission.

```javascript
import event, { prevent, stop, formData } from '@hive/std/event';

@define('validated-form')
class ValidatedForm extends HTMLElement {
  @event.submit('form', prevent, stop, formData)
  handleSubmit(data) {
    // 1. Prevents default submission
    // 2. Stops event propagation
    // 3. Extracts form data

    const errors = this.validate(data);
    if (errors.length === 0) {
      this.submit(data);
    } else {
      this.showErrors(errors);
    }
  }

  validate(data) {
    const errors = [];
    if (!data.email.includes('@')) {
      errors.push('Invalid email');
    }
    return errors;
  }
}
```

## Technical Description

```javascript
const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));
```

The function:
1. Creates a `FormData` instance from `event.target` (the form element)
2. Passes `event.submitter` to capture which submit button was clicked
3. Converts the FormData to a plain object using `Object.fromEntries()`

**Note**: File inputs will be included as `File` objects in the resulting object.

## Related Sparks

- **[prevent](../prevent)** - Prevents default form submission (commonly used together)
- **[stop](../stop)** - Stops event propagation
- **[value](../value)** - Extracts single input values
