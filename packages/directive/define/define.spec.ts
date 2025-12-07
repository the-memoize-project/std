import { beforeEach, describe, expect, it, vi } from "vitest";
import define from "./define";

describe("define", () => {
  beforeEach(() => {
    customElements.get = vi.fn();
    customElements.define = vi.fn();
  });

  it("should call customElements.get to validate if element is already defined", () => {
    @define("my-element")
    class MyElement extends HTMLElement {}

    expect(customElements.get).toHaveBeenCalledWith("my-element");
  });

  it("should not call customElements.define if element is already defined", () => {
    customElements.get.mockReturnValue(class {});

    @define("existing-element")
    class ExistingElement extends HTMLElement {}

    expect(customElements.define).not.toHaveBeenCalled();
  });

  it("should call customElements.define with correct parameters when element does not exist", () => {
    customElements.get.mockReturnValue(undefined);

    @define("new-element", { extends: "div" })
    class NewElement extends HTMLElement {}

    expect(customElements.define).toHaveBeenCalledWith(
      "new-element",
      NewElement,
      { extends: "div" },
    );
  });
});
