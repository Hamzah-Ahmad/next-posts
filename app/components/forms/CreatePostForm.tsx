"use client";
import {
  CreatePostSchema,
  CreatePostType,
} from "@/app/schemas/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";
import { createPost } from "@/app/_actions";

const CreatePostForm = () => {
  const { register, setValue, handleSubmit } = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
  });

  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    // Reference video for explanation of using RFH and Zod along with server actions: https://www.youtube.com/watch?v=R_Pj593TH_Q
    createPost(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="Title" className="mb-10 text-4xl w-full outline-0 text-slate-700" />
        <Editor handleChange={(val: string) => setValue("content", val)} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default CreatePostForm;
