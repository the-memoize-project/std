import { beforeEach, describe, expect, it, vi } from "vitest";
import spark from "./spark";

describe("spark", () => {
  beforeEach(() => {
    spark.set("custom", undefined);
  });

  it("should return the correct registered function", () => {
    const fn = vi.fn((x) => x * 2);
    spark.set("custom", fn);
    const resolved = spark.get("custom");
    expect(resolved).toBe(fn);
    expect(resolved(3)).toBe(6);
  });

  it("should return identity function if not found", () => {
    const resolved = spark.get("inexistente");
    expect(typeof resolved).toBe("function");
    expect(resolved("x")).toBe("x");
  });

  it("should allow chaining with set", () => {
    const fn = () => 123;
    const result = spark.set("encadeado", fn);
    expect(result).toBe(spark);
    expect(spark.get("encadeado")).toBe(fn);
  });

  it("should overwrite existing sparks", () => {
    const a = () => "a";
    const b = () => "b";
    spark.set("replace", a);
    expect(spark.get("replace")()).toBe("a");
    spark.set("replace", b);
    expect(spark.get("replace")()).toBe("b");
  });
});
