import { beforeEach, describe, expect, it, vi } from "vitest";
import { controller } from "./interface";
import listen from "./listen";

describe("listen", () => {
  let control;
  let element;
  let shadowRoot;

  beforeEach(() => {
    control = {
      abort: vi.fn(),
    };

    shadowRoot = {
      addEventListener: vi.fn(),
    };

    element = {
      addEventListener: vi.fn(),
      [controller]: control,
      shadowRoot,
    };
  });

  it("should add event listener on connectedCallback", () => {
    const prototype = {};

    listen("click").on("button").with().in(prototype).call("handleClick");

    expect(prototype.connectedCallback).toBeInstanceOf(Function);

    prototype.connectedCallback.call(element);

    expect(shadowRoot.addEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      expect.objectContaining({ signal: expect.any(Object) }),
    );
  });

  it("should call decorated method if selector matches", () => {
    const spy = vi.fn();
    const prototype = { handleClick: spy };

    listen("click").on("button").with().in(prototype).call("handleClick");

    element.handleClick = spy;
    prototype.connectedCallback.call(element);

    const evt = { target: { matches: () => true } };
    const handler = shadowRoot.addEventListener.mock.calls[0][1];

    handler(evt);

    expect(spy).toHaveBeenCalledWith(evt);
  });

  it("should not call method if selector does not match", () => {
    const spy = vi.fn();
    const prototype = { handleClick: spy };

    listen("click").on("button").with().in(prototype).call("handleClick");

    element.handleClick = spy;
    prototype.connectedCallback.call(element);

    const evt = { target: { matches: () => false } };
    const handler = shadowRoot.addEventListener.mock.calls[0][1];

    handler(evt);

    expect(spy).not.toHaveBeenCalled();
  });

  it("should apply filters before calling method", () => {
    const spy = vi.fn();
    const filter1 = vi.fn((e) => ({ ...e, step: 1 }));
    const filter2 = vi.fn((e) => ({ ...e, step: e.step + 1 }));

    const prototype = { handleClick: spy };

    listen("click")
      .on("button")
      .with(filter1, filter2)
      .in(prototype)
      .call("handleClick");

    element.handleClick = spy;
    prototype.connectedCallback.call(element);

    const evt = { target: { matches: () => true } };
    const handler = shadowRoot.addEventListener.mock.calls[0][1];

    handler(evt);

    expect(spy).toHaveBeenCalledWith({
      target: expect.any(Object),
      step: 2,
    });
  });

  it("should compose with existing connectedCallback", () => {
    const log = [];
    const prototype = {
      connectedCallback() {
        log.push("original");
      },
    };

    listen("click").on("button").with().in(prototype).call("handleClick");

    prototype.connectedCallback.call(element);

    expect(log).toEqual(["original"]);
  });

  it("should compose with existing disconnectedCallback", () => {
    const log = [];
    const prototype = {
      disconnectedCallback() {
        log.push("disconnected");
      },
    };

    listen("click").on("button").with().in(prototype).call("handleClick");

    prototype.disconnectedCallback.call(element);

    expect(log).toEqual(["disconnected"]);
  });
});
