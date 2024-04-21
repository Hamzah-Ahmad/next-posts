"use server";

import { redirect } from "next/navigation";
import { CreatePostSchema, CreatePostType } from "./schemas/CreatePostSchema";
import { prisma } from "@/lib/prisma";
import { ZodFormattedError } from "zod";

export async function createPost(data: CreatePostType): Promise<
  | {
      success: boolean;
      error:
        | string
        | ZodFormattedError<{ title: string; content: string }, string>;
    }
  | undefined
> {
  const parseResult = CreatePostSchema.safeParse(data); //Validating backend in addition to the RHF frontend form validation

  if (!parseResult.success) {
    console.log(parseResult.error.flatten());
    return { success: false, error: parseResult.error.format() };
  }
  let newPostId = undefined;
  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
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
