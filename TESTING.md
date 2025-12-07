# Testing Standards Guide

> **Official testing patterns and best practices for @hive/std**

## Table of Contents

1. [Overview](#overview)
2. [Test File Structure](#test-file-structure)
3. [Naming Conventions](#naming-conventions)
4. [Test Patterns by Type](#test-patterns-by-type)
5. [Best Practices](#best-practices)
6. [Common Pitfalls](#common-pitfalls)
7. [Running Tests](#running-tests)

---

## Overview

This project uses **Vitest** as the test framework with **happy-dom** for DOM simulation. All tests must:

- Be written in English (descriptions, comments, variable names)
- Follow BDD-style test descriptions ("should...")
- Maintain minimum 80% coverage for core packages
- Use the AAA pattern (Arrange-Act-Assert) where applicable

**Current Status:**
- ✅ 98 tests across 40 files
- ✅ 84.62% overall coverage
- ✅ 100% coverage for core packages (directive, dom, echo, event, spark)

---

## Test File Structure

### Standard Template

```javascript
import { describe, expect, it, vi } from "vitest";
import { functionUnderTest } from "./functionUnderTest";

describe("functionUnderTest", () => {
  it("should [expected behavior]", () => {
    // Arrange: Set up test data
    const input = ...;

    // Act: Execute the function
    const result = functionUnderTest(input);

    // Assert: Verify the result
    expect(result).toBe(expected);
  });
});
```

### With Setup/Teardown

```javascript
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { ClassUnderTest } from "./ClassUnderTest";

describe("ClassUnderTest", () => {
  let instance;
  let mockDependency;

  beforeEach(() => {
    // Create fresh instances before each test
    mockDependency = { method: vi.fn() };
    instance = new ClassUnderTest(mockDependency);
  });

  afterEach(() => {
    // Clean up if needed
    vi.clearAllMocks();
  });

  it("should [behavior]", () => {
    // Test implementation
  });
});
```

---

## Naming Conventions

### Test File Names

- **Pattern:** `[module-name].spec.js`
- **Location:** Co-located with source file
- **Extension:** `.spec.js` (preferred) or `.spec.ts`

**Examples:**
- `packages/spark/add/add.spec.js`
- `packages/dom/paint/paint.spec.ts`
- `packages/echo/echo.spec.js`

### Test Description Format

**Pattern:** `should [action/behavior] [expected result]`

**Good Examples:**
```javascript
it("should sum two numbers")
it("should return a CSSStyleSheet instance")
it("should register attribute as observed")
it("should throw error when input is invalid")
it("should call callback after render completes")
```

**Bad Examples:**
```javascript
it("sums two numbers")  // Missing "should"
it("deve somar dois números")  // Portuguese
it("test add function")  // Not descriptive
it("works")  // Too vague
```

### Variable Naming in Tests

**Good:**
```javascript
const result = add(1, 2);
const mockElement = createMockElement();
const expectedOutput = { id: 1, name: "test" };
```

**Bad:**
```javascript
const r = add(1, 2);  // Too short
const elemento = createMockElement();  // Portuguese
const x = { id: 1, name: "test" };  // Not descriptive
```

---

## Test Patterns by Type

### Pattern 1: Pure Function Tests

**Use for:** Spark functions, utility functions, helpers

```javascript
import { describe, expect, it } from "vitest";
import { add } from "./add";

describe("add", () => {
  it("should sum two positive numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("should sum negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it("should handle zero", () => {
    expect(add(0, 5)).toBe(5);
  });
});
```

**Key Points:**
- Test multiple scenarios (positive, negative, zero, edge cases)
- Pure functions should have no side effects
- No setup/teardown needed

---

### Pattern 2: Decorator Tests

**Use for:** @paint, @repaint, @attributeChanged, etc.

```javascript
import { describe, expect, it, vi } from "vitest";
import { paint } from "./paint";

describe("paint", () => {
  it("should attach shadow root to element", () => {
    class TestElement extends HTMLElement {}

    const htmlFn = () => "<div>Content</div>";
    const cssFn = () => ({ cssRules: [] });

    const DecoratedClass = paint(htmlFn, cssFn)(TestElement);
    const instance = new DecoratedClass();

    // Simulate connectedCallback
    instance.connectedCallback();

    expect(instance.shadowRoot).toBeDefined();
  });

  it("should apply provided HTML template", () => {
    // Test implementation
  });

  it("should apply provided CSS styles", () => {
    // Test implementation
  });
});
```

**Key Points:**
- Test decorator's effect on the class
- Verify side effects (shadowRoot creation, attribute observation)
- Use real or mock Custom Elements

---

### Pattern 3: Mixin Tests

**Use for:** Echo mixin, other class composition patterns

```javascript
import { beforeEach, describe, expect, it, vi } from "vitest";
import Echo from "./echo";

/**
 * Mock element for testing Echo mixin.
 * Provides minimal Custom Element interface.
 */
class MockElement extends EventTarget {
  #attributes = {};

  get localName() {
    return "mock-element";
  }

  getAttribute(name) {
    return this.#attributes[name];
  }

  setAttribute(name, value) {
    this.#attributes[name] = value;
  }

  attributeChangedCallback() {}
  connectedCallback() {}
  disconnectedCallback() {}
}

describe("Echo", () => {
  let instance;

  beforeEach(() => {
    class TestHost extends Echo(MockElement) {
      method() {}
    }
    instance = new TestHost();
  });

  it("should add 'on' to observedAttributes", () => {
    expect(instance.constructor.observedAttributes).toContain("on");
  });

  it("should parse dataflow syntax", () => {
    // Test implementation
  });
});
```

**Key Points:**
- Create minimal mock classes for testing
- Document mock purpose with JSDoc
- Test mixin's additions to the base class

---

### Pattern 4: Template Literal Tests

**Use for:** html helper, css helper

```javascript
import { describe, expect, it } from "vitest";
import { css } from "./css";

describe("css", () => {
  it("should return a CSSStyleSheet instance", () => {
    const sheet = css``;
    expect(sheet).toBeInstanceOf(CSSStyleSheet);
  });

  it("should interpolate values correctly", () => {
    const color = "red";
    const sheet = css`
      :host {
        color: ${color};
      }
    `;

    const rules = Array.from(sheet.cssRules).map((r) => r.cssText);
    expect(rules[0]).toContain("color: red");
  });

  it("should handle multiple interpolations", () => {
    const prop = "font-size";
    const value = "16px";
    const sheet = css`
      :host {
        ${prop}: ${value};
      }
    `;

    const rule = sheet.cssRules[0].cssText;
    expect(rule).toContain("font-size");
    expect(rule).toContain("16px");
  });
});
```

**Key Points:**
- Test template parsing
- Test interpolation of values
- Verify output format (CSSStyleSheet, HTML string, etc.)

---

### Pattern 5: Fluent API Tests

**Use for:** Builder pattern, chainable methods

```javascript
import { describe, expect, it, vi } from "vitest";
import { execute } from "./execute";

describe("execute", () => {
  it("should register attribute as observed", () => {
    class MyElement {
      static observedAttributes = [];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toContain("visible");
  });

  it("should preserve existing observed attributes", () => {
    class MyElement {
      static observedAttributes = ["other"];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toEqual(["other", "visible"]);
  });

  it("should apply transformation pipeline", () => {
    const spy = vi.fn();

    class MyElement {
      set visible(value) {
        spy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])  // Transformation
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("visible", "false", "true");

    expect(spy).toHaveBeenCalledWith(true);  // Transformed value
  });
});
```

**Key Points:**
- Test each method in the chain
- Verify final composed behavior
- Test transformations/pipelines

---

## Best Practices

### 1. One Assertion Per Test (When Possible)

**Good:**
```javascript
it("should sum two numbers", () => {
  expect(add(1, 2)).toBe(3);
});

it("should sum negative numbers", () => {
  expect(add(-1, -2)).toBe(-3);
});
```

**Acceptable (Related Assertions):**
```javascript
it("should create element with correct attributes", () => {
  const element = createElement("div", { id: "test", class: "foo" });

  expect(element.tagName).toBe("DIV");
  expect(element.id).toBe("test");
  expect(element.className).toBe("foo");
});
```

### 2. Use Descriptive Test Data

**Good:**
```javascript
const userWithPermission = { id: 1, role: "admin" };
const userWithoutPermission = { id: 2, role: "guest" };
```

**Bad:**
```javascript
const user1 = { id: 1, role: "admin" };
const user2 = { id: 2, role: "guest" };
```

### 3. Mock Only What You Need

**Good:**
```javascript
const mockFetch = vi.fn().mockResolvedValue({ data: [] });
```

**Bad:**
```javascript
// Mocking entire HTTP library when you only need fetch
vi.mock("node:http");
vi.mock("node:https");
```

### 4. Test Behavior, Not Implementation

**Good:**
```javascript
it("should display error message when validation fails", () => {
  const result = validateForm({ email: "invalid" });
  expect(result.error).toBe("Invalid email");
});
```

**Bad:**
```javascript
it("should call validateEmail function", () => {
  const spy = vi.spyOn(validator, "validateEmail");
  validateForm({ email: "invalid" });
  expect(spy).toHaveBeenCalled();  // Testing implementation detail
});
```

### 5. Use AAA Pattern for Clarity

```javascript
it("should increment count when button is clicked", () => {
  // Arrange
  const button = createButton();
  const initialCount = button.count;

  // Act
  button.click();

  // Assert
  expect(button.count).toBe(initialCount + 1);
});
```

---

## Common Pitfalls

### ❌ Pitfall 1: Tests in Portuguese

**Bad:**
```javascript
it("deve somar dois números", () => {
  expect(add(1, 2)).toBe(3);
});
```

**Good:**
```javascript
it("should sum two numbers", () => {
  expect(add(1, 2)).toBe(3);
});
```

---

### ❌ Pitfall 2: Vague Test Descriptions

**Bad:**
```javascript
it("works", () => { ... });
it("test 1", () => { ... });
it("returns value", () => { ... });
```

**Good:**
```javascript
it("should return sum when both inputs are positive", () => { ... });
it("should throw error when input is not a number", () => { ... });
it("should return cached value on second call", () => { ... });
```

---

### ❌ Pitfall 3: Testing Multiple Unrelated Things

**Bad:**
```javascript
it("should work correctly", () => {
  expect(add(1, 2)).toBe(3);
  expect(subtract(5, 3)).toBe(2);
  expect(multiply(2, 3)).toBe(6);
});
```

**Good:**
```javascript
describe("math functions", () => {
  it("should add two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("should subtract two numbers", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it("should multiply two numbers", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
```

---

### ❌ Pitfall 4: Not Cleaning Up Mocks

**Bad:**
```javascript
describe("feature", () => {
  it("test 1", () => {
    vi.spyOn(obj, "method");
    // Test runs
    // Spy persists to next test!
  });

  it("test 2", () => {
    // This test may be affected by previous spy
  });
});
```

**Good:**
```javascript
describe("feature", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("test 1", () => {
    vi.spyOn(obj, "method");
    // Test runs
  });

  it("test 2", () => {
    // Clean slate
  });
});
```

---

### ❌ Pitfall 5: Not Testing Edge Cases

**Bad:**
```javascript
describe("divide", () => {
  it("should divide two numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });
});
```

**Good:**
```javascript
describe("divide", () => {
  it("should divide two positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it("should throw error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  it("should return Infinity when dividing Infinity", () => {
    expect(divide(Infinity, 2)).toBe(Infinity);
  });
});
```

---

## Running Tests

### Run All Tests

```bash
bun run test
```

### Run Tests with Coverage

```bash
bun run test --coverage
```

### Run Specific Test File

```bash
bun run test packages/spark/add/add.spec.js
```

### Run Tests in Watch Mode

```bash
bun run test --watch
```

### Run Tests for Specific Package

```bash
bun run test packages/spark
```

---

## Coverage Requirements

### Thresholds (Enforced)

- **Statements:** 80%
- **Branches:** 80%
- **Functions:** 80%
- **Lines:** 80%

### Package Status

**100% Coverage (Required):**
- directive/
- dom/
- echo/
- event/
- spark/

**Excluded from Coverage:**
- logger/ (utility package)
- middleware/ (experimental)
- result/ (utility package)

---

## Quick Reference

### Essential Vitest Imports

```javascript
import {
  describe,        // Group related tests
  it,             // Define individual test
  expect,         // Assertion library
  vi,             // Mock/spy utilities
  beforeEach,     // Setup before each test
  afterEach,      // Cleanup after each test
  beforeAll,      // Setup once before all tests
  afterAll,       // Cleanup once after all tests
} from "vitest";
```

### Common Assertions

```javascript
// Equality
expect(value).toBe(expected);           // Strict equality (===)
expect(value).toEqual(expected);        // Deep equality
expect(value).toStrictEqual(expected);  // Strict deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3, 1);  // Floating point

// Strings
expect(string).toContain("substring");
expect(string).toMatch(/pattern/);

// Arrays/Objects
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(obj).toHaveProperty("key", "value");

// Functions
expect(fn).toThrow();
expect(fn).toThrow("error message");
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(arg1, arg2);
expect(spy).toHaveBeenCalledTimes(2);

// Instances
expect(obj).toBeInstanceOf(Class);
```

### Common Mock Patterns

```javascript
// Mock function
const mockFn = vi.fn();
const mockFn = vi.fn().mockReturnValue(42);
const mockFn = vi.fn().mockResolvedValue(data);

// Spy on method
const spy = vi.spyOn(obj, "method");

// Mock module
vi.mock("./module", () => ({
  default: vi.fn(),
  namedExport: vi.fn(),
}));

// Clear mocks
vi.clearAllMocks();    // Clear call history
vi.resetAllMocks();    // Clear + reset implementations
vi.restoreAllMocks();  // Clear + restore original
```

---

## Learn More

- **Official Docs:** [Vitest Documentation](https://vitest.dev/)
- **happy-dom:** [happy-dom Documentation](https://github.com/capricorn86/happy-dom)
- **Project Guide:** [CLAUDE.md](./CLAUDE.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Last Updated:** 2025-06
**Version:** 1.0.0
