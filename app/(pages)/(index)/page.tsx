import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Post, Prisma } from "@prisma/client";

import PostList from "@/app/components/PostsList";
import Pagination from "@/app/components/Pagination";

export type PostsSearchParamsType = {
  page?: string;
  tags: string;
};
async function getAllPostsAndCount(
  searchParams: PostsSearchParamsType,
  postsPerPage = 2
): Promise<[Post[], number]> {
  const { page, tags } = searchParams;
  const where: Prisma.PostWhereInput = {
    AND: [
      tags
        ? {
            tags: {
              hasSome: tags.split(","),
            },
          }
        : {},
    ],
  };
  const postsQuery = prisma.post.findMany({
    where: where,
    orderBy: {
      createdAt: "asc",
    },
    skip: ((page ? parseInt(page) : 1) - 1) * postsPerPage,
    take: postsPerPage,
  });
  const countQuery = prisma.post.count({ where });

  const [posts, count] = await Promise.all([postsQuery, countQuery]);

  return [posts, count];
}

export default async function Home({
  searchParams,
}: {
  searchParams: PostsSearchParamsType;
}) {
  const postsPerPage = 2;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const [posts, count] = await getAllPostsAndCount(searchParams, postsPerPage);
  if (!posts) notFound();
  return (
    <main className="w-full">
      <PostList posts={posts} />

      <Pagination count={count} limit={postsPerPage} page={page} />
    </main>
  );
}
