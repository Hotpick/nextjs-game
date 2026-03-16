import { describe, expect, it } from "vitest";

import PrizeLadderItem from "./PrizeLadderItem";

import { render, screen } from "@testing-library/react";

describe("PrizeLadderItem", () => {
  describe("formatPrize", () => {
    it("formats thousands with comma separator", () => {
      render(<PrizeLadderItem prize={1000} state="future" />);
      expect(screen.getByText("$1,000")).toBeDefined();
    });

    it("formats one million correctly", () => {
      render(<PrizeLadderItem prize={1000000} state="current" />);
      expect(screen.getByText("$1,000,000")).toBeDefined();
    });

    it("formats zero", () => {
      render(<PrizeLadderItem prize={0} state="past" />);
      expect(screen.getByText("$0")).toBeDefined();
    });

    it("formats mid-range prize", () => {
      render(<PrizeLadderItem prize={32000} state="future" />);
      expect(screen.getByText("$32,000")).toBeDefined();
    });
  });

  describe("states", () => {
    it.each(["future", "current", "past"] as const)(
      "renders without error in %s state",
      (state) => {
        const { container } = render(
          <PrizeLadderItem prize={1000} state={state} />,
        );
        expect(container.firstChild).toBeDefined();
      },
    );
  });
});
