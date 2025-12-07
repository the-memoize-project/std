import { beforeEach, describe, expect, it, vi } from "vitest";
import Echo from "./echo";

/**
 * Mock base element with minimal attribute and dispatch support.
 */
class FakeElement extends EventTarget {
  #attributes = {
    id: "x",
    name: "fake",
  };

  get localName() {
    return "fake-element";
  }

  attributeChangedCallback() {}

  connectedCallback() {}

  disconnectedCallback() {}

  getAttribute(name) {
    return this.#attributes[name];
  }
}

describe("Echo", () => {
  let instance;
  let methodSpy;
  let setAttributeSpy;
  let setterSpy;

  beforeEach(() => {
    class Host extends Echo(FakeElement) {
      set setter(_) {}
      setAttribute() {}
      method() {}
    }

    instance = new Host();

    methodSpy = vi.spyOn(instance, "method");
    setAttributeSpy = vi.spyOn(instance, "setAttribute");
    setterSpy = vi.spyOn(Host.prototype, "setter", "set");
  });

  it("should add 'on' attribute to observedAttributes", () => {
    expect(instance.constructor.observedAttributes).toContain("on");
  });

  it("should activate and deactivate arc when 'on' attribute changes", () => {
    instance.attributeChangedCallback("on", "", "#x/click:method/sink");
    instance.attributeChangedCallback("on", "", "");
    instance.dispatchEvent(new CustomEvent("click"));
    expect(methodSpy).not.toHaveBeenCalled();
  });

  it("should react to source equal to id", () => {
    instance.attributeChangedCallback("on", "", "#x/ping:method/method");
    instance.dispatchEvent(new CustomEvent("ping", { detail: 42 }));
    expect(methodSpy).toHaveBeenCalledWith(42);
  });

  it("should react to source equal to name", () => {
    instance.attributeChangedCallback("on", "", "fake/ping:method/method");
    instance.dispatchEvent(new CustomEvent("ping", { detail: "hi" }));
    expect(methodSpy).toHaveBeenCalledWith("hi");
  });

  it("should react to source equal to tag", () => {
    instance.attributeChangedCallback(
      "on",
      "",
      "fake-element/ping:method/method",
    );
    instance.dispatchEvent(new CustomEvent("ping", { detail: 123 }));
    expect(methodSpy).toHaveBeenCalledWith(123);
  });

  it("should react to wildcard * as source", () => {
    instance.attributeChangedCallback("on", "", "*/ping:method/method");
    instance.dispatchEvent(new CustomEvent("ping", { detail: "any" }));
    expect(methodSpy).toHaveBeenCalledWith("any");
  });

  it("should ignore event from different source", () => {
    instance.attributeChangedCallback("on", "", "#b/ping:method/method");
    instance.dispatchEvent(new CustomEvent("ping", { detail: 42 }));
    expect(methodSpy).not.toHaveBeenCalled();
  });

  it("should execute attribute type", () => {
    instance.attributeChangedCallback("on", "", "*/fire:attribute/attribute");
    instance.dispatchEvent(new CustomEvent("fire", { detail: "blue" }));
    expect(setAttributeSpy).toHaveBeenCalledWith("attribute", "blue");
  });

  it("should execute setter type", () => {
    instance.attributeChangedCallback("on", "", "*/set:setter/setter");
    instance.dispatchEvent(new CustomEvent("set", { detail: "SET" }));
    expect(setterSpy).toHaveBeenCalledWith("SET");
  });

  it("should apply filters (sparks) in order", () => {
    instance.attributeChangedCallback(
      "on",
      "",
      "*/cast:method/method|add=1|add=2",
    );
    instance.dispatchEvent(new CustomEvent("cast", { detail: "1" }));
    expect(methodSpy).toHaveBeenCalledWith(4);
  });

  it("should terminate listeners on disconnectedCallback", () => {
    instance.attributeChangedCallback("on", "", "*/event:method/method");
    instance.disconnectedCallback();
    instance.dispatchEvent(new CustomEvent("event", { detail: "bye" }));
    expect(methodSpy).not.toHaveBeenCalled();
  });
});
