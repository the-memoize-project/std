import { describe, expect, it, vi } from "vitest";
import stop from "./stop";

describe("stop", () => {
  it("should call stopPropagation on the event", () => {
    const event = {
      stopPropagation: vi.fn(),
    };

    stop(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("should return the event for chaining", () => {
    const event = {
      stopPropagation: vi.fn(),
    };

    const result = stop(event);

    expect(result).toBe(event);
  });

  it("should work with real Event objects", () => {
    const event = new Event("click", { bubbles: true });
    const spy = vi.spyOn(event, "stopPropagation");

    stop(event);

    expect(spy).toHaveBeenCalled();
  });

  it("should allow chaining with other functions", () => {
    const event = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn(),
    };

    const prevent = (e) => {
      e.preventDefault();
      return e;
    };

    const result = prevent(stop(event));

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(result).toBe(event);
  });
});
