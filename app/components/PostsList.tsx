import { Post } from "@prisma/client";
import React from "react";
import PostLink from "./PostLink";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostLink post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
