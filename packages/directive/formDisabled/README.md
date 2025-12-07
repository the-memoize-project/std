# Decorator `@formDisabled`

The `@formDisabled` decorator provides a hook to react when the "disabled" state of a Custom Element is changed by its parent form.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { formDisabled } from '@hive/std/directive';
```

## How to Use

Like other form-related decorators, `@formDisabled` requires your Custom Element class to have the static property `formAssociated` set to `true` and for `this.attachInternals()` to be called in the constructor.

The method decorated with `@formDisabled` will automatically receive a boolean argument indicating the new state (`true` for disabled, `false` for enabled).

### Usage Example

In this example, we create a custom button that changes its appearance and behavior when its `disabled` state is modified by the form (for example, when placed inside a `<fieldset disabled>`).

```javascript
import { formDisabled, define } from '@hive/std/directive';

@define('my-submit-button')
class MySubmitButton extends HTMLElement {
  // Prerequisites for form association
  static formAssociated = true;
  private internals: ElementInternals;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<button type="submit">Submit</button>`;
    this.button = this.querySelector('button');
  }

  /**
   * This method is invoked by the @formDisabled decorator.
   * The 'disabled' argument (true or false) is passed automatically.
   */
  @formDisabled
  handleDisabledState(disabled: boolean) {
    console.log(`The component was ${disabled ? 'disabled' : 'enabled'}.`);

    // Passes the 'disabled' state to the internal button so
    // it looks and behaves like a native disabled button.
    this.button.disabled = disabled;
  }
}
```

**In HTML:**

```html
<form>
  <fieldset id="my-fieldset">
    <my-submit-button></my-submit-button>
  </fieldset>
</form>

<script>
  // When disabling the fieldset, handleDisabledState(true) will be called.
  document.getElementById('my-fieldset').disabled = true;
</script>
```

## Description

The `@formDisabled` decorator is a shortcut for the `formDisabledCallback(disabled)` lifecycle method. This callback is part of the *Form-associated Custom Elements* API and is invoked whenever the element's `disabled` state changes due to interaction with its parent form.

The main utility of this decorator is to allow your component to synchronize its internal appearance and functionality with the form's disabled state, ensuring a consistent and accessible user experience. The decorator manages the call to your method safely, passing the boolean `disabled` state without interfering with other component logic.
