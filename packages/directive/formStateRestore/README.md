# Decorator `@formStateRestore`

The `@formStateRestore` decorator provides a hook for when the browser attempts to restore the state of a Custom Element associated with a form. This usually happens when the user navigates forward and backward in the browser history.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { formStateRestore } from '@hive/std/directive';
```

## How to Use

Like other form decorators, `@formStateRestore` requires the class to have `static formAssociated = true` and for `this.attachInternals()` to be called.

The decorated method will receive two arguments passed by the browser:

  - **`state`**: The state to be restored. Can be a string, a `File`, or a `FormDataEntry`, depending on how it was defined with `ElementInternals.setFormValue()`.
  - **`mode`**: A string that can be `"restore"` (history navigation) or `"autocomplete"` (browser autocomplete).

### Usage Example

In this example, we create a custom field that saves its state through `setFormValue` and restores it when the `formStateRestoreCallback` is triggered by the browser.

```javascript
import { formStateRestore, define } from '@hive/std/directive';

@define('state-aware-input')
class StateAwareInput extends HTMLElement {
  // Prerequisites for form association
  static formAssociated = true;
  private internals: ElementInternals;
  private input: HTMLInputElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<input type="text" placeholder="Type something...">`;
    this.input = this.querySelector('input');

    // Whenever the value changes, we inform the forms API
    // so it can save it in the history.
    this.input.addEventListener('input', () => {
      this.internals.setFormValue(this.input.value);
    });
  }

  /**
   * This method is invoked by the @formStateRestore decorator.
   * It receives the saved state and the restoration mode.
   */
  @formStateRestore
  handleFormStateRestore(state: string, mode: 'restore' | 'autocomplete') {
    console.log(`Restoring state! Mode: ${mode}, Value: ${state}`);

    // Applies the restored value back to our input.
    this.input.value = state;
  }
}
```

## Description

The `@formStateRestore` decorator is a shortcut for the `formStateRestoreCallback(state, mode)` lifecycle method. This callback is the final part of the *Form-associated Custom Elements* API and is crucial to ensuring your custom components behave like native ones in history navigation scenarios.

When a user fills out a form, navigates to another page, and then clicks "Back", the browser tries to restore the values they entered. The `@formStateRestore` allows your component to participate in this process, receiving the saved value (`state`) and applying it again, significantly improving the user experience.
