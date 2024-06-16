"use client";
import React, { useEffect, useRef, useState } from "react";
// @ts-expect-error
import { useFormState } from "react-dom";

import { addComment } from "@/app/_actions";
import { toast } from "sonner";
import CommentSubmitButton from "./CommentSubmitButton";

const CommentsInput = ({ postId }: { postId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  // Explanation:
  // Using useFormState because we need the formState for loading status, and the result.
  // The result can also be achieved without using useFormStatus. But it is preferred to use the hooks. 
  // More explanation below
  const [formState, formAction] = useFormState(
    addComment.bind(null, postId),
    null
  );

  // Explanation:
  // We can also submit the naive way using code similar to below. The `res` property does get the data back
  // But it is not as clean.
  // Also, the state change happens AFTER the submission is complete. So loading state UI is not updated correctly
  //   <form
  //   ref={formRef}
  //   action={async(data) => {
  //     setIsLoading(true);
  //     const res = await addComment(postId, null, data);
  //     console.log("res: ", res)
  //     setIsLoading(false)
  //   }}
  // >

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState.error || "Something went wrong");
    } else {
      formRef.current?.reset();
    }
  }, [formState]);
  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col items-end gap-y-4"
    >
      <textarea
        rows={3}
        name="content"
        onChange={(e) => setCommentText(e.target?.value)}
        placeholder="Add Comment"
        className="border-base-light w-full border-2 resize-none rounded-lg p-4"
      />
      <CommentSubmitButton disabled={!commentText}>Submit</CommentSubmitButton>
    </form>
  );
};

export default CommentsInput;
