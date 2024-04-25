import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Post, Prisma } from "@prisma/client";

import PostList from "@/app/components/PostsList";
import Pagination from "@/app/components/Pagination";

export type PostWithDataType = {
  author: {
    name: string;
  };
  _count: {
    comments: number;
  };
} & Post;
export type PostsSearchParamsType = {
  page?: string;
  tags: string;
  search?: string;
};
async function getAllPostsAndCount(
  searchParams: PostsSearchParamsType,
  postsPerPage = 2
): Promise<[PostWithDataType[], number]> {
  const { page, tags, search } = searchParams;
  const where: Prisma.PostWhereInput = {
    AND: [
      tags
        ? {
            tags: {
              hasSome: tags.split(","),
            },
          }
        : {},
      search
        ? {
            title: { search },
          }
        : {},
    ],
  };
  const postsQuery: Prisma.PrismaPromise<PostWithDataType[]> =
    prisma.post.findMany({
      where: where,
      orderBy: {
        createdAt: "asc",
      },
      skip: ((page ? parseInt(page) : 1) - 1) * postsPerPage,
      take: postsPerPage,
      include: {
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
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
  const postsPerPage = 3;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const [posts, count] = await getAllPostsAndCount(searchParams, postsPerPage);
  if (!posts) notFound();
  return (
    <main className="w-full px-4 flex flex-col justify-between h-[635px] md:h-custom">
      <PostList posts={posts} />

      <Pagination count={count} limit={postsPerPage} page={page} />
    </main>
  );
}
