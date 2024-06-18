"use server";

import { redirect } from "next/navigation";
import { CreatePostSchema, CreatePostType } from "./schemas/CreatePostSchema";
import { prisma } from "@/lib/prisma";
import { ZodFormattedError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";
import { EditPostSchema, EditPostType } from "./schemas/EditPostSchema";

export async function createPost(data: CreatePostType): Promise<
  | {
      error:
        | string
        | ZodFormattedError<{ title: string; content: string }, string>;
    }
  | undefined
> {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return { error: "Please login to create a post" };
  }
  const parseResult = CreatePostSchema.safeParse(data); //Validating backend in addition to the RHF frontend form validation

  if (!parseResult.success) {
    return { error: parseResult.error.format() };
  }
  let newPostId = undefined;
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: session?.user.id,
        tags: data.tags,
      },
    });
    newPostId = newPost.id;

    // Cannot use redirect here as it throws an error which then triggers the catch block.
    // Mentioned in docs as "In Server Actions and Route Handlers, redirect should be called after the try/catch block.": https://nextjs.org/docs/app/api-reference/functions/redirect
    // redirect(`/post/${newPost.id}`);
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }

  redirect(`/post/${newPostId}`);
}

export async function editPost(
  postId: string,
  data: EditPostType
): Promise<
  | {
      error:
        | string
        | ZodFormattedError<{ title: string; content: string }, string>;
    }
  | undefined
> {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return { error: "Please login to edit a post" };
  }
  
  const parseResult = EditPostSchema.safeParse(data); //Validating backend in addition to the RHF frontend form validation

  if (!parseResult.success) {
    return { error: parseResult.error.format() };
  }

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return { error: "Post not found" };
    }
    return { error: "Something went wrong" };
  }

  redirect(`/post/${postId}`);
}

export async function addComment(
  postId: any,
  _: any,
  formData: FormData
): Promise<
  | {
      error: string;
    }
  | undefined
> {
  const session = await getServerSession(authOptions);
  const commentText = formData.get("content");
  if (!commentText || typeof commentText !== "string") {
    return { error: "Comment body cannot be empty" };
  }
  if (!session?.user.id) {
    return { error: "Please login to add a comment" };
  }
  if (!postId) {
    return { error: "Post Not Found" };
  }

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comments: {
          create: {
            content: commentText,
            commenterId: session.user.id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }

  revalidatePath(`/post/${postId}`);
}

export async function deleteComment(commentId: string): Promise<
  | {
      error: string;
    }
  | undefined
> {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      post: {
        select: {
          authorId: true,
        },
      },
    },
  });
  if (!session?.user.id) {
    return { error: "Comment not found" };
  }

  if (
    comment?.commenterId !== session?.user?.id &&
    comment?.post?.authorId !== session?.user.id
  ) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.comment.delete({ where: { id: commentId } });
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }

  revalidatePath(`/post/${comment.postId}`);
}
