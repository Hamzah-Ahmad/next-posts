import Comments from "@/app/components/Comments";
import CommentsInput from "@/app/components/CommentsInput";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

import "react-quill/dist/quill.snow.css";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Comment, Post } from "@prisma/client";

export type CommentsWithCommenterInfo = (Comment & {
  commenter: { name: string; id: string };
})[];
type PostWithComments = ({ comments: CommentsWithCommenterInfo } & Post) | null;

function getPost(id: string): Promise<PostWithComments | null> {
  return prisma.post.findFirst({
    where: { id },
    include: {
      comments: {
        include: {
          commenter: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => ({ id: post.id }));
}
const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const session = await getServerSession(authOptions);
  if (!post) return <div>Post Not Found</div>;

  return (
    <div className="px-4">
      <div className="flex w-full justify-between items-start">
        <h1 className="text-4xl mb-4 font-semibold max-w-6xl">{post.title}</h1>
        {session?.user?.id === post.authorId && (
          <Link href={`/post/${post.id}/edit`}>
            <PencilSquareIcon className="h-6" />
          </Link>
        )}
      </div>
      <MarkdownRenderer content={post.content} />

      <CommentsInput postId={post.id} />

      <div className="mt-20" />
      <Comments
        comments={post.comments}
        isPostAuthor={!!(session && post.authorId === session?.user.id)}
      />
    </div>
  );
};

export default PostPage;
