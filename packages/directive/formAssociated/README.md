# Decorator `@formAssociated`

The `@formAssociated` decorator simplifies interaction with forms, executing a class method whenever a Custom Element is associated with a `<form>` element in the DOM.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { formAssociated } from '@hive/std/directive';
```

## How to Use

For a Custom Element to be associated with a form, it needs to meet two prerequisites from the Web Components specification:

1.  The class must have the static property `formAssociated` set to `true`.
2.  You must call `this.attachInternals()` in the constructor to gain access to the `ElementInternals` object.

The `@formAssociated` decorator then takes care of triggering your method when the lifecycle's `formAssociatedCallback` is called.

### Usage Example

In this example, we use the decorator to obtain a reference to the form to which our custom component was associated.

```javascript
import { formAssociated, define } from '@hive/std/directive';

@define('custom-input')
class CustomInput extends HTMLElement {
  // Prerequisite 1: Enables form association.
  static formAssociated = true;

  private internals: ElementInternals;
  private parentForm: HTMLFormElement | null = null;

  constructor() {
    super();
    // Prerequisite 2: Attaches 'ElementInternals'.
    this.internals = this.attachInternals();
  }

  /**
   * This method is invoked by the @formAssociated decorator.
   * The 'form' argument is passed automatically by the lifecycle
   * and contains the reference to the <form> element.
   */
  @formAssociated
  handleFormAssociation(form: HTMLFormElement) {
    console.log('My component was associated with this form:', form);
    this.parentForm = form;
    // Now we can, for example, listen to the form's submit event.
    form.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event: Event) => {
    // Logic for when the form is submitted.
  }
}
```

## Description

The `@formAssociated` decorator is a shortcut for the `formAssociatedCallback(form)` lifecycle method. This callback is part of the *Form-associated Custom Elements* API, which allows your components to behave like native form fields (such as `<input>`, `<select>`, etc.).

The main function of this callback (and, consequently, of the decorator) is to give your component a reference to the form it belongs to. This is useful for:

  - Accessing other fields in the same form.
  - Listening to form events, such as `submit` or `reset`.
  - Synchronizing state or validation with the parent form.

The `@formAssociated` decorator manages the call to your method safely, ensuring it is executed with the correct `form` argument and without interfering with other component logic.
