# Counter Example

A simple reactive counter demonstrating @hive/std's decorator-based API.

## Features

- ✅ Reactive state with `@repaint`
- ✅ Attribute observation with `@attributeChanged`
- ✅ Declarative event handling with `@event`
- ✅ Shadow DOM encapsulation
- ✅ CSS-in-JS with adopted stylesheets

## Running the Example

1. **Using a local server:**

```bash
# From project root
cd examples/counter
python3 -m http.server 8080
# or
npx serve
```

2. **Open in browser:**

Navigate to `http://localhost:8080`

## Code Walkthrough

### Component Definition

```javascript
@define("hive-counter")
@paint(template, styles)
class Counter extends HTMLElement {
  // ...
}
```

- `@define` registers the custom element
- `@paint` handles initial rendering with template and styles

### Reactive State

```javascript
@attributeChanged("count", Number)
@repaint
set count(value) {
  this.#count = value;
}
```

- `@attributeChanged` observes the `count` attribute
- `@repaint` triggers re-render when count changes
- Type conversion automatically applied (Number)

### Event Handling

```javascript
@event.click(".btn-increment")
increment() {
  this.count += 1;
}
```

- `@event` decorator with CSS selector
- Automatic event delegation
- No manual listener management

## Key Concepts

1. **Declarative**: Describe what the component does, not how
2. **Reactive**: State changes automatically update the UI
3. **Encapsulated**: Shadow DOM provides style and markup isolation
4. **Type-safe**: TypeScript definitions included

## Next Steps

- Try the [Todo List example](../todo-list) for component communication
- Check out [Theme Switcher](../theme-switcher) for performance patterns
- Read the [full documentation](../../README.md)
