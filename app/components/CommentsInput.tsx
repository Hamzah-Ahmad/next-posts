"use client";
import React, { useEffect, useRef, useState } from "react";
// @ts-expect-error
import { useFormState } from "react-dom";

import { addComment } from "@/app/_actions";
import { toast } from "sonner";
import CommentSubmitButton from "./CommentSubmitButton";

const CommentsInput = ({ postId }: { postId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  // Using useFormState because we need to access return value from the action
  const [formState, formAction] = useFormState(
    addComment.bind(null, postId),
    null
  );
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
