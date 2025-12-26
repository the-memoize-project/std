import { describe, expect, it } from "vitest";
import detail from "./detail";

describe("detail", () => {
  it("should extract event.detail", () => {
    const event = {
      detail: { userId: 123, name: "John" },
    };

    const result = detail(event);

    expect(result).toEqual({ userId: 123, name: "John" });
  });

  it("should handle object details", () => {
    const detailData = { key: "value", nested: { prop: true } };
    const event = { detail: detailData };

    expect(detail(event)).toBe(detailData);
  });

  it("should handle string details", () => {
    const event = { detail: "simple string" };
    expect(detail(event)).toBe("simple string");
  });

  it("should handle number details", () => {
    const event = { detail: 42 };
    expect(detail(event)).toBe(42);
  });

  it("should handle array details", () => {
    const event = { detail: [1, 2, 3] };
    expect(detail(event)).toEqual([1, 2, 3]);
  });

  it("should handle boolean details", () => {
    const event = { detail: true };
    expect(detail(event)).toBe(true);
  });

  it("should handle null details", () => {
    const event = { detail: null };
    expect(detail(event)).toBe(null);
  });

  it("should handle undefined details", () => {
    const event = { detail: undefined };
    expect(detail(event)).toBe(undefined);
  });

  it("should work with CustomEvent objects", () => {
    const customEvent = new CustomEvent("test-event", {
      detail: { message: "Hello", count: 5 },
    });

    const result = detail(customEvent);

    expect(result).toEqual({ message: "Hello", count: 5 });
  });

  it("should handle complex nested structures", () => {
    const complexDetail = {
      user: {
        id: 1,
        profile: {
          name: "Alice",
          settings: {
            theme: "dark",
            notifications: true,
          },
        },
      },
      timestamp: Date.now(),
    };

    const event = { detail: complexDetail };

    expect(detail(event)).toBe(complexDetail);
  });
});
