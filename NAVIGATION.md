# Navigation Guide

> **Your roadmap to mastering @hive/std - A complete knowledge graph**

## 🎯 Quick Start Paths

### I'm brand new to Hive
1. Start with [README](./README.md) - Project overview
2. Read [GLOSSARY](./GLOSSARY.md) - Understand core concepts
3. Follow [Todo App Example](./EXAMPLES.md#1-todo-application)
4. Explore [Architecture](./ARCHITECTURE.md)

### I want to build components
1. [`@define`](./packages/directive/define/README.md) - Register your component
2. [`@paint`](./packages/dom/paint/README.md) - Add HTML & CSS
3. [`@repaint`](./packages/dom/repaint/README.md) - Make it reactive
4. [`@event`](./packages/event/README.md) - Handle user interactions

### I need component communication
1. [Echo Mixin](./packages/echo/README.md) - Understand dataflow
2. [Spark Functions](./packages/spark/README.md) - Data transformers
3. [Dashboard Example](./EXAMPLES.md#2-real-time-dashboard)

### I'm working with forms
1. [`@formAssociated`](./packages/directive/formAssociated/README.md) - Connect to forms
2. [`@formReset`](./packages/directive/formReset/README.md) - Handle reset
3. [`@formDisabled`](./packages/directive/formDisabled/README.md) - Handle disabled state
4. [Form Wizard Example](./EXAMPLES.md#4-form-wizard)

---

## 📚 Core Documentation

### Essential Reading
- [README.md](./README.md) - Project introduction and quick start
- [GLOSSARY.md](./GLOSSARY.md) - Complete terminology reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Design patterns and philosophy
- [EXAMPLES.md](./EXAMPLES.md) - Complete working applications
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [CHANGELOG.md](./CHANGELOG.md) - Version history

---

## 📦 Package Index

### Core Packages

#### [@hive/std/directive](./packages/directive/README.md)
**Lifecycle and attribute decorators**

##### Component Definition
- [`@define`](./packages/directive/define/README.md) - Register Custom Element ⭐

##### Lifecycle Hooks
- [`@connected`](./packages/directive/connected/README.md) - Element added to DOM
- [`@disconnected`](./packages/directive/disconnected/README.md) - Element removed from DOM
- [`@adopted`](./packages/directive/adopted/README.md) - Element moved to new document

##### Attribute Management
- [`@attributeChanged`](./packages/directive/attributeChanged/README.md) - React to attribute changes ⭐

##### Form Integration
- [`@formAssociated`](./packages/directive/formAssociated/README.md) - Get form reference
- [`@formReset`](./packages/directive/formReset/README.md) - Handle form reset
- [`@formDisabled`](./packages/directive/formDisabled/README.md) - Handle disabled state
- [`@formStateRestore`](./packages/directive/formStateRestore/README.md) - Restore form state

---

#### [@hive/std/dom](./packages/dom/README.md)
**Rendering and styling decorators**

##### Core Rendering
- [`@paint`](./packages/dom/paint/README.md) - Initial render (HTML + CSS) ⭐
- [`@repaint`](./packages/dom/repaint/README.md) - Full re-render on state change ⭐
- [`@retouch`](./packages/dom/retouch/README.md) - Style-only re-render (performance) ⭐

##### Rendering Lifecycle
- [`@willPaint`](./packages/dom/willPaint/README.md) - Before render hook
- [`@didPaint`](./packages/dom/didPaint/README.md) - After render hook

##### Template Helpers
- [`html`](./packages/dom/html/README.md) - HTML template tag ⭐
- [`css`](./packages/dom/css/README.md) - CSS template tag ⭐

---

#### [@hive/std/echo](./packages/echo/README.md)
**Declarative dataflow and component communication** ⭐

**Key Concept:** Components communicate through events without direct coupling

**Related:**
- [Spark package](./packages/spark/README.md) - Data transformers
- [Event package](./packages/event/README.md) - DOM events
- [Dashboard Example](./EXAMPLES.md#2-real-time-dashboard)

---

#### [@hive/std/spark](./packages/spark/README.md)
**Pure transformation functions for dataflow pipelines**

##### Mathematical Operations
- [`add`](./packages/spark/add/README.md) - Addition
- [`subtract`](./packages/spark/subtract/README.md) - Subtraction
- [`inc`](./packages/spark/inc/README.md) - Increment by 1
- [`dec`](./packages/spark/dec/README.md) - Decrement by 1

##### Comparison Functions
- [`equals`](./packages/spark/equals/README.md) - Equality check
- [`different`](./packages/spark/different/README.md) - Inequality check
- [`gt`](./packages/spark/gt/README.md) - Greater than
- [`gte`](./packages/spark/gte/README.md) - Greater than or equal
- [`lt`](./packages/spark/lt/README.md) - Less than
- [`lte`](./packages/spark/lte/README.md) - Less than or equal

##### Logic Operations
- [`not`](./packages/spark/not/README.md) - Boolean negation
- [`truthy`](./packages/spark/truthy/README.md) - HTML boolean convention
- [`always`](./packages/spark/always/README.md) - Replace with constant

##### Data Access
- [`prop`](./packages/spark/prop/README.md) - Extract nested property ⭐
- [`len`](./packages/spark/len/README.md) - Get length

---

#### [@hive/std/event](./packages/event/README.md)
**Dynamic DOM event handling decorator** ⭐

**Key Concept:** `@event.eventName(selector, ...filters)` - Proxy-based API

---

## 🗺️ Concept Map

### Component Lifecycle Flow

```
1. Class Definition
   ↓
   @define('my-element') ← Register with browser
   ↓
2. Element Created (constructor runs)
   ↓
3. Connected to DOM
   ↓
   @connected ← Your initialization logic
   @willPaint ← Pre-render setup
   @paint ← Render HTML + CSS
   @didPaint ← Post-render logic
   ↓
4. Attribute Changes
   ↓
   @attributeChanged ← React to changes
   @repaint ← Re-render if needed
   ↓
5. User Interactions
   ↓
   @event ← Handle DOM events
   ↓
6. Disconnected from DOM
   ↓
   @disconnected ← Cleanup
```

### Dataflow Architecture

```
Source Component
    │
    ├── Dispatches CustomEvent
    │
    ↓
Echo Event Bus
    │
    ├── Routes to listening components
    │   via `on` attribute
    │
    ↓
Spark Pipeline
    │
    ├── prop (extract data)
    ├── inc (transform)
    ├── equals (filter)
    │
    ↓
Sink Component
    │
    └── Setter/Method called
        └── @repaint triggers UI update
```

### Rendering Decision Tree

```
Need to update UI?
│
├─ Initial render? → @paint
│
├─ State changed?
│   ├─ HTML structure changed? → @repaint
│   └─ Only styles changed? → @retouch (faster!)
│
├─ Need logic before render? → @willPaint
│
└─ Need logic after render? → @didPaint
```

---

## 🎨 Pattern Library

### Pattern: Reactive Counter
```javascript
@define('counter-btn')
@paint(html`<button>Count: ${el => el.count}</button>`)
class CounterBtn extends HTMLElement {
  @repaint
  set count(v) { this._count = v; }

  @event.click('button')
  increment() { this.count++; }
}
```

**Uses:**
- [`@define`](./packages/directive/define/README.md)
- [`@paint`](./packages/dom/paint/README.md)
- [`@repaint`](./packages/dom/repaint/README.md)
- [`@event`](./packages/event/README.md)
- [`html`](./packages/dom/html/README.md)

---

### Pattern: Echo Dataflow
```html
<!-- Publisher -->
<data-source></data-source>

<!-- Subscriber with transformation pipeline -->
<data-display on="*/data-updated:setter/value|prop=detail.data|inc"></data-display>
```

**Uses:**
- [Echo mixin](./packages/echo/README.md)
- [`prop` spark](./packages/spark/prop/README.md)
- [`inc` spark](./packages/spark/inc/README.md)

---

### Pattern: Form-Associated Input
```javascript
@define('custom-input')
class CustomInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    this.internals = this.attachInternals();
  }

  @formReset
  handleReset() { /* reset to default */ }

  @formDisabled
  handleDisabled(disabled) { /* update UI */ }
}
```

**Uses:**
- [`@define`](./packages/directive/define/README.md)
- [`@formReset`](./packages/directive/formReset/README.md)
- [`@formDisabled`](./packages/directive/formDisabled/README.md)

---

## 🔍 Find By Use Case

### State Management
- Reactive updates → [`@repaint`](./packages/dom/repaint/README.md)
- Style-only updates → [`@retouch`](./packages/dom/retouch/README.md)
- Attribute observation → [`@attributeChanged`](./packages/directive/attributeChanged/README.md)

### Component Communication
- Event bus → [Echo mixin](./packages/echo/README.md)
- Data transformation → [Spark functions](./packages/spark/README.md)
- DOM events → [`@event`](./packages/event/README.md)

### Performance Optimization
- Shared stylesheets → [`css` helper](./packages/dom/css/README.md)
- Avoid re-rendering DOM → [`@retouch`](./packages/dom/retouch/README.md)
- Event delegation → [`@event`](./packages/event/README.md)

### Form Integration
- Connect to form → [`@formAssociated`](./packages/directive/formAssociated/README.md)
- Handle reset → [`@formReset`](./packages/directive/formReset/README.md)
- Handle disabled → [`@formDisabled`](./packages/directive/formDisabled/README.md)
- State restoration → [`@formStateRestore`](./packages/directive/formStateRestore/README.md)

---

## 📖 Learning Paths

### Beginner Path (2-3 hours)
1. Read [README](./README.md) (10 min)
2. Study [GLOSSARY](./GLOSSARY.md) (30 min)
3. Build [Counter Button](#pattern-reactive-counter) (30 min)
4. Complete [Todo App](./EXAMPLES.md#1-todo-application) (60 min)

### Intermediate Path (4-5 hours)
1. Complete Beginner Path
2. Study [Echo dataflow](./packages/echo/README.md) (30 min)
3. Learn [Spark functions](./packages/spark/README.md) (30 min)
4. Build [Dashboard](./EXAMPLES.md#2-real-time-dashboard) (90 min)
5. Read [Architecture](./ARCHITECTURE.md) (60 min)

### Advanced Path (8-10 hours)
1. Complete Intermediate Path
2. Study [Form APIs](./packages/directive/formAssociated/README.md) (60 min)
3. Performance optimization with [`@retouch`](./packages/dom/retouch/README.md) (30 min)
4. Build [Form Wizard](./EXAMPLES.md#4-form-wizard) (120 min)
5. Contribute to [project](./CONTRIBUTING.md) (ongoing)

---

## ⭐ Most Important Concepts

If you only learn 5 things, learn these:

1. **[`@define`](./packages/directive/define/README.md)** - Register components
2. **[`@paint`](./packages/dom/paint/README.md)** - Render UI
3. **[`@repaint`](./packages/dom/repaint/README.md)** - Make it reactive
4. **[Echo mixin](./packages/echo/README.md)** - Component communication
5. **[`@event`](./packages/event/README.md)** - Handle user input

These 5 concepts cover 90% of everyday usage.

---

## 🆘 Troubleshooting

### "My component doesn't render"
1. Did you use `@define`? → [Guide](./packages/directive/define/README.md)
2. Did you use `@paint`? → [Guide](./packages/dom/paint/README.md)
3. Are your `html`/`css` functions defined? → [HTML](./packages/dom/html/README.md), [CSS](./packages/dom/css/README.md)

### "State changes don't update UI"
1. Did you use `@repaint` on your setter? → [Guide](./packages/dom/repaint/README.md)
2. Is your `html` function using the latest state? → Check it references `el.propertyName`

### "Echo dataflow not working"
1. Does your source dispatch events with `bubbles: true`? → [Guide](./packages/echo/README.md)
2. Is your `on` attribute syntax correct? → Format: `source/event:type/sink|spark`
3. Did you extend `Echo(HTMLElement)`? → Required for subscribers

### "Performance issues"
1. Using `@repaint` when you should use `@retouch`? → [Performance guide](./packages/dom/retouch/README.md)
2. Re-creating CSS functions on every render? → Create once, reuse
3. Too many event listeners? → Use `@event` with delegation

---

## 📞 Get Help

- [GitHub Issues](https://github.com/anthropics/hive-std/issues)
- [Discussions](https://github.com/anthropics/hive-std/discussions)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Last Updated:** 2025-01
**Hive Version:** 1.0.0
