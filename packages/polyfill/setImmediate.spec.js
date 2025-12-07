import { beforeEach, describe, expect, it, vi } from "vitest";

describe("setImmediate polyfill", () => {
  beforeEach(() => {
    delete globalThis.setImmediate;
    vi.resetModules();
  });

  it("should not overwrite setImmediate if it already exists", async () => {
    const original = vi.fn();
    globalThis.setImmediate = original;

    await import("./setImmediate.js");

    expect(globalThis.setImmediate).toBe(original);
  });

  it("should define setImmediate when it does not exist", async () => {
    expect(globalThis.setImmediate).toBeUndefined();

    await import("./setImmediate.js");

    expect(globalThis.setImmediate).toBeTypeOf("function");
  });

  it("should execute the passed function asynchronously", async () => {
    await import("./setImmediate.js");
    const callback = vi.fn();

    globalThis.setImmediate(callback);

    expect(callback).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(callback).toHaveBeenCalledOnce();
  });

  it("should return a timeout ID", async () => {
    await import("./setImmediate.js");

    const timeoutId = globalThis.setImmediate(() => {});

    // In Node.js/happy-dom, setTimeout returns a Timeout object
    // In browsers, it returns a number
    expect(timeoutId).toBeDefined();
    expect(timeoutId).not.toBeNull();

    clearTimeout(timeoutId);
  });

  it("should be writable", async () => {
    await import("./setImmediate.js");

    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "setImmediate",
    );

    expect(descriptor?.writable).toBe(true);
  });

  it("should be configurable", async () => {
    await import("./setImmediate.js");

    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "setImmediate",
    );

    expect(descriptor?.configurable).toBe(true);
  });

  it("should allow reassignment due to writable property", async () => {
    await import("./setImmediate.js");

    const customFn = vi.fn();
    globalThis.setImmediate = customFn;

    expect(globalThis.setImmediate).toBe(customFn);
  });

  it("should allow deletion due to configurable property", async () => {
    await import("./setImmediate.js");

    expect(globalThis.setImmediate).toBeDefined();

    delete globalThis.setImmediate;

    expect(globalThis.setImmediate).toBeUndefined();
  });
});
