import { describe, expect, it } from "vitest";
import { lt } from "./lt";

describe("lt", () => {
  it("should return true if first value is less", () => {
    expect(lt(1, 2)).toBe(true);
  });

  it("should return false if first value is greater than or equal", () => {
    expect(lt(2, 2)).toBe(false);
    expect(lt(3, 2)).toBe(false);
  });
});
