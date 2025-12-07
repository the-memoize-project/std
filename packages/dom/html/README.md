# Template Helper `html`

The `html` helper is a *tagged template literal* designed to build HTML strings in a declarative and readable way. It's the recommended tool for defining the DOM structure of your Web Components in the `@hive/std` ecosystem.

## Installation and Import

This helper is part of the `@hive/std/dom` package and is usually used in conjunction with the `@paint` decorator.

```javascript
import { html } from '@hive/std/dom';
```

## How to Use

You use `html` as a prefix for a template string. Interpolated JavaScript expressions (`${...}`) will be inserted into the final HTML. One of the great advantages is its native ability to handle arrays, making list rendering very simple.

### Usage Example with the `@paint` Decorator

The most effective way to use `html` is by defining your component's structure in a function and applying it with the `@paint` decorator.

```javascript
import { define } from '@hive/std/directive';
import { paint, html } from '@hive/std/dom';

// 1. Define a function that returns the component's HTML using the `html` tag.
const shoppingListHtml = (el) => {
  const title = el.getAttribute('list-title') || 'My Shopping List';
  const items = [
    { id: 1, name: 'Apples', done: true },
    { id: 2, name: 'Milk', done: false },
    { id: 3, name: 'Bread', done: false },
  ];

  return html`
    <h3>${title}</h3>
    <ul>
      ${items.map(item =>
        html`<li class="${item.done ? 'done' : ''}">${item.name}</li>`
      )}
    </ul>
  `;
};

// 2. Use @paint to apply the HTML template to the component class.
@define('shopping-list')
@paint(shoppingListHtml)
class ShoppingList extends HTMLElement {
  // @paint takes care of creating the shadowRoot and inserting this HTML.
}
```

**In HTML:**

```html
<shopping-list list-title="Home Tasks"></shopping-list>
```

## Description

The `html` helper works as a function that receives the string fragments and interpolated values from your template. It uses `String.raw` to process and concatenate everything into a single HTML string.

Its main benefit is code readability and maintainability. Writing complex HTML with multiple variables becomes much easier and less error-prone than manual string concatenation.

It's important to note that, in its current version, the `html` helper focuses only on value concatenation and **does not perform HTML sanitization**. For security, avoid passing untrusted or user-generated data directly to the template to prevent Cross-Site Scripting (XSS) vulnerabilities.
