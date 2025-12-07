import { describe, expect, it } from "vitest";
import { inc } from "./inc";

describe("inc", () => {
  it("should increment a number", () => {
    expect(inc(1)).toBe(2);
  });
});
