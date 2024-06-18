import { mockRouter } from "@/__mocks__/next-navigation";
import mockPrismaClient from "@/__mocks__/prisma";
import PostPage from "@/app/(pages)/post/[id]/page";
import Home from "@/app/(pages)/posts/page";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

// Explanation: References for a few issues and their possible solutions:
// https://github.com/nextauthjs/next-auth/issues/4866#issuecomment-1295803393
// https://stackoverflow.com/questions/76608600/jest-tests-are-failing-because-of-an-unknown-unexpected-token-export (Danny's answer)

// Mocking next/headers dynamic API
// jest.mock("next/headers", () => {
//   return {
//     cookies: jest.fn(() => ({
//       getAll: jest.fn(() => ["cookie1", "cookie2"]),
//     })),
//     headers: jest.fn(() => ({
//       get: jest.fn(() => "user-agent-string"),
//     })),
//   };
// });
jest.mock("next-auth", () => {
  return {
    getServerSession: jest.fn(() => ({
      user: {
        name: "John Doe",
        email: "john@email.com",
        image: undefined,
        id: "e1b3cb1a-5dd6-4e36-9d44-f5d7f7b6bb2a",
      },
    })),
  };
});

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => [() => {}, null],
  useFormStatus: () =>( {}),
}));

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  };
});
// Explanation: Mocking Comments component because it is a server component and was causing errors while testing the parent Post component
jest.mock('../app/components/Comments', () => () => <div>Comments</div>);


describe("Post Page", () => {
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
  it("Checks submit button enable and disable", async () => {
    userEvent.setup();
    mockPrismaClient.post.findFirst.mockResolvedValue(allPosts[0]);
    render(await PostPage({ params: {id: ""} }));
    const submitBtn = screen.getByText(/Submit/i);
    expect(submitBtn).toBeDefined();
    expect(submitBtn).toBeDisabled();
    const commentInput = screen.getByPlaceholderText(/Add Comment/);
    expect(commentInput).toBeDefined();
    await userEvent.type(commentInput, "Test content");
    expect(submitBtn).toBeEnabled();
  });

});
