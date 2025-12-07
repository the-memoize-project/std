import { describe, expect, it } from "vitest";
import { different } from "./different";

describe("different", () => {
  it("should return true if values are different", () => {
    expect(different(1, 2)).toBe(true);
  });

  it("should return false if values are equal", () => {
    expect(different(2, 2)).toBe(false);
  });
});
