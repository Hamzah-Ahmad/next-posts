"use client";
import React, { useState } from "react";
import { deleteComment } from "@/app/_actions";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);

    const res = await deleteComment(commentId);
    if(res?.error) {
      setIsLoading(false);
    }
  }
  return (
    <button onClick={handleDelete} disabled={isLoading} className="disabled:opacity-40 disabled:cursor-wait">
      <XMarkIcon className="h-6" />
    </button>
  );
};

export default DeleteCommentButton;
