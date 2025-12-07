# Complete Examples

> **Real-world applications demonstrating the full power of @hive/std architecture**

## Table of Contents

1. [Todo Application](#1-todo-application) - Complete CRUD with state management
2. [Real-Time Dashboard](#2-real-time-dashboard) - Echo dataflow and reactive updates  
3. [Theme Switcher](#3-theme-switcher) - Performance optimization with @retouch
4. [Form Wizard](#4-form-wizard) - Multi-step forms with validation

---

## 1. Todo Application

**Demonstrates:** Component composition, reactive state, event handling, localStorage

### Architecture

```
todo-app (parent)
├── todo-input (creates new todos)
├── todo-list (renders list)
│   └── todo-item (×N individual todos)
└── todo-stats (shows counts)
```

**See Full Implementation:** [/examples/todo-app/](./examples/todo-app/)

**Key Takeaways:**
- `@repaint` triggers UI updates on state changes
- `@event` eliminates manual listener management
- Custom events enable parent-child communication
- LocalStorage persistence with lifecycle hooks

---

## 2. Real-Time Dashboard

**Demonstrates:** Echo dataflow, spark pipelines, performance optimization

### Dataflow Architecture

```
data-source
    │ (emits sensor-data events)
    ↓
metric-card (on="*/sensor-data:setter/value|prop=detail.temperature")
    │ (prop spark extracts temperature)
    ↓
value setter → UI update (via @repaint)
```

**Code Snippet:**

```html
<data-source></data-source>

<metric-card
  label="Temperature" 
  unit="°C"
  threshold="25"
  on="*/sensor-data:setter/value|prop=detail.temperature">
</metric-card>
```

**Performance Pattern:**
- `@repaint` for value changes (updates entire card)
- `@retouch` for status color changes (CSS only)

**See Full Implementation:** [/examples/dashboard/](./examples/dashboard/)

---

## 3. Theme Switcher

**Demonstrates:** Performance optimization: when to use @retouch vs @repaint

### The Problem

Changing theme colors shouldn't rebuild the DOM, only update CSS.

### The Solution

```javascript
@define('theme-button')
@paint(buttonHtml, buttonCss)
class ThemeButton extends HTMLElement {
  private _theme = 'light';

  get theme() { return this._theme; }

  // ✅ Use @retouch - only CSS changes
  @retouch
  set theme(value) {
    this._theme = value;
  }

  // ❌ Don't use @repaint - would rebuild HTML unnecessarily
}
```

### CSS Function

```javascript
const buttonCss = (el) => css`
  button {
    background: ${el.theme === 'dark' ? '#333' : '#fff'};
    color: ${el.theme === 'dark' ? '#fff' : '#333'};
  }
`;
```

**Performance Impact:**
- `@retouch`: ~0.5ms (applies new stylesheet)
- `@repaint`: ~5ms+ (rebuilds DOM + applies stylesheet)

**See Full Implementation:** [/examples/theme-switcher/](./examples/theme-switcher/)

---

## 4. Form Wizard

**Demonstrates:** Form-associated elements, multi-step UX, validation

### Custom Form Input

```javascript
@define('wizard-input')
class WizardInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  @formReset
  handleReset() {
    this.value = this.defaultValue;
    this.internals.setFormValue(this.value);
  }

  @formDisabled
  handleDisabled(disabled) {
    this.input.disabled = disabled;
  }

  @formStateRestore
  handleStateRestore(state, mode) {
    this.value = state;
  }
}
```

### Wizard Controller

```javascript
@define('form-wizard')
@paint(wizardHtml, wizardCss)
class FormWizard extends HTMLElement {
  @repaint
  set currentStep(value) {
    this._currentStep = value;
    this.updateActiveStep();
  }

  get progress() {
    return ((this.currentStep + 1) / this.totalSteps) * 100;
  }

  @event.click('.next')
  async goNext() {
    if (await this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  async validateCurrentStep() {
    const form = this.getCurrentForm();
    return form.checkValidity();
  }
}
```

**See Full Implementation:** [/examples/form-wizard/](./examples/form-wizard/)

---

## Pattern Recipes

### Recipe 1: Counter Button

```javascript
@define('counter-btn')
@paint(html`<button>Count: ${el => el.count}</button>`)
class CounterBtn extends HTMLElement {
  private _count = 0;

  @repaint
  set count(v) { this._count = v; }
  get count() { return this._count; }

  @event.click('button')
  increment() { this.count++; }
}
```

**Usage:** `<counter-btn></counter-btn>`

---

### Recipe 2: Echo Dataflow

```javascript
// Publisher
@event.click('button')
publishValue() {
  this.dispatchEvent(new CustomEvent('value-changed', {
    detail: { value: this.value },
    bubbles: true
  }));
}

// Subscriber (HTML)
```html
<subscriber-component on="*/value-changed:setter/data|prop=detail.value|inc"></subscriber-component>
```

**Flow:** event → prop spark (extract value) → inc spark (+1) → setter

---

### Recipe 3: Reactive Form Input

```javascript
@define('reactive-input')
@paint(inputHtml)
class ReactiveInput extends HTMLElement {
  static formAssociated = true;

  @attributeChanged('value')
  @repaint
  set value(v) {
    this._value = v;
    this.internals.setFormValue(v);
  }

  @event.input('input')
  handleInput(e) {
    this.value = e.target.value;
  }
}
```

---

## Learn More

- [Glossary](./GLOSSARY.md) - All concepts explained
- [Architecture](./ARCHITECTURE.md) - Design patterns
- [API Reference](./API.md) - Complete API docs
- [Package Guides](./packages/README.md) - Per-package documentation
