import { describe, expect, it } from "vitest";
import { gt } from "./gt";

describe("gt", () => {
  it("should return true if first value is greater", () => {
    expect(gt(3, 2)).toBe(true);
  });

  it("should return false if first value is less than or equal", () => {
    expect(gt(2, 2)).toBe(false);
    expect(gt(1, 2)).toBe(false);
  });
});
