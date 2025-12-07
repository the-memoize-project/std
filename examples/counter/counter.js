import { define, attributeChanged } from "../../packages/directive/index.js";
import { paint, repaint, html, css } from "../../packages/dom/index.js";
import { event } from "../../packages/event/index.js";

const template = (counter) => html`
  <div class="counter">
    <div class="display">
      <div class="value">${counter.count}</div>
      <div class="label">Count</div>
    </div>
    <div class="controls">
      <button class="btn btn-decrement">−</button>
      <button class="btn btn-reset">Reset</button>
      <button class="btn btn-increment">+</button>
    </div>
  </div>
`;

const styles = () => css`
  :host {
    display: block;
  }

  .counter {
    text-align: center;
  }

  .display {
    margin-bottom: 30px;
  }

  .value {
    font-size: 72px;
    font-weight: bold;
    color: #667eea;
    line-height: 1;
  }

  .label {
    font-size: 14px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 10px;
  }

  .controls {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .btn {
    padding: 16px 24px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 80px;
  }

  .btn-increment {
    background: #667eea;
    color: white;
  }

  .btn-decrement {
    background: #764ba2;
    color: white;
  }

  .btn-reset {
    background: #f0f0f0;
    color: #333;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn:active {
    transform: translateY(0);
  }
`;

@define("hive-counter")
@paint(template, styles)
class Counter extends HTMLElement {
  #count = 0;

  get count() {
    return this.#count;
  }

  @attributeChanged("count", Number)
  @repaint
  set count(value) {
    this.#count = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @event.click(".btn-increment")
  increment() {
    this.count += 1;
  }

  @event.click(".btn-decrement")
  decrement() {
    this.count -= 1;
  }

  @event.click(".btn-reset")
  reset() {
    this.count = 0;
  }
}
