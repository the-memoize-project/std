# Decorator `@willPaint`

The `@willPaint` decorator provides a hook to execute logic immediately **before** a component has its content (HTML) and styles (CSS) rendered in the DOM. It's the ideal tool for preparation tasks.

## Installation and Import

This decorator is part of the `@hive/std/dom` package and should be used in components that also use the `@paint` decorator.

```javascript
import { willPaint, paint, html } from '@hive/std/dom';
```

## How to Use

Apply the `@willPaint` decorator directly to the class method that should be executed before the component's paint cycle.

### Usage Example

`@willPaint` is perfect for preparing the component's state before it is visually rendered. A great use case is setting a "loading" attribute, which can be used by CSS styles to show a loading state while the rest of the component (or asynchronous data) is being processed.

In this example, we use `@willPaint` to add an attribute and `@didPaint` to simulate data loading, showing the complete flow.

```javascript
import { define } from '@hive/std/directive';
import { paint, willPaint, didPaint, html, css } from '@hive/std/dom';

const componentHtml = () => html`<div class="content">Loading...</div>`;

// The CSS uses the 'data-loading' attribute to show visual feedback.
const componentCss = () => css`
  :host([data-loading]) .content {
    opacity: 0.5;
    font-style: italic;
  }
`;

@define('async-widget')
@paint(componentHtml, componentCss)
class AsyncWidget extends HTMLElement {
  /**
   * This method is invoked by @willPaint BEFORE rendering.
   * Great for adding initial state.
   */
  @willPaint
  prepare() {
    console.log('1. Preparing to render...');
    this.setAttribute('data-loading', 'true');
  }

  /**
   * This method is invoked by @didPaint AFTER rendering.
   * Ideal for fetching data or manipulating the already rendered DOM.
   */
  @didPaint
  loadData() {
    console.log('2. Rendering complete. Fetching data...');
    setTimeout(() => {
      this.shadowRoot.querySelector('.content').textContent = 'Data loaded!';
      this.removeAttribute('data-loading');
      console.log('3. Data loaded and state finalized.');
    }, 2000);
  }
}
```

## Description

The `@willPaint` decorator is a shortcut for the `willPaintCallback`, a custom callback in the `@hive/std/dom` package's rendering lifecycle. It is invoked by `@paint` at the very beginning of the rendering process, within the `connectedCallback`, but before applying any HTML or CSS.

Unlike `@didPaint` which runs *after* `requestAnimationFrame`, `@willPaint` is triggered **before**, ensuring that any pre-rendering logic occurs in advance and is reflected in the browser's first paint cycle.
