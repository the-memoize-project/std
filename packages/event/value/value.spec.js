import { describe, expect, it } from "vitest";
import value from "./value";

describe("value", () => {
  it("should extract event.target.value", () => {
    const event = {
      target: {
        value: "test value",
      },
    };

    const result = value(event);

    expect(result).toBe("test value");
  });

  it("should handle string values", () => {
    const event = { target: { value: "hello world" } };
    expect(value(event)).toBe("hello world");
  });

  it("should handle numeric values", () => {
    const event = { target: { value: 42 } };
    expect(value(event)).toBe(42);
  });

  it("should handle empty strings", () => {
    const event = { target: { value: "" } };
    expect(value(event)).toBe("");
  });

  it("should handle boolean values", () => {
    const event = { target: { value: true } };
    expect(value(event)).toBe(true);
  });

  it("should handle null values", () => {
    const event = { target: { value: null } };
    expect(value(event)).toBe(null);
  });

  it("should handle undefined values", () => {
    const event = { target: { value: undefined } };
    expect(value(event)).toBe(undefined);
  });

  it("should work with mock input elements", () => {
    const mockInput = { value: "test input" };
    const event = { target: mockInput };

    expect(value(event)).toBe("test input");
  });

  it("should work with mock textarea elements", () => {
    const mockTextarea = { value: "multiline\ntext" };
    const event = { target: mockTextarea };

    expect(value(event)).toBe("multiline\ntext");
  });

  it("should work with mock select elements", () => {
    const mockSelect = { value: "selected-value" };
    const event = { target: mockSelect };

    expect(value(event)).toBe("selected-value");
  });
});
