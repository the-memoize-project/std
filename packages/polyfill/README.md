# @hive/std/polyfill

> Browser API polyfills for better compatibility

## Overview

The **polyfill** package provides lightweight polyfills for modern browser APIs that may not be available in all environments. Automatically detects missing APIs and provides fallback implementations.

## Purpose

Ensure your Hive applications work across all environments:

- **Zero-cost** - Only loads when API is missing
- **Lightweight** - Minimal implementations
- **Automatic** - Just import and forget
- **Standards-compliant** - Follows spec behavior

## Installation

```bash
npm install @hive/std
```

## Quick Start

```javascript
// Import polyfill at app entry point
import "@hive/std/polyfill/setImmediate";

// Now use setImmediate anywhere
setImmediate(() => {
  console.log("This runs asynchronously");
});
```

---

## Available Polyfills

### setImmediate

Polyfill for `setImmediate` API (not natively supported in most browsers).

**Import:**
```javascript
import "@hive/std/polyfill/setImmediate";
```

**Usage:**
```javascript
setImmediate(() => {
  console.log("Executed asynchronously");
});

// With arguments
setImmediate((arg1, arg2) => {
  console.log(arg1, arg2);
}, "hello", "world");
```

**Why setImmediate?**

`setImmediate` executes a function after the current event loop iteration, making it ideal for:
- Deferring non-critical operations
- Preventing UI blocking
- Implementing async middleware (see `@around` decorator)

**Implementation:**

Falls back to `setTimeout(fn, 0)` when native `setImmediate` is unavailable:

```javascript
if (typeof globalThis.setImmediate !== "function") {
  Reflect.defineProperty(globalThis, "setImmediate", {
    value(fn) {
      return setTimeout(fn, 0);
    },
  });
}
```

---

## Usage Examples

### Example 1: Defer Heavy Operations

```javascript
import "@hive/std/polyfill/setImmediate";

class DataProcessor {
  processLargeDataset(data) {
    // Process in chunks to avoid blocking
    const chunkSize = 100;

    for (let i = 0; i < data.length; i += chunkSize) {
      setImmediate(() => {
        const chunk = data.slice(i, i + chunkSize);
        this.processChunk(chunk);
      });
    }
  }

  processChunk(chunk) {
    // Process chunk
  }
}
```

### Example 2: Non-Blocking Rendering

```javascript
import "@hive/std/polyfill/setImmediate";
import { define } from "@hive/std/directive";

@define("progressive-list")
class ProgressiveList extends HTMLElement {
  renderItems(items) {
    // Render items progressively
    items.forEach((item, index) => {
      setImmediate(() => {
        this.renderItem(item);
      });
    });
  }

  renderItem(item) {
    const el = document.createElement("div");
    el.textContent = item;
    this.appendChild(el);
  }
}
```

---

## API Reference

### setImmediate(callback, ...args)

Executes a function asynchronously after the current event loop.

**Parameters:**
- `callback` (Function) - Function to execute
- `...args` - Arguments to pass to callback

**Returns:** Timeout ID (can be used with clearTimeout)

**Behavior:**
- Defers execution to next event loop iteration
- Does not block current execution
- Arguments are passed to callback

---

## Performance Characteristics

### setImmediate vs setTimeout

| Feature | setImmediate | setTimeout(fn, 0) |
|---------|--------------|-------------------|
| **Minimum delay** | ~0ms | ~4ms (browser throttling) |
| **Priority** | Higher | Lower |
| **Use case** | Defer to next tick | Schedule with delay |

**Note:** Since this polyfill uses `setTimeout`, it inherits setTimeout's characteristics in non-native environments.

---

## Browser Support

### Native Support

- **Node.js**: ✅ Native
- **IE10+**: ✅ Native
- **Modern Browsers**: ❌ Not native (polyfill activates)

### Polyfill Support

Works in all JavaScript environments that support `setTimeout`:
- All modern browsers
- Node.js
- React Native
- Electron
- Web Workers

---

## Best Practices

### 1. Import Early

```javascript
// Good - Import at app entry
// main.js
import "@hive/std/polyfill/setImmediate";
import "./app";

// Bad - Import in individual modules
// component.js
import "@hive/std/polyfill/setImmediate"; // Repeated imports
```

### 2. Use for Non-Critical Operations

```javascript
// Good - Defer non-critical work
setImmediate(() => {
  sendAnalytics(data);
});
processUserInput(); // Immediate

// Bad - Don't defer critical operations
setImmediate(() => {
  validateUserInput(); // Should be immediate!
});
```

### 3. Batch Operations

```javascript
// Good - Batch deferred operations
const operations = [];
data.forEach(item => {
  operations.push(() => process(item));
});

setImmediate(() => {
  operations.forEach(op => op());
});

// Bad - Too many setImmediate calls
data.forEach(item => {
  setImmediate(() => process(item)); // Overhead
});
```

---

## When to Use

**Use setImmediate when:**
- Deferring non-critical operations
- Preventing UI blocking
- Implementing async patterns
- Breaking up long-running tasks

**Don't use setImmediate when:**
- Operation is time-critical
- Immediate execution required
- Coordinating with requestAnimationFrame
- Exact timing is important

---

## Future Polyfills

More polyfills may be added in future versions:

- `requestIdleCallback` - Run during idle periods
- `queueMicrotask` - Queue microtask
- `AbortController` - For older browsers
- `ResizeObserver` - Observe element size changes

---

## Related Packages

- **[@hive/std/directive](../directive)** - Lifecycle decorators

---

## Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md).

---

**Part of the Hive Standard Library** 🐝
