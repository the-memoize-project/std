import { describe, expect, it } from "vitest";
import { equals } from "./equals";

describe("equals", () => {
  it("should return true if values are equal", () => {
    expect(equals(1, 1)).toBe(true);
  });

  it("should return false if values are different", () => {
    expect(equals(1, 2)).toBe(false);
  });
});
