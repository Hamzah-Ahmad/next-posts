import EditPostForm from "@/app/components/forms/EditPostForm";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

function getPost(id: string) {
  return prisma.post.findFirst({ where: { id }, include: { comments: true } });
}

const EditPost = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const session = await getServerSession(authOptions);

  if (!post) return <div>Post Not Found</div>;

  if (session?.user.id !== post.authorId) notFound();

  return <EditPostForm post={post} />;
};

export default EditPost;
