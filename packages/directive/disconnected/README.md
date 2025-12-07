# Decorator `@disconnected`

The `@disconnected` decorator provides a declarative and safe way to execute cleanup logic at the exact moment a Custom Element is removed from the DOM.

## Installation and Import

This decorator is part of the `@hive/std` package and can be imported from the `directive` module:

```javascript
import { disconnected } from '@hive/std/directive';
```

## How to Use

Apply the `@disconnected` decorator directly to the class method that should be executed when the component is removed from the page. It's the perfect place for "cleanup" tasks.

### Usage Example

The most important use case for `@disconnected` is to prevent memory leaks by cleaning up resources that were allocated when the component was connected, such as `setIntervals`, `WebSockets`, or global `EventListeners`.

```javascript
import { disconnected, define } from '@hive/std/directive';

@define('live-clock')
class LiveClock extends HTMLElement {
  private intervalId: number;

  // When the clock is added to the page, we start an interval.
  connectedCallback() {
    this.intervalId = setInterval(() => {
      this.textContent = `Time: ${new Date().toLocaleTimeString()}`;
    }, 1000);
  }

  /**
   * This method is called automatically by @disconnected
   * when the <live-clock> element is removed from the DOM.
   * If we didn't clean up the interval, it would continue running
   * forever in the background, causing a memory leak.
   */
  @disconnected
  cleanup() {
    console.log('Clock removed, cleaning up the interval.');
    clearInterval(this.intervalId);
  }
}
```

## Description

The `@disconnected` decorator is a shortcut for the `disconnectedCallback()` lifecycle method of Web Components. Instead of implementing `disconnectedCallback` manually, you can simply decorate a method with a more descriptive name (such as `cleanup`, `destroy`, or `teardown`) to execute your finalization logic.

Internally, the decorator uses an interceptor to attach to the `disconnectedCallback`, ensuring that the decorated method is called in an organized and predictable manner, without overwriting any other logic that may exist in the component's original `disconnectedCallback`.
