# Decorator `@formReset`

The `@formReset` decorator provides a hook to execute specific logic when the form associated with a Custom Element is reset.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { formReset } from '@hive/std/directive';
```

## How to Use

Like other form decorators, `@formReset` requires the Custom Element class to have the static property `formAssociated` set to `true` and for `this.attachInternals()` to be called in the constructor.

The method decorated with `@formReset` is the ideal place to restore your component's internal state to its initial values.

### Usage Example

In this example, we create a custom text field that, when reset by the form, returns to its original value instead of simply becoming blank.

```javascript
import { formReset, define } from '@hive/std/directive';

@define('resettable-input')
class ResettableInput extends HTMLElement {
  // Prerequisites for form association
  static formAssociated = true;
  private internals: ElementInternals;
  private input: HTMLInputElement;
  private initialValue: string = '';

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<input type="text">`;
    this.input = this.querySelector('input');
  }

  // Saves the initial value when the component enters the DOM
  connectedCallback() {
    this.initialValue = this.getAttribute('value') || '';
    this.input.value = this.initialValue;
  }

  /**
   * This method is invoked by the @formReset decorator when
   * the parent <form> triggers the reset event.
   */
  @formReset
  handleFormReset() {
    console.log('Form reset! Restoring value to:', this.initialValue);
    // Restores the input value to the initial state
    this.input.value = this.initialValue;
    // Updates the internal form value
    this.internals.setFormValue(this.input.value);
  }
}
```

**In HTML:**

```html
<form>
  <resettable-input value="Default Value"></resettable-input>
  <button type="reset">Reset Form</button>
</form>
```

When clicking the "Reset Form" button, the `handleFormReset` method will be called.

## Description

The `@formReset` decorator is a shortcut for the `formResetCallback()` lifecycle method. This callback is part of the *Form-associated Custom Elements* API and is invoked to notify the component that it should restore its state.

The main utility of this decorator is to allow your components to behave like native form elements, clearing or restoring their values to a default state when the user triggers the form's reset action. The decorator manages the call to your method safely and predictably, without the need to implement `formResetCallback` manually.
