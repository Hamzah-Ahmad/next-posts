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
import { toast } from "sonner";

// Explanation:
// Following are some of the use cases of new hooks:

// useFormState ==> Returns a form action and state. The state is updated with the result of the form action when that form action is invoked. Basically, should be used when we need to use the data returned by the form action.

// useFormStatus ==> Returns the status information of the last form submission. Can only be used in components that are a child to a form. Meaning the component using the hook must be rendered within a form e.g. <form action={action}><Submit /></form> (From the reack docs)

// useTransition ==> In normal usecase, useTransition is a React Hook that lets you update the state without blocking the UI. The way used in the app is to get the form state. useFormState could not be used for this because it requires the action to be called as <form action={action}> in the form. However, in some cases in this codebase, we need to instead use the onSubmit in the form instead, to allow for Zod validation (explained in  more detail below). Also, setting normal isLoading, setIsLoading state works somewhat, but it has a small issue mentioned here: https://www.youtube.com/watch?v=GN-aVYSt3Ec

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
    // Explanation:
    // Reference video for explanation of using RFH and Zod along with server actions:
    // https://www.youtube.com/watch?v=R_Pj593TH_Q

    // Reference article for useTransition
    // https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus

    // Reference for why we are using useTransition and isPending instead of a normal isLoading variable:
    // https://www.youtube.com/watch?v=GN-aVYSt3Ec
    startTransition(async () => {
      const res = await createPost(data);
      if (res?.error) {
        // Explanation:
        // Without "as string", typescript was throwing an error because of the possibility og res.error being of type ZodError. However, Zod erros are already being handled by the custom hook above
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
