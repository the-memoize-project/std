import { describe, expect, it } from "vitest";
import { not } from "./not";

describe("not", () => {
  it("should invert boolean value", () => {
    expect(not(true)).toBe(false);
    expect(not(false)).toBe(true);
  });
});
