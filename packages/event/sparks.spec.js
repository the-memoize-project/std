import { beforeEach, describe, expect, it, vi } from "vitest";
import detail from "./detail/detail";
import formData from "./formData/formData";
import prevent from "./prevent/prevent";
import stop from "./stop/stop";
import value from "./value/value";

describe("Event Sparks", () => {
  describe("stop", () => {
    it("should call stopPropagation on the event", () => {
      const event = {
        stopPropagation: vi.fn(),
      };

      const result = stop(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(result).toBe(event);
    });

    it("should return the event for chaining", () => {
      const event = { stopPropagation: vi.fn() };
      const result = stop(event);

      expect(result).toBe(event);
    });
  });

  describe("prevent", () => {
    it("should call preventDefault on the event", () => {
      const event = {
        preventDefault: vi.fn(),
      };

      const result = prevent(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe(event);
    });

    it("should return the event for chaining", () => {
      const event = { preventDefault: vi.fn() };
      const result = prevent(event);

      expect(result).toBe(event);
    });
  });

  describe("value", () => {
    it("should extract event.target.value", () => {
      const event = {
        target: {
          value: "test value",
        },
      };

      const result = value(event);

      expect(result).toBe("test value");
    });

    it("should handle different value types", () => {
      const numericEvent = { target: { value: 42 } };
      const booleanEvent = { target: { value: true } };
      const emptyEvent = { target: { value: "" } };

      expect(value(numericEvent)).toBe(42);
      expect(value(booleanEvent)).toBe(true);
      expect(value(emptyEvent)).toBe("");
    });
  });

  describe("detail", () => {
    it("should extract event.detail", () => {
      const event = {
        detail: { userId: 123, name: "John" },
      };

      const result = detail(event);

      expect(result).toEqual({ userId: 123, name: "John" });
    });

    it("should handle different detail types", () => {
      const stringEvent = { detail: "simple string" };
      const numberEvent = { detail: 42 };
      const arrayEvent = { detail: [1, 2, 3] };
      const nullEvent = { detail: null };

      expect(detail(stringEvent)).toBe("simple string");
      expect(detail(numberEvent)).toBe(42);
      expect(detail(arrayEvent)).toEqual([1, 2, 3]);
      expect(detail(nullEvent)).toBe(null);
    });
  });

  describe("formData", () => {
    it("should convert FormData to a plain object", () => {
      // Mock FormData for testing
      const mockFormData = new Map([
        ["username", "john"],
        ["email", "john@example.com"],
      ]);

      // Mock the FormData constructor
      const originalFormData = global.FormData;
      global.FormData = () => mockFormData;

      const event = {
        target: {},
        submitter: null,
      };

      const result = formData(event);

      expect(result).toEqual({
        username: "john",
        email: "john@example.com",
      });

      // Restore original FormData
      global.FormData = originalFormData;
    });

    it("should handle empty forms", () => {
      const mockFormData = new Map();

      const originalFormData = global.FormData;
      global.FormData = () => mockFormData;

      const event = {
        target: {},
        submitter: null,
      };

      const result = formData(event);

      expect(result).toEqual({});

      global.FormData = originalFormData;
    });

    it("should pass both target and submitter to FormData", () => {
      const mockFormData = new Map();
      const formDataSpy = vi.fn(() => mockFormData);

      global.FormData = formDataSpy;

      const target = {};
      const submitter = {};
      const event = { target, submitter };

      formData(event);

      expect(formDataSpy).toHaveBeenCalledWith(target, submitter);

      global.FormData = FormData;
    });
  });

  describe("Spark chaining", () => {
    it("should allow chaining stop and prevent", () => {
      const event = {
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
      };

      const result = prevent(stop(event));

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe(event);
    });

    it("should chain value extraction after prevent", () => {
      const event = {
        preventDefault: vi.fn(),
        target: { value: "chained value" },
      };

      // First prevent, then extract value
      prevent(event);
      const result = value(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(result).toBe("chained value");
    });

    it("should chain detail extraction after stop", () => {
      const event = {
        stopPropagation: vi.fn(),
        detail: { data: "important" },
      };

      // First stop, then extract detail
      stop(event);
      const result = detail(event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(result).toEqual({ data: "important" });
    });
  });
});
