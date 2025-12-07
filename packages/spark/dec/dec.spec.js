import { describe, expect, it } from "vitest";
import { dec } from "./dec";

describe("dec", () => {
  it("should decrement a number", () => {
    expect(dec(2)).toBe(1);
  });
});
