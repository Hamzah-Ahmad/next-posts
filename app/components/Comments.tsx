import { Comment } from "@prisma/client";
import React from "react";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </>
  );
};

export default Comments;
