"use client";
import { EditPostSchema, EditPostType } from "@/app/schemas/EditPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { createPost, editPost } from "@/app/_actions";
import { Post } from "@prisma/client";
import TagsInput from "../TagsInput";
import useTriggerFormError from "@/app/_hooks/useTriggerFormError";
import { toast } from "sonner";

const EditPostForm = ({ post }: { post: Post }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<EditPostType>({
    resolver: zodResolver(EditPostSchema),
  });

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setValue("content", post.content);
    setValue("tags", post.tags);
  }, [post.content, post.tags]);

  useTriggerFormError(errors);
  const onSubmit: SubmitHandler<EditPostType> = async (data) => {
    // Explanation:
    // Explanation comments have been added for reference in the onSubmit function in the CreatePostForm file.
    if (data.content?.replace(/<(.|\n)*?>/g, "") === "") {
      setError("content", {
        message: "Content body is required",
      });
      return;
    }
    startTransition(async () => {
      const res = await editPost(post.id, data);
      if (res?.error) {
        // Explanation:
        // Explanation of using `as string` is provided in CreaatePostForm.
        toast.error(res?.error as string);
      }
    });
  };

  const selectedTags = watch("tags");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          {...register("title")}
          placeholder="Title"
          className="mb-10 text-4xl w-full outline-0 text-slate-700 bg-gray-50"
          defaultValue={post.title}
        />
        <TagsInput
          defaultValue={post.tags}
          selectedTags={selectedTags}
          setSelectedTags={(e) => setValue("tags", e)}
        />
        <div className="mt-10" />
        <Editor
          handleChange={(val: string) => setValue("content", val)}
          defaultValue={post.content}
        />
        <button
          className="mt-10 flex self-end text-lg disabled:opacity-40 disabled:cursor-wait bg-neutral-950 text-white p-2 rounded-lg"
          disabled={isPending}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditPostForm;
