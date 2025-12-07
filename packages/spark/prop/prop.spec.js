import { describe, expect, it } from "vitest";
import { prop } from "./prop";

describe("prop", () => {
  it("should access object property", () => {
    expect(prop([1, { a: 1 }, 3], "[1].a")).toBe(1);
  });

  it("should return undefined for invalid paths", () => {
    expect(prop({ a: 2 }, "a.b.c")).toBe(undefined);
  });
});
