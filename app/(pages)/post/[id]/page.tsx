import Comments from "@/app/components/Comments";
import CommentsInput from "@/app/components/CommentsInput";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { prisma } from "@/lib/prisma";
import React from "react";

function getPost(id: string) {
  return prisma.post.findFirst({ where: { id }, include: { comments: true } });
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
  if (!post) return <div>Post Not Found</div>;

  return (
    <div>
      <h1 className="text-4xl mb-4 font-semibold">{post.title}</h1>
      <MarkdownRenderer content={post.content} />

      <CommentsInput postId={post.id} />

      <div className="mt-20" />
      <Comments comments={post.comments} />
    </div>
  );
};

export default PostPage;
