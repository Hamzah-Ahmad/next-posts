import { Comment } from "@prisma/client";
import React from "react";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      {comments.map((comment) => (
        <div>{comment.content}</div>
      ))}
    </>
  );
};

export default Comments;
