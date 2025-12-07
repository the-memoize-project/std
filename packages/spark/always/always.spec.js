import { describe, expect, it } from "vitest";
import { always } from "./always.js";

describe("always", () => {
  it("should always return the same value", () => {
    expect(always(null, 0)).toBe(0);
    expect(always(null, "nodus")).toBe("nodus");
  });
});
