# Decorator `@adopted`

The `@adopted` decorator allows a class method to be executed automatically whenever a Custom Element is moved from one document to another (for example, from a main document to an `<iframe>`).

## Installation and Import

The decorator is part of the `@hive/std` package and can be imported as follows:

```javascript
import { adopted } from '@hive/std/directive';
```

## How to Use

Apply the `@adopted` decorator directly to the method you want to execute when the "adoption" event occurs.

```javascript
import { adopted, define } from '@hive/std/directive';

// Define the custom element so it is recognized by the browser
@define('my-element')
class MyElement extends HTMLElement {

  /**
   * The 'onAdopted' method will be invoked automatically
   * when the 'my-element' instance is moved to a new document.
   */
  @adopted
  onAdopted() {
    console.log('Element was moved to another document!');
    // Here you can add logic to reconfigure the component's state,
    // if necessary.
  }
}

// Example of how the event would be triggered:
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const myElementInstance = document.createElement('my-element');
// When moving the element to the iframe's document, the 'adoptedCallback' is fired.
iframe.contentDocument.body.appendChild(myElementInstance);
```

## Description

The `@adopted` decorator serves as a shortcut for the `adoptedCallback` lifecycle hook of Web Components. Its function is to register a method to be executed when the element is "adopted" by a new `document`.

Internally, it uses the `execute` function to safely attach to the element prototype's `adoptedCallback`. This ensures that even if there is other logic in the original `adoptedCallback`, it will be preserved and the method decorated with `@adopted` will be executed in sequence.
