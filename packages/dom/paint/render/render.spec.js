import {
  didPaintCallback,
  isPainted,
  willPaintCallback,
} from "@dom/interfaces";
import { beforeEach, describe, expect, it, vi } from "vitest";
import render from "./render";

describe("render", () => {
  let element;
  let target;

  beforeEach(() => {
    element = {
      shadowRoot: {},
      [willPaintCallback]: vi.fn(),
      [didPaintCallback]: vi.fn(),
    };

    target = {
      prototype: {},
    };
  });

  it("should apply adoptedStyleSheets with styles values", async () => {
    const sheet = {};
    const style = vi.fn(() => sheet);

    element.shadowRoot.adoptedStyleSheets = [];

    render(() => "<div></div>")
      .with([style])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(style).toHaveBeenCalledWith(element);
    expect(element.shadowRoot.adoptedStyleSheets).toEqual([sheet]);
  });

  it("should apply all concatenated styles", async () => {
    const sheet1 = {};
    const sheet2 = {};
    const s1 = vi.fn(() => sheet1);
    const s2 = vi.fn(() => sheet2);
    element.shadowRoot.adoptedStyleSheets = [];

    render(() => "<div></div>")
      .with([s1, s2])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.shadowRoot.adoptedStyleSheets).toEqual([sheet1, sheet2]);
  });

  it("should apply component result to innerHTML", async () => {
    const html = "<p>Hello</p>";
    element.shadowRoot.innerHTML = "";
    const component = vi.fn(() => html);

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.shadowRoot.innerHTML).toBe(html);
  });

  it("should execute everything after original connectedCallback", async () => {
    const steps = [];
    target.prototype.connectedCallback = () => steps.push("original");
    const component = () => {
      steps.push("render");
      return "<div></div>";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["original", "render"]);
  });

  it("should execute willPaintCallback before render", async () => {
    const steps = [];
    element[willPaintCallback] = vi.fn(() => steps.push("will"));
    const component = () => {
      steps.push("render");
      return "ok";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["will", "render"]);
  });

  it("should execute didPaintCallback after render", async () => {
    const steps = [];
    element[didPaintCallback] = vi.fn(() => steps.push("did"));
    const component = () => {
      steps.push("render");
      return "ok";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["render", "did"]);
  });

  it("should set isPainted to true", async () => {
    const component = () => "done";

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element[isPainted]).toBe(true);
  });

  it("should use document.adoptedStyleSheets when shadowRoot does not exist", async () => {
    const globalAdopt = vi.fn();
    const sheet = {};
    const style = vi.fn(() => sheet);
    Object.defineProperty(document, "adoptedStyleSheets", {
      configurable: true,
      set: globalAdopt,
    });

    delete element.shadowRoot;

    render(() => "<div></div>")
      .with([style])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(globalAdopt).toHaveBeenCalledWith([sheet]);
  });

  it("should use this.innerHTML when shadowRoot does not exist", async () => {
    const html = "<x-rendered />";
    const component = vi.fn(() => html);
    delete element.shadowRoot;

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.innerHTML).toBe(html);
  });
});
