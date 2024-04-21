import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { prisma } from "@/lib/prisma";
import React from "react";

function getPost(id: string) {
  return prisma.post.findFirst({ where: { id } });
}
const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  if (!post) return <div>Post Not Found</div>;

  return <div>
    <h1 className="text-4xl mb-4 font-semibold">{post.title}</h1>
    <MarkdownRenderer content={post.content} />
  </div>;
};

export default PostPage;
