# Event Spark: `value`

The `value` is a helper from the `@hive/std/event` package that extracts the value from an event's target element.

## Installation and Import

The `value` can be imported directly from the event package:

```javascript
import { value } from '@hive/std/event';
```

## How It Works

The `value` function returns `event.target.value`, commonly used with input, textarea, and select elements. This allows your event handler to receive the value directly instead of the event object.

**Practical Examples:**

```javascript
const event = { target: { value: 'hello' } };
value(event); // Returns 'hello'
```

## Possible Uses

### Use 1: Input Value Extraction

This is the most common use case - extracting input values without manual property access.

**Scenario**: A search input should filter results as the user types.

```javascript
import event, { value } from '@hive/std/event';
import { define } from '@hive/std/directive';

@define('search-box')
class SearchBox extends HTMLElement {
  @event.input('input[type="search"]', value)
  handleSearch(searchTerm) {
    // Receives the value directly, not the event
    console.log('Searching for:', searchTerm);
    this.filterResults(searchTerm);
  }

  filterResults(term) {
    // Filter logic here
  }
}
```

**HTML:**

```html
<search-box>
  <input type="search" placeholder="Search..." />
</search-box>
```

### Use 2: Select Dropdown Handling

Extract selected values from dropdown menus.

```javascript
import event, { value } from '@hive/std/event';

@define('category-filter')
class CategoryFilter extends HTMLElement {
  @event.change('select', value)
  handleCategoryChange(selectedCategory) {
    // Receives the selected option value
    console.log('Selected category:', selectedCategory);
    this.loadCategory(selectedCategory);
  }
}
```

**HTML:**

```html
<category-filter>
  <select>
    <option value="all">All</option>
    <option value="tech">Technology</option>
    <option value="science">Science</option>
  </select>
</category-filter>
```

### Use 3: Textarea Content

Extract content from textarea elements.

```javascript
@define('comment-box')
class CommentBox extends HTMLElement {
  @event.input('textarea', value)
  handleCommentInput(comment) {
    // Receives textarea content
    this.updateCharCount(comment.length);
    this.validateComment(comment);
  }
}
```

### Use 4: Combining with Other Sparks

The `value` spark can be combined with other event sparks.

```javascript
import event, { prevent, value } from '@hive/std/event';

@define('live-preview')
class LivePreview extends HTMLElement {
  @event.keydown('input', value)
  handleKeydown(inputValue) {
    // Get value on every keydown
    this.updatePreview(inputValue);
  }

  @event.submit('form', prevent)
  handleSubmit(evt) {
    const finalValue = value(evt);
    console.log('Final value:', finalValue);
  }
}
```

### Use 5: Range Input (Sliders)

Extract numeric values from range inputs.

```javascript
@define('volume-control')
class VolumeControl extends HTMLElement {
  @event.input('input[type="range"]', value)
  handleVolumeChange(volume) {
    // Receives the range value
    console.log('Volume:', volume);
    this.setVolume(Number(volume));
  }
}
```

## Technical Description

```javascript
function value(event) {
  return event.target.value;
}
```

The function extracts and returns the `value` property from the event's target element. The return type depends on the input element type (string for text inputs, string representation for numbers, etc.).

## Related Sparks

- **[detail](../detail)** - Extracts event.detail from CustomEvents
- **[formData](../formData)** - Converts FormData to plain object
- **[prevent](../prevent)** - Prevents default event action
