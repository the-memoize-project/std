import { describe, expect, it } from "vitest";
import { len } from "./len";

describe("len", () => {
  it("should return number of keys in an object", () => {
    expect(len({ a: 1, b: 2 })).toBe(2);
  });

  it("should return 0 if value is null or undefined", () => {
    expect(len(null)).toBe(0);
    expect(len(undefined)).toBe(0);
  });
});
