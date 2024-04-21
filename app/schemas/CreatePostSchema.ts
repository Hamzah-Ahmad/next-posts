import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().trim(),

  content: z.string(),
});

export type CreatePostType = z.infer<typeof CreatePostSchema>;
