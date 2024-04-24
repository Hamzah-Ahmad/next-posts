import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import TagPill from "./TagPill";

const PostLink = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/post/${post.id}`}
      key={post.id}
      className="block p-4 border-2 border-l-base-100 mb-10"
    >
      <div className="flex justify-between">
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
    </Link>
  );
};

export default PostLink;
