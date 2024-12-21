import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { X } from "lucide-react";

import Button from "./Button";

describe("Button Component", () => {
  const handleClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Reset the mock function between tests
  });

  it("renders the Button with children", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with the primary variant by default", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("bg-blue-600 hover:bg-blue-700 text-white");
  });

  it("renders with the secondary variant", () => {
    render(<Button variant="secondary">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("text-gray-700 bg-gray-100 hover:bg-gray-200");
  });

  it("renders the Icon alongside the children", () => {
    render(<Button Icon={<X className="w-5 h-5" data-testid="close-icon" />}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    const icon = screen.getByTestId("close-icon");

    expect(button).toContainElement(icon);
  });

  it("disables the button when isDisabled is true", () => {
    render(
      <Button isDisabled onClick={handleClick}>
        Click Me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with the specified type attribute", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toHaveClass("custom-class");
  });
});
