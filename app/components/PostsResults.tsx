import { Post } from "@prisma/client";
import React from "react";

const PostsResults = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostsResults;
