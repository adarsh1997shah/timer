import { describe, it, expect, vi, beforeEach } from "vitest";
import { toast } from "sonner";

import { validateTimerForm } from "./validation";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

describe("validateTimerForm", () => {
  const defaultData = {
    title: "Test Timer",
    description: "Test description",
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Clear all mock calls before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return false and show an error if title is empty", () => {
    const data = { ...defaultData, title: " " };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("should return false and show an error if title exceeds 50 characters", () => {
    const data = { ...defaultData, title: "A".repeat(55) };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title must be less than 50 characters");
  });

  it("should return false and show an error if time values are negative", () => {
    const data = { ...defaultData, hours: -3, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("should return false and show an error if minutes or seconds exceed 59", () => {
    const data = { ...defaultData, minutes: 61, seconds: 0 };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Minutes and seconds must be between 0 and 59");
  });

  it("should return false and show an error if total time is zero", () => {
    const data = { ...defaultData, hours: 0, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Please set a time greater than 0");
  });

  it("should return false and show an error if total time exceeds 24 hours", () => {
    const data = { ...defaultData, hours: 27, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });

  it("should return true for valid data", () => {
    const data = { ...defaultData, hours: 2, minutes: 33, seconds: 11 };
    const result = validateTimerForm(data);

    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
