import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import formData from "./formData";

describe("formData", () => {
  let originalFormData;

  beforeEach(() => {
    originalFormData = global.FormData;
  });

  afterEach(() => {
    global.FormData = originalFormData;
  });

  it("should convert FormData to a plain object", () => {
    const mockFormData = new Map([
      ["username", "john"],
      ["email", "john@example.com"],
    ]);

    global.FormData = class {
      // biome-ignore lint/correctness/noConstructorReturn: Mock needs to return Map for testing
      constructor() {
        return mockFormData;
      }
    };

    const event = {
      target: {},
      submitter: null,
    };

    const result = formData(event);

    expect(result).toEqual({
      username: "john",
      email: "john@example.com",
    });
  });

  it("should handle empty forms", () => {
    const mockFormData = new Map();
    global.FormData = class {
      // biome-ignore lint/correctness/noConstructorReturn: Mock needs to return Map for testing
      constructor() {
        return mockFormData;
      }
    };

    const event = {
      target: {},
      submitter: null,
    };

    const result = formData(event);

    expect(result).toEqual({});
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
  });

  it("should handle multiple form fields", () => {
    const mockFormData = new Map([
      ["firstName", "John"],
      ["lastName", "Doe"],
      ["email", "john.doe@example.com"],
      ["age", "30"],
    ]);

    global.FormData = class {
      // biome-ignore lint/correctness/noConstructorReturn: Mock needs to return Map for testing
      constructor() {
        return mockFormData;
      }
    };

    const event = {
      target: {},
      submitter: null,
    };

    const result = formData(event);

    expect(result).toEqual({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: "30",
    });
  });

  it("should handle form with different field types", () => {
    const mockFormData = new Map([
      ["username", "testuser"],
      ["email", "test@example.com"],
      ["agree", "yes"],
      ["category", "science"],
      ["comments", "This is a comment"],
    ]);

    global.FormData = class {
      // biome-ignore lint/correctness/noConstructorReturn: Mock needs to return Map for testing
      constructor() {
        return mockFormData;
      }
    };

    const event = {
      target: {},
      submitter: null,
    };

    const result = formData(event);

    expect(result).toHaveProperty("username", "testuser");
    expect(result).toHaveProperty("email", "test@example.com");
    expect(result).toHaveProperty("agree", "yes");
    expect(result).toHaveProperty("category", "science");
    expect(result).toHaveProperty("comments", "This is a comment");
  });
});
