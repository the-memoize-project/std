import { describe, expect, it } from "vitest";
import { gte } from "./gte";

describe("gte", () => {
  it("should return true if first value is greater than or equal", () => {
    expect(gte(2, 2)).toBe(true);
    expect(gte(3, 2)).toBe(true);
  });

  it("should return false if first value is less", () => {
    expect(gte(1, 2)).toBe(false);
  });
});
