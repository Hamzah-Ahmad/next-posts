import { mockRouter } from "@/__mocks__/next-navigation";
import mockPrismaClient from "@/__mocks__/prisma";
import Home from "@/app/(pages)/posts/page";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => mockRouter);
// Jest mock explanation: Jason's answer here: https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  };
});
describe("Home Page", () => {
  const allPosts = [
    {
      id: Math.random().toString(),
      authorId: Math.random().toString(),
      content: "React post content",
      title: "Dummy React Post",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["coding"],
    },
    {
      id: Math.random().toString(),
      authorId: Math.random().toString(),
      content: "Placeholder weather predictions",
      title: "Weather predictions this week",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["news"],
    },
  ];
  it("Checks for presence of react post", async () => {
    mockPrismaClient.post.findMany.mockResolvedValue(allPosts);
    render(await Home({ searchParams: {} }));

    const elem = screen.getByText(/react/i);
    expect(elem).toBeDefined();
  });

});
