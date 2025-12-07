# Decorator `@didPaint`

The `@didPaint` decorator provides a hook to execute logic immediately **after** a component has its content (HTML) and styles (CSS) rendered in the DOM.

## Installation and Import

This decorator is part of the `@hive/std/dom` package and can be imported along with other rendering utilities.

```javascript
import { didPaint } from '@hive/std/dom';
```

## How to Use

Apply the `@didPaint` decorator directly to the class method that should be executed after the component's paint cycle.

### Usage Example

`@didPaint` is extremely useful for tasks that depend on the DOM being fully rendered and "visible" on the screen. This includes:

  - Focusing on an input element.
  - Measuring element dimensions for animations or layout calculations.
  - Integrating with third-party libraries that need a DOM element as a target.

In this example, we use `@didPaint` to automatically focus on an input field as soon as the component is rendered.

```javascript
import { define } from '@hive/std/directive';
import { paint, didPaint, html } from '@hive/std/dom';

const componentHtml = () => html`
  <label for="username">Username:</label>
  <input type="text" id="username" />
`;

@define('auto-focus-input')
@paint(componentHtml)
class AutoFocusInput extends HTMLElement {
  /**
   * This method is invoked by the @didPaint decorator.
   * Since the DOM is already rendered at this point, we can safely
   * query the input and call the .focus() method on it.
   */
  @didPaint
  focusOnInput() {
    const inputElement = this.shadowRoot.querySelector('#username');
    if (inputElement) {
      console.log('Rendering complete, focusing on input...');
      inputElement.focus();
    }
  }
}
```

## Description

The `@didPaint` decorator is a shortcut for the `didPaintCallback`, a custom callback in the `@hive/std/dom` package's rendering lifecycle. It is executed within the component's `connectedCallback`, but is scheduled to run after HTML rendering and style application.

Technically, the logic inside `@didPaint` is executed after `requestAnimationFrame`, ensuring that the browser has already processed the layout and paint, making it the ideal place for interactions that depend on a stable and measurable DOM.
