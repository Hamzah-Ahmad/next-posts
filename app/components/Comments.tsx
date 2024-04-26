import React from "react";
import { CommentsWithCommenterInfo } from "../(pages)/post/[id]/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteComment } from "../_actions";
import DeleteCommentButton from "./DeleteCommentButton";

const Comments = async ({
  comments,
  isPostAuthor = false,
}: {
  comments: CommentsWithCommenterInfo;
  isPostAuthor: boolean;
}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-y-8 mb-10">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-2 border-zinc-300 rounded-md p-3 w-full flex justify-between items-start"
        >
          <div>
            <div className="font-bold mb-2">{comment.commenter?.name}</div>
            <div>{comment.content}</div>
          </div>
          {session &&
            (comment.commenter?.id === session.user?.id || isPostAuthor) && (
              <DeleteCommentButton commentId={comment.id} />
            )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
