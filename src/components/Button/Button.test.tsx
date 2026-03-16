import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button").disabled).toBe(true);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    screen.getByRole("button").click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has type=button by default", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button").type).toBe("button");
  });

  it("applies custom type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button").type).toBe("submit");
  });
});
