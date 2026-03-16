import { describe, expect, it, vi } from "vitest";

import AnswerOption from "./AnswerOption";

import { render, screen } from "@testing-library/react";

describe("AnswerOption", () => {
  it("renders children", () => {
    render(
      <AnswerOption state="inactive" onClick={() => {}}>
        Answer A
      </AnswerOption>,
    );
    expect(screen.getByText("Answer A")).toBeDefined();
  });

  it("renders as a button", () => {
    render(
      <AnswerOption state="inactive" onClick={() => {}}>
        Answer
      </AnswerOption>,
    );
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <AnswerOption state="inactive" onClick={handleClick}>
        Answer
      </AnswerOption>,
    );
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <AnswerOption state="inactive" onClick={handleClick} disabled>
        Answer
      </AnswerOption>,
    );
    screen.getByRole("button").click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it.each(["inactive", "selected", "correct", "wrong"] as const)(
    "renders without error in %s state",
    (state) => {
      const { container } = render(
        <AnswerOption state={state} onClick={() => {}}>
          Answer
        </AnswerOption>,
      );
      expect(container.firstChild).toBeDefined();
    },
  );

  it("applies correct CSS variable for inactive state", () => {
    render(
      <AnswerOption state="inactive" onClick={() => {}}>
        Answer
      </AnswerOption>,
    );
    const button = screen.getByRole("button");
    expect(button.getAttribute("style")).toContain("--button-border-color");
  });
});
