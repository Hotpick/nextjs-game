import { describe, expect, it } from "vitest";

import PrizeLadder from "./PrizeLadder";

import { render, screen } from "@testing-library/react";

const prizes = [500, 1000, 2000];

describe("PrizeLadder", () => {
  it("renders all prizes", () => {
    render(<PrizeLadder prizes={prizes} currentIndex={0} />);
    expect(screen.getByText("$500")).toBeDefined();
    expect(screen.getByText("$1,000")).toBeDefined();
    expect(screen.getByText("$2,000")).toBeDefined();
  });

  it("renders prizes in reverse order (highest first)", () => {
    render(<PrizeLadder prizes={prizes} currentIndex={0} />);
    const items = screen.getAllByText(/^\$\d/);
    expect(items[0].textContent).toBe("$2,000");
    expect(items[1].textContent).toBe("$1,000");
    expect(items[2].textContent).toBe("$500");
  });

  it("renders single prize", () => {
    render(<PrizeLadder prizes={[1000000]} currentIndex={0} />);
    expect(screen.getByText("$1,000,000")).toBeDefined();
  });
});
