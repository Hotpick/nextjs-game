import { beforeEach, describe, expect, it, vi } from "vitest";

import ResultPage from "./page";

import { render, screen } from "@testing-library/react";

const mockPush = vi.fn();
const mockReset = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const mockUseGame = vi.fn();
vi.mock("@/context/GameContext", () => ({
  useGame: () => mockUseGame() as unknown,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ResultPage", () => {
  it("redirects to / and renders nothing when status is idle", () => {
    mockUseGame.mockReturnValue({
      state: { status: "idle", earnedPrize: 0 },
      reset: mockReset,
    });
    const { container } = render(<ResultPage />);
    expect(container.firstChild).toBeNull();
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("shows congratulations message when game is won", () => {
    mockUseGame.mockReturnValue({
      state: { status: "won", earnedPrize: 1000000 },
      reset: mockReset,
    });
    render(<ResultPage />);
    expect(
      screen.getByText(/congratulations! you are a millionaire!/i),
    ).toBeDefined();
  });

  it("shows earned prize when game is lost", () => {
    mockUseGame.mockReturnValue({
      state: { status: "lost", earnedPrize: 32000 },
      reset: mockReset,
    });
    render(<ResultPage />);
    expect(screen.getByText(/\$32,000 earned/i)).toBeDefined();
  });

  it("shows $0 earned when lost on first question", () => {
    mockUseGame.mockReturnValue({
      state: { status: "lost", earnedPrize: 0 },
      reset: mockReset,
    });
    render(<ResultPage />);
    expect(screen.getByText(/\$0 earned/i)).toBeDefined();
  });

  it("renders Try Again button", () => {
    mockUseGame.mockReturnValue({
      state: { status: "won", earnedPrize: 1000000 },
      reset: mockReset,
    });
    render(<ResultPage />);
    expect(screen.getByRole("button", { name: /try again/i })).toBeDefined();
  });

  it("calls reset and navigates to /game when Try Again is clicked", () => {
    mockUseGame.mockReturnValue({
      state: { status: "won", earnedPrize: 1000000 },
      reset: mockReset,
    });
    render(<ResultPage />);
    screen.getByRole("button", { name: /try again/i }).click();
    expect(mockReset).toHaveBeenCalledOnce();
    expect(mockPush).toHaveBeenCalledWith("/game");
  });
});
