import { z } from "zod";
import { CreatePostSchema } from "./CreatePostSchema";

export const EditPostSchema = CreatePostSchema.partial();

export type EditPostType = z.infer<typeof EditPostSchema>;
