"use client";
import React, { useEffect, useRef } from "react";
// @ts-expect-error
import { useFormState } from "react-dom";

import { addComment } from "@/app/_actions";

const CommentsInput = ({ postId }: { postId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
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
    <form ref={formRef} action={formAction}>
      <input name="content" placeholder="Add Comment" />
      <button>Submit</button>
    </form>
  );
};

export default CommentsInput;
