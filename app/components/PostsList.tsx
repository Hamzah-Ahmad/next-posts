import { Post } from "@prisma/client";
import React from "react";
import PostCard from "./PostCard";
import { PostWithDataType } from "../(pages)/posts/page";

const PostList = ({ posts }: { posts: PostWithDataType[] }) => {
  if (posts?.length < 1) {
    return (
      <div className="flex justify-center w-full h-32 items-center text-base-100 text-lg">
        No Posts Found
      </div>
    );
  }
  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
