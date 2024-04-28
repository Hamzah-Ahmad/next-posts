"use client";
import React, { useEffect, useRef } from "react";
// @ts-expect-error
import { useFormState } from "react-dom";

import { addComment } from "@/app/_actions";
import FormButton from "./CommentSubmitButton";

const CommentsInput = ({ postId }: { postId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  // Using useFormState because we need to access return value from the action
  const [formState, formAction] = useFormState(
    addComment.bind(null, postId),
    null
  );

  useEffect(() => {
    if (formState?.error) {
      console.log(formState.error || "Something went wrong");
    } else {
      formRef.current?.reset();
    }
  }, [formState]);
  return (
    <form ref={formRef} action={formAction} className="flex flex-col items-end gap-y-4">
      <textarea
        rows={3}
        name="content"
        placeholder="Add Comment"
        className="border-base-light w-full border-2 resize-none rounded-md p-4"
      />
      {/* <button>Submit</button> */}
      <FormButton>Submit</FormButton>
    </form>
  );
};

export default CommentsInput;
