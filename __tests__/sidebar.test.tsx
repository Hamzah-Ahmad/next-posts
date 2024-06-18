import { mockRouter } from "@/__mocks__/next-navigation";
import mockPrismaClient from "@/__mocks__/prisma";
import Home from "@/app/(pages)/posts/page";
import Sidebar from "@/app/components/Sidebar";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => mockRouter);

describe("Sidebar", () => {
  it("renders a heading", () => {
    render(<Sidebar />);

    const text = screen.getByPlaceholderText(/Search by title/i)
    expect(text).toBeDefined();
  });
  it("renders a tags filter", () => {
    render(<Sidebar />);

    const text = screen.getByText(/Tags/i)
    expect(text).toBeDefined();
  });
});
