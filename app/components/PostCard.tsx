import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import TagPill from "./TagPill";
import { UserIcon } from "@heroicons/react/20/solid";
import { PostWithDataType } from "../(pages)/posts/page";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

const PostCard = ({ post }: { post: PostWithDataType }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      key={post.id}
      className="block p-4 border-2 border-l-base-100 mb-10"
    >
      <div className="flex flex-col md:flex-row mt-2 md:mt-0 justify-between">
        <h3 className="text-base-100 text-xl font-bold">{post.title}</h3>
        <ul className="flex gap-x-2">
          {post.tags?.slice(0, 2)?.map((tag, i) => (
            <li className="list-none" key={tag + i}>
              <TagPill tag={tag} />
            </li>
          ))}
          {post.tags?.length > 2 && (
            <div className="group relative w-max">
              <span className="text-base-100">+</span>
              <span className="bg-base-100 p-2 text-white pointer-events-none absolute top-10 -left-4 w-max opacity-0 transition-opacity group-hover:opacity-100 rounded-md">
                {post.tags?.splice(2)?.map((tag, i) => (
                  <li key={tag + i} className="text-xs">
                    {tag}
                  </li>
                ))}
              </span>
            </div>
          )}
        </ul>
      </div>
      <div className="flex mt-4 gap-x-8">
        <div className="flex items-center gap-x-1 min-w-[112px]">
          <UserIcon className="h-4" />
          <span className="text-sm">{post.author?.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-x-1">
          <ChatBubbleOvalLeftEllipsisIcon className="h-4" />
          <span className="text-sm font-medium">{post._count?.comments}</span>
        </div>
        <div className="hidden md:flex items-center gap-x-1">
          <span className="text-sm">Last Update:</span>
          <span className="text-sm font-semibold underline">
            {post.updatedAt?.getDate()}/{post.updatedAt?.getMonth()}/
            {post.updatedAt?.getUTCFullYear()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
