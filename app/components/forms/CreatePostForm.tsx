"use client";
import {
  CreatePostSchema,
  CreatePostType,
} from "@/app/schemas/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "../Editor";

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

  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} />
        <Editor handleChange={(val: string) => setValue("content", val)} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default CreatePostForm;
