import { expect, test, vi } from "vitest";

import Page from "./page";

import { render, screen } from "@testing-library/react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

test("Page renders welcome heading and start button", () => {
  render(<Page />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /who wants to be a millionaire/i,
    }),
  ).toBeDefined();
  const buttons = screen.getAllByRole("button", { name: /Start/i });
  expect(buttons.length).toBeGreaterThan(0);
});
