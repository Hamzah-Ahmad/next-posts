import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import PostsResults from "@/app/components/PostsResults";
import { Post, Prisma, Tags } from "@prisma/client";

type SearchParamsType = {
  page?: string;
  tags: string;
};
function getAllPosts(searchParams: SearchParamsType) {
  const { page, tags } = searchParams;
  console.log("searchParams: ", searchParams);
  const where: Prisma.PostWhereInput = {
    AND: [
      tags
        ? {
            tags: {
              hasSome: tags.split(",") as Tags[],
            },
          }
        : {},
    ],
  };
  console.log("where: ", where);
  const LIMIT = 2;
  return prisma.post.findMany({
    where: where,
    orderBy: {
      createdAt: "asc",
    },
    skip: ((page ? parseInt(page) : 1) - 1) * LIMIT,
    take: LIMIT,
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const posts = await getAllPosts(searchParams);
  if (!posts) notFound();
  return (
    <main className="w-full">
      <PostsResults posts={posts} />
    </main>
  );
}
