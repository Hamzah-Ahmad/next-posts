import Comments from "@/app/components/Comments";
import CommentsInput from "@/app/components/CommentsInput";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { cache } from "react";

import "react-quill/dist/quill.snow.css";

import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Comment, Post } from "@prisma/client";
import TagPill from "@/app/components/TagPill";

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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return {
    title: post?.title || "Next Posts",
  };
}
const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const session = await getServerSession(authOptions);
  if (!post) return <div>Post Not Found</div>;

  return (
    <div className="px-4">
      <Link href="/">
        <ArrowLeftIcon className="h-5 mb-4" />
      </Link>
      <div className="flex w-full justify-between items-start">
        <h1 className="text-4xl mb-4 font-semibold max-w-6xl">{post.title}</h1>
        {session?.user?.id === post.authorId && (
          <Link href={`/post/${post.id}/edit`}>
            <PencilSquareIcon className="h-6" />
          </Link>
        )}
      </div>
      <div className="flex gap-x-2 gap-y-2 w-full flex-wrap">
        {post.tags?.map((tag) => (
          <TagPill tag={tag} key={tag} />
        ))}
      </div>
      <MarkdownRenderer content={post.content} />
      <div className="mt-10" />
      {session?.user && <CommentsInput postId={post.id} />}
      <h6 className="mb-6 text-xl">Comments</h6>

      <Comments
        comments={post.comments}
        isPostAuthor={!!(session && post.authorId === session?.user.id)}
      />
    </div>
  );
};

export default PostPage;
