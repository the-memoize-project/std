<div align="center">

# 🐝 Hive Standard Library

**Build complete web applications using declarative Web Components. No imperative JavaScript required.**

[![npm version](https://img.shields.io/npm/v/@hive/std.svg?style=flat-square)](https://www.npmjs.com/package/@hive/std)
[![npm downloads](https://img.shields.io/npm/dm/@hive/std.svg?style=flat-square)](https://www.npmjs.com/package/@hive/std)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hive/std?style=flat-square&label=minzip)](https://bundlephobia.com/package/@hive/std)
[![CI Status](https://img.shields.io/github/actions/workflow/status/hivejs/std/publish.yml?branch=main&style=flat-square&label=CI)](https://github.com/hivejs/std/actions)
[![Coverage](https://img.shields.io/badge/coverage-97.5%25-brightgreen.svg?style=flat-square)](https://github.com/hivejs/std)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

[**Getting Started**](#-quick-start) · [**Documentation**](#-packages) · [**Examples**](#-showcase) · [**Contributing**](CONTRIBUTING.md)

</div>

---

## 🌟 What is Hive?

**Hive** is a revolutionary framework that enables you to build complete, reactive web applications using nothing but native Web Components and declarative syntax. Just like a beehive, where simple autonomous cells work together to create complex emergent behavior, Hive components communicate through a central message bus to build sophisticated applications.

### ✨ Key Features

- **🎯 Declarative First** - Describe *what* your component does, not *how* it does it
- **⚡ Truly Reactive** - Components automatically respond to state changes
- **📡 Message-Driven** - Built-in event bus for seamless component communication
- **🧩 Zero Dependencies** - Built on native Web APIs (Custom Elements, Shadow DOM)
- **🪶 Lightweight** - Tree-shakeable modules keep your bundle small
- **🎨 Modern DX** - Decorator-based API with TypeScript support
- **🔒 Type Safe** - Full TypeScript definitions included
- **⚙️ Standards-Based** - Works with any framework or vanilla JavaScript

---

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @hive/std

# yarn
yarn add @hive/std

# bun
bun add @hive/std

# pnpm
pnpm add @hive/std
```

### Your First Component

Create a reactive counter in just a few lines:

```javascript
import { define, attributeChanged } from "@hive/std/directive";
import { paint, repaint, html, css } from "@hive/std/dom";
import { event } from "@hive/std/event";

@define("hive-counter")
@paint(template, styles)
class Counter extends HTMLElement {
  #count = 0;

  get count() {
    return this.#count;
  }

  @attributeChanged("count", Number)
  @repaint
  set count(value) {
    this.#count = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.click("button")
  increment() {
    this.count += 1;
  }
}

function template(counter) {
  return html`
    <div class="counter">
      <button>Count: ${counter.count}</button>
      <p>Click the button to increment!</p>
    </div>
  `;
}

function styles(counter) {
  return css`
    .counter {
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 2rem;
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    button:active {
      transform: translateY(0);
    }
  `;
}
```

Now use it anywhere:

```html
<hive-counter count="0"></hive-counter>
```

### 🌐 CDN Usage

Perfect for prototyping or learning:

```javascript
import { define } from "https://esm.sh/@hive/std/directive";
import { paint, html, css } from "https://esm.sh/@hive/std/dom";
import { event } from "https://esm.sh/@hive/std/event";
```

---

## 📦 Packages

Hive is organized into six independent, tree-shakeable packages. Import only what you need:

### 🎯 [@hive/std/directive](packages/directive)

Lifecycle and attribute decorators for Custom Elements.

```javascript
import {
  define,           // Register custom element
  connected,        // connectedCallback
  disconnected,     // disconnectedCallback
  adopted,          // adoptedCallback
  attributeChanged  // attributeChangedCallback
} from "@hive/std/directive";
```

**Features:**
- Wraps Custom Element lifecycle callbacks
- Supports form-associated elements
- Type conversion for attributes
- Clean decorator-based API

[**📖 Learn more →**](packages/directive)

---

### 🎨 [@hive/std/dom](packages/dom)

Rendering and styling decorators with reactive capabilities.

```javascript
import {
  paint,     // Initial render
  repaint,   // Full re-render
  retouch,   // Style-only re-render
  html,      // HTML template tag
  css        // CSS stylesheet factory
} from "@hive/std/dom";
```

**Features:**
- Shadow DOM integration
- Adopted stylesheets for performance
- Reactive template updates
- Lifecycle hooks (willPaint, didPaint)

[**📖 Learn more →**](packages/dom)

---

### 📡 [@hive/std/echo](packages/echo)

Message bus for declarative component communication.

```javascript
import { Echo } from "@hive/std/echo";

class MyComponent extends Echo(HTMLElement) {
  // Now supports 'on' attribute for dataflow
}
```

**Declarative syntax:**

```html
<my-source on="click:my-sink/handleClick"></my-source>
<my-sink></my-sink>
```

**Features:**
- Event-driven architecture
- No direct component coupling
- Supports spark filters (data transformation)
- Bidirectional communication

[**📖 Learn more →**](packages/echo)

---

### ⚡ [@hive/std/spark](packages/spark)

Pure transformation functions for data pipelines.

```javascript
import {
  prop,      // Extract property
  inc,       // Increment
  dec,       // Decrement
  add,       // Add value
  equals,    // Check equality
  truthy,    // Boolean conversion
  len        // Array/string length
  // ... and many more
} from "@hive/std/spark";
```

**Use in pipelines:**

```html
<button on="click:counter/increment|prop=detail.value|inc|truthy"></button>
```

**Features:**
- Pure functions (no side effects)
- Composable via pipe operator
- Works with Echo, @attributeChanged, and @event
- Mathematical, logical, and data operations

[**📖 Learn more →**](packages/spark)

---

### 🎯 [@hive/std/event](packages/event)

Dynamic event listener decorator with automatic lifecycle management.

```javascript
import { event } from "@hive/std/event";

class MyComponent extends HTMLElement {
  // Listen to any event with CSS selectors
  @event.click("button.primary")
  handleClick(event) {
    console.log("Primary button clicked!");
  }

  // Chain with spark filters
  @event.input("input", prop("target.value"), truthy)
  handleInput(value) {
    console.log("Valid input:", value);
  }
}
```

**Features:**
- Works with any DOM event (native or custom)
- Event delegation for performance
- Automatic cleanup (no memory leaks)
- Integrates with spark filters

[**📖 Learn more →**](packages/event)

---

### 🔧 [@hive/std/polyfill](packages/polyfill)

Browser API polyfills for better compatibility.

```javascript
import "@hive/std/polyfill/setImmediate";

setImmediate(() => {
  console.log("Runs asynchronously");
});
```

**Features:**
- `setImmediate` polyfill
- Lightweight implementations
- Automatic detection
- Zero-cost when not needed

[**📖 Learn more →**](packages/polyfill)

---

## 🎭 Showcase

### Real-World Examples

<table>
<tr>
<td width="50%">

#### 🛒 Shopping Cart

```html
<hive-cart>
  <hive-product
    name="T-Shirt"
    price="29.99"
    on="add:cart/addItem">
  </hive-product>

  <hive-cart-summary
    on="cart/itemAdded:summary/update">
  </hive-cart-summary>
</hive-cart>
```

</td>
<td width="50%">

#### 📝 Todo List

```html
<hive-todo-app>
  <hive-input
    on="submit:todos/add|prop=detail.text">
  </hive-input>

  <hive-todo-list
    on="todos/added:list/refresh">
  </hive-todo-list>
</hive-todo-app>
```

</td>
</tr>
<tr>
<td width="50%">

#### 🎨 Theme Switcher

```html
<hive-theme-toggle
  on="change:app/setTheme|prop=detail.theme">
</hive-theme-toggle>

<hive-app
  on="app/themeChanged:*|retouch">
</hive-app>
```

</td>
<td width="50%">

#### 📊 Data Dashboard

```html
<hive-chart
  data-source="/api/stats"
  on="data/loaded:chart/render|prop=detail.data">
</hive-chart>

<hive-refresh-button
  on="click:data/reload">
</hive-refresh-button>
```

</td>
</tr>
</table>

---

## 🤔 Why Hive?

### Comparison with Other Solutions

| Feature | Hive | Lit | React | Vue |
|---------|------|-----|-------|-----|
| **Zero Dependencies** | ✅ | ✅ | ❌ | ❌ |
| **Native Web Components** | ✅ | ✅ | ⚠️ (requires wrapper) | ⚠️ (requires wrapper) |
| **Declarative Events** | ✅ | ❌ | ❌ | ✅ |
| **Built-in Message Bus** | ✅ | ❌ | ❌ | ❌ |
| **No Build Required** | ✅ | ✅ | ❌ | ❌ |
| **Bundle Size** | ~5KB | ~8KB | ~40KB | ~35KB |
| **Framework Agnostic** | ✅ | ✅ | ❌ | ❌ |

### The Hive Philosophy

**Traditional Approach:**
```javascript
// Imperative, tightly coupled
button.addEventListener("click", () => {
  const value = input.value;
  if (value) {
    counter.increment(parseInt(value));
    display.update(counter.value);
  }
});
```

**Hive Approach:**
```html
<!-- Declarative, loosely coupled -->
<hive-button
  on="click:counter/increment|prop=input.value|truthy|Number">
</hive-button>
```

---

## 🗺️ Roadmap

- [x] Core packages (directive, dom, echo, spark, event)
- [x] TypeScript definitions
- [x] Comprehensive test suite
- [ ] Official documentation site
- [ ] Playground/REPL
- [ ] Dev tools browser extension
- [ ] Component library (UI kit)
- [ ] SSR support
- [ ] React/Vue adapter packages
- [ ] CLI for scaffolding

---

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Run tests with coverage
bun run test

# Build for production
bun run build

# Lint and format
biome check .

# Auto-fix issues
biome check --write .
```

### Project Structure

```
hive/std/
├── packages/
│   ├── directive/     # Lifecycle decorators
│   ├── dom/          # Rendering utilities
│   ├── echo/         # Message bus
│   ├── spark/        # Data transformations
│   └── event/        # Event decorators
├── types.d.ts        # TypeScript definitions
├── vite.config.js    # Build configuration
└── vitest.config.js  # Test configuration
```

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, improving docs, or proposing new features, your help makes Hive better.

**Ways to contribute:**
- 🐛 [Report bugs](https://github.com/hivejs/std/issues/new?template=bug_report.md)
- 💡 [Suggest features](https://github.com/hivejs/std/issues/new?template=feature_request.md)
- 📖 [Improve documentation](CONTRIBUTING.md#documentation)
- 🔧 [Submit pull requests](CONTRIBUTING.md#pull-requests)

Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

---

## 📄 License

MIT © Hive Contributors

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Hive is inspired by the principles of:
- **Web Components** - The web platform's native component model
- **Reactive Programming** - Declarative data flow and automatic updates
- **Unix Philosophy** - Small, focused, composable tools
- **Nature** - Emergent complexity from simple autonomous units

---

## 📚 Resources

- **Documentation:** [Coming Soon]
- **Examples:** [EXAMPLES.md](EXAMPLES.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Security:** [SECURITY.md](SECURITY.md)
- **Changelog:** [CHANGELOG.md](CHANGELOG.md)

---

<div align="center">

**Built with ❤️ by the Hive community**

[⭐ Star us on GitHub](https://github.com/hivejs/std) · [🐦 Follow updates](https://twitter.com/hivejs) · [💬 Join discussions](https://github.com/hivejs/std/discussions)

</div>
