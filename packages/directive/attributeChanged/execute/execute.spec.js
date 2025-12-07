import { describe, expect, it, vi } from "vitest";
import execute from "./execute";

describe("execute", () => {
  it("should register attribute as observed", () => {
    class MyElement {
      static observedAttributes = [];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toContain("visible");
  });

  it("should preserve existing observed attributes", () => {
    class MyElement {
      static observedAttributes = ["other"];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toEqual(["other", "visible"]);
  });

  it("should execute setter when correct attribute changes", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("visible", "false", "true");

    expect(setSpy).toHaveBeenCalledWith(true);
  });

  it("should not execute setter if attribute does not match", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("hidden", "false", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });

  it.skip("should not execute setter if values are equal", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("visible", "true", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });
});
