import { Post } from "@prisma/client";
import React from "react";
import PostCard from "./PostCard";
import { PostWithDataType } from "../(pages)/posts/page";

const PostList = ({ posts }: { posts: PostWithDataType[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
