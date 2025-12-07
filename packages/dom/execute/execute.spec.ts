import { describe, expect, it } from "vitest";
import execute from "./execute";

describe("execute", () => {
  it("should run original callback before registered method", async () => {
    const log = [];

    class MyElement {
      paintCallback() {
        log.push("original");
      }

      handler() {
        log.push("decorated");
      }
    }

    execute("handler").on(MyElement.prototype).after("paintCallback");

    const element = new MyElement();
    await element.paintCallback();

    expect(log).toEqual(["original", "decorated"]);
  });

  it("should not throw error if original callback does not exist", async () => {
    const log = [];

    class MyElement {
      handler() {
        log.push("decorated");
      }
    }

    execute("handler").on(MyElement.prototype).after("paintCallback");

    const element = new MyElement();

    expect(() => element.paintCallback()).not.toThrow();

    await Promise.resolve();

    expect(log).toEqual(["decorated"]);
  });
});
