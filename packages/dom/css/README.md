# Template Helper `css`

The `css` is a helper in the format of a *tagged template literal* that converts a CSS template string into a `CSSStyleSheet` instance. It was designed to be used with the `adoptedStyleSheets` API of Web Components, offering a modern and performant way to apply encapsulated styles.

## Installation and Import

This helper is part of the `@hive/std/dom` package and can be imported along with other rendering utilities.

```javascript
import { css } from '@hive/std/dom';
```

## How to Use

You use `css` as a prefix for a template string. Any JavaScript variable or interpolated expression (`${...}`) will be inserted into the final CSS. The result is a `CSSStyleSheet` object that can be added to the `adoptedStyleSheets` array of a component's `shadowRoot`.

### Usage Example with the `@paint` Decorator

The most common way to use the `css` helper is in conjunction with the `@paint` decorator to define a component's styles declaratively.

```javascript
import { define } from '@hive/std/directive';
import { paint, html, css } from '@hive/std/dom';

// 1. Define a function that returns the styles using the `css` tag.
//    Note how we can use JavaScript variables (${...}) to create dynamic styles.
const componentStyle = (el) => {
  const textColor = el.getAttribute('color') || 'black';
  const paddingSize = '1.5rem';

  return css`
    :host {
      display: block;
      font-family: sans-serif;
      color: ${textColor};
      border: 2px solid ${textColor};
      padding: ${paddingSize};
      border-radius: 8px;
    }
  `;
};

// 2. Define the component's HTML template.
const componentHtml = () => html`<p>This is my styled component!</p>`;

// 3. Use @paint to apply the HTML and styles to the class.
@define('my-styled-box')
@paint(componentHtml, componentStyle)
class MyStyledBox extends HTMLElement {
  // @paint takes care of creating the shadowRoot and applying the styles.
}
```

**In HTML:**

```html
<my-styled-box color="crimson"></my-styled-box>
<my-styled-box color="darkblue"></my-styled-box>
```

## Description

The `css` helper is a wrapper for the browser's `CSSStyleSheet` API. It creates a new stylesheet in memory and uses the `replaceSync()` method to fill it with the provided CSS.

The main advantage of using `css` and the `adoptedStyleSheets` API is **performance**. When you adopt a stylesheet, the browser can parse the CSS once and share the same stylesheet instance among multiple components of the same type. This is much more efficient than having a `<style>` tag inside each component instance, which would force the browser to parse and process the same CSS repeatedly.
