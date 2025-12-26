import { describe, expect, it, vi } from "vitest";
import prevent from "./prevent";

describe("prevent", () => {
  it("should call preventDefault on the event", () => {
    const event = {
      preventDefault: vi.fn(),
    };

    prevent(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should return the event for chaining", () => {
    const event = {
      preventDefault: vi.fn(),
    };

    const result = prevent(event);

    expect(result).toBe(event);
  });

  it("should work with real Event objects", () => {
    const event = new Event("submit");
    const spy = vi.spyOn(event, "preventDefault");

    prevent(event);

    expect(spy).toHaveBeenCalled();
  });

  it("should allow chaining with other functions", () => {
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    const stop = (e) => {
      e.stopPropagation();
      return e;
    };

    const result = stop(prevent(event));

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(result).toBe(event);
  });
});
