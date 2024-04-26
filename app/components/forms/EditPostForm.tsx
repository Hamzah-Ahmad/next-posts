"use client";
import { EditPostSchema, EditPostType } from "@/app/schemas/EditPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { createPost, editPost } from "@/app/_actions";
import { Post } from "@prisma/client";
import TagsInput from "../TagsInput";

const EditPostForm = ({ post }: { post: Post }) => {
  const { register, setValue, handleSubmit, watch } = useForm<EditPostType>({
    resolver: zodResolver(EditPostSchema),
  });

  useEffect(() => {
    setValue("content", post.content);
    setValue("tags", post.tags);
  }, [post.content, post.tags]);

  const onSubmit: SubmitHandler<EditPostType> = async (data) => {
    const res = await editPost(post.id, data);
    if (res?.error) {
      alert(res?.error || "Something went wron!!g");
    }
  };

  const selectedTags = watch("tags");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          placeholder="Title"
          className="mb-10 text-4xl w-full outline-0 text-slate-700"
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
        <button className="mt-10">Submit</button>
      </form>
    </>
  );
};

export default EditPostForm;
