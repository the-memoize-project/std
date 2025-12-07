import { describe, expect, it } from "vitest";
import html from "./html";

describe("html", () => {
  it("should interpolate simple values in HTML string", () => {
    const name = "Clebão";
    const text = html`<h1>Olá, ${name}!</h1>`;
    expect(text).toBe("<h1>Olá, Clebão!</h1>");
  });

  it("should interpolate arrays of values", () => {
    const items = ["<li>Item 1</li>", "<li>Item 2</li>"];
    const text = html`<ul>${items}</ul>`;
    expect(text).toBe("<ul><li>Item 1</li><li>Item 2</li></ul>");
  });

  it("should work with multiline strings", () => {
    const text = html`
      <div>
        <p>Parágrafo</p>
      </div>
    `;
    expect(text).toMatch(/<div>\s*<p>Parágrafo<\/p>\s*<\/div>/);
  });
});
