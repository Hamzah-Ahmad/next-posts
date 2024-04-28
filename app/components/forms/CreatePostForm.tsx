"use client";
import {
  CreatePostSchema,
  CreatePostType,
} from "@/app/schemas/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { createPost } from "@/app/_actions";
import TagsInput from "../TagsInput";
import useTriggerFormError from "@/app/_hooks/useTriggerFormError";

const CreatePostForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
  });

  const [isPending, startTransition] = useTransition();
  useTriggerFormError(errors);
  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    // Reference video for explanation of using RFH and Zod along with server actions: https://www.youtube.com/watch?v=R_Pj593TH_Q
    startTransition(async () => {
      const res = await createPost(data);
      if (res?.error) {
        alert(res?.error || "Something went wrong");
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
        />

        <TagsInput
          setSelectedTags={(e: string[]) => setValue("tags", e)}
          selectedTags={selectedTags}
        />
        <div className="mt-10" />
        <Editor handleChange={(val: string) => setValue("content", val)} />
        <div className="mt-10" />
        <button
          className="flex self-end text-lg disabled:opacity-40 disabled:cursor-wait bg-neutral-950 text-white p-2 rounded-lg"
          disabled={isPending}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePostForm;
