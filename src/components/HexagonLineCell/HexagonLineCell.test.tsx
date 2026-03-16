import { describe, expect, it, vi } from "vitest";

import HexagonLineCell from "./HexagonLineCell";

import { render, screen } from "@testing-library/react";

describe("HexagonLineCell", () => {
  it("renders as div when no onClick is provided", () => {
    const { container } = render(<HexagonLineCell>Content</HexagonLineCell>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as button when onClick is provided", () => {
    const { container } = render(
      <HexagonLineCell onClick={() => {}}>Content</HexagonLineCell>,
    );
    expect(container.firstChild?.nodeName).toBe("BUTTON");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<HexagonLineCell onClick={handleClick}>Click me</HexagonLineCell>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders children", () => {
    render(<HexagonLineCell>Hello</HexagonLineCell>);
    expect(screen.getByText("Hello")).toBeDefined();
  });

  it("respects disabled prop", () => {
    render(
      <HexagonLineCell onClick={() => {}} disabled>
        Disabled
      </HexagonLineCell>,
    );
    expect(screen.getByRole("button").disabled).toBe(true);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <HexagonLineCell onClick={handleClick} disabled>
        Disabled
      </HexagonLineCell>,
    );
    screen.getByRole("button").click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
