import { describe, expect, it } from "vitest";
import { truthy } from "./truthy";

describe("trythy", () => {
  it("should return false for 'no'", () => {
    expect(truthy("no")).toBe(false);
  });

  it("should return false for 'false'", () => {
    expect(truthy("false")).toBe(false);
  });

  it("should return false for '0'", () => {
    expect(truthy("0")).toBe(false);
  });

  it("should return false for null", () => {
    expect(truthy(null)).toBe(false);
  });

  it("should return false for 'no'", () => {
    expect(truthy("no")).toBe(false);
  });

  it("should return true for 'true'", () => {
    expect(truthy("true")).toBe(true);
  });

  it("should return true for empty string", () => {
    expect(truthy("")).toBe(true);
  });

  it("should return true for any other value", () => {
    expect(truthy("yes")).toBe(true);
    expect(truthy("1")).toBe(true);
    expect(truthy("x")).toBe(true);
  });
});
