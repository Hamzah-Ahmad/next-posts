"use client";
import { EditPostSchema, EditPostType } from "@/app/schemas/EditPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { createPost, editPost } from "@/app/_actions";
import { Post } from "@prisma/client";

const EditPostForm = ({ post }: { post: Post }) => {
  const { register, setValue, handleSubmit } = useForm<EditPostType>({
    resolver: zodResolver(EditPostSchema),
  });

  useEffect(() => {
    setValue("content", post.content);
  }, [post.content]);

  const onSubmit: SubmitHandler<EditPostType> = async (data) => {
    const res = await editPost(post.id, data);
    if (res?.error) {
      alert(res?.error || "Something went wron!!g");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          placeholder="Title"
          className="mb-10 text-4xl w-full outline-0 text-slate-700"
          defaultValue={post.title}
        />
        <Editor
          handleChange={(val: string) => setValue("content", val)}
          defaultValue={post.content}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default EditPostForm;
