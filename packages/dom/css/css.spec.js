import { beforeEach, describe, expect, it, vi } from "vitest";
import css from "./css";

describe("css", () => {
  it("should return a CSSStyleSheet instance", () => {
    const sheet = css``;
    expect(sheet).toBeInstanceOf(CSSStyleSheet);
  });

  it("should apply CSS rules correctly", () => {
    const color = "red";
    const sheet = css`
      :host {
        color: ${color};
      }
    `;
    const rules = sheet.cssRules.map((r) => r.cssText);
    expect(rules[0]).toContain("color: red");
  });

  it("should interpolate multiple values in template", () => {
    const prop = "font-size";
    const size = "16px";
    const sheet = css`
      :host {
        ${prop}: ${size};
      }
    `;
    const rule = sheet.cssRules[0].cssText;
    expect(rule).toContain("font-size: 16px");
  });
});
