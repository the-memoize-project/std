import { describe, expect, it } from "vitest";
import { lte } from "./lte";

describe("lte", () => {
  it("should return true if first value is less than or equal", () => {
    expect(lte(1, 2)).toBe(true);
    expect(lte(2, 2)).toBe(true);
  });

  it("should return false if first value is greater", () => {
    expect(lte(3, 2)).toBe(false);
  });
});
