# Decorator `@retouch`

The `@retouch` decorator is a specialized and more performant version of `@repaint`. It was designed to trigger an update **only in the styles** of a component in response to a state change, without rebuilding its DOM.

## Installation and Import

This decorator is part of the `@hive/std/dom` package and should be used in components that already use `@paint`.

```javascript
import { retouch, paint, html, css } from '@hive/std/dom';
```

## How to Use

Apply the `@retouch` decorator to a setter or method that modifies a property used **exclusively** in your component's styles function (the function that uses the `css` helper).

### Usage Example

In this example, we have a button whose `background-color` is controlled by the `statusColor` property. Since the color change affects only the CSS and not the HTML structure, `@retouch` is the perfect and most efficient choice.

```javascript
import { define } from '@hive/std/directive';
import { retouch, paint, html, css } from '@hive/std/dom';

// The component's CSS is dynamic and depends on the 'statusColor' property.
const statusCss = (el) => css`
  button {
    background-color: ${el.statusColor};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
`;

// The HTML is static.
const statusHtml = () => html`<button>Save</button>`;

@define('status-button')
@paint(statusHtml, statusCss)
class StatusButton extends HTMLElement {
  private _statusColor = 'gray'; // Initial color

  get statusColor() {
    return this._statusColor;
  }

  // @retouch ensures that when changing the color, only the CSS function
  // will be re-executed, which is much faster than re-rendering the HTML.
  @retouch
  set statusColor(newColor) {
    this._statusColor = newColor;
  }
  
  connectedCallback() {
    // Simulates a state change after 2 seconds
    setTimeout(() => {
      this.statusColor = 'green'; // This triggers @retouch
    }, 2000);
  }
}
```

## When to Prefer `@retouch` Over `@repaint`?

This is the most important question. The correct choice can bring significant performance gains.

  - **Use `@retouch` when:** The state change affects **only the visual appearance** of the component, controlled by CSS.

      - **Examples:** Changing a color, a font size, visibility with `display: none`, or toggling a class that modifies styles.
      - **Advantage:** It's much faster, as it avoids DOM manipulation (doesn't rebuild HTML), only updates the adopted styles.

  - **Use `@repaint` when:** The state change affects the **HTML structure** of the component.

      - **Examples:** Adding or removing items from a list, changing the text of a paragraph, or conditionally showing/hiding elements in the template.
      - **Necessity:** Since the HTML needs to be rebuilt to reflect the new data, a complete new "paint" is necessary.

**Golden rule:** If the property you're changing is only used within your `css` function, use `@retouch`. If it's used within your `html` function, use `@repaint`.

## Description

The `@retouch` decorator intercepts the execution of a method or setter. After executing the original logic, it checks if the component has already been rendered (`isPainted = true`) and, if so, it re-executes **only** the `cssCallback` defined in `@paint`, reapplying the new styles. It intentionally ignores the `htmlCallback` to optimize the update.
