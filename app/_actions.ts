"use server";

import { redirect } from "next/navigation";
import { CreatePostSchema, CreatePostType } from "./schemas/CreatePostSchema";
import { prisma } from "@/lib/prisma";
import { ZodFormattedError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from "next/cache";

export async function createPost(data: CreatePostType): Promise<
  | {
      success: boolean;
      error:
        | string
        | ZodFormattedError<{ title: string; content: string }, string>;
    }
  | undefined
> {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return { success: false, error: "Please login to create a post" };
  }
  const parseResult = CreatePostSchema.safeParse(data); //Validating backend in addition to the RHF frontend form validation

  if (!parseResult.success) {
    return { success: false, error: parseResult.error.format() };
  }
  let newPostId = undefined;
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: session?.user.id,
      },
    });
    newPostId = newPost.id;

    // Cannot use redirect here as it throws an error which then triggers the catch block.
    // Mentioned in docs as "In Server Actions and Route Handlers, redirect should be called after the try/catch block.": https://nextjs.org/docs/app/api-reference/functions/redirect
    // redirect(`/post/${newPost.id}`);
  } catch (err) {
    console.error(err);
    return { success: false, error: "Something went wrong" };
  }

  redirect(`/post/${newPostId}`);
}

export async function addComment(
  postId: any,
  prevState: any,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
  const commentText = formData.get("content");
  if (!commentText || typeof commentText !== "string") {
    return { success: false, error: "Please login to create a post" };
  }
  if (!session?.user.id) {
    return { success: false, error: "Please login to create a post" };
  }
  if (!postId) {
    return { success: false, error: "Post Not Found" };
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
    return { success: false, error: "Something went wrong" };
  }

  revalidatePath(`/post/${postId}`)
}
