import EditPostForm from "@/app/components/forms/EditPostForm";
import { prisma } from "@/lib/prisma";
import React from "react";

function getPost(id: string) {
  return prisma.post.findFirst({ where: { id }, include: { comments: true } });
}

const EditPost = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  if (!post) return <div>Post Not Found</div>;

  return <EditPostForm post={post} />;
};

export default EditPost;
