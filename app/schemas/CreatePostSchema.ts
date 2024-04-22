import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),

  content: z.string().min(1, "Content body is required"),
});

export type CreatePostType = z.infer<typeof CreatePostSchema>;
