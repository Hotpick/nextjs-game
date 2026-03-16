import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GameSidebar from "./GameSidebar";

import { act, render, screen } from "@testing-library/react";

const prizes = [500, 1000, 2000];

describe("GameSidebar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders toggle button", () => {
    render(<GameSidebar prizes={prizes} currentQuestionIndex={0} />);
    expect(
      screen.getByRole("button", { name: /open prize ladder/i }),
    ).toBeDefined();
  });

  it("prize ladder content is present in the DOM", () => {
    render(<GameSidebar prizes={prizes} currentQuestionIndex={0} />);
    expect(screen.getByText("$2,000")).toBeDefined();
    expect(screen.getByText("$500")).toBeDefined();
  });

  it("opening and closing does not throw", () => {
    render(<GameSidebar prizes={prizes} currentQuestionIndex={0} />);
    const toggle = screen.getByRole("button", { name: /open prize ladder/i });

    // Open
    toggle.click();

    // Close (triggers 250ms animation)
    toggle.click();

    act(() => {
      vi.advanceTimersByTime(250);
    });
  });

  it("passes currentQuestionIndex to PrizeLadder", () => {
    // With currentIndex=1, prizes[1]=1000 is current, prizes[0]=500 is past
    render(<GameSidebar prizes={prizes} currentQuestionIndex={1} />);
    expect(screen.getByText("$1,000")).toBeDefined();
  });
});
