import { Post } from "@prisma/client";
import React from "react";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostList;
