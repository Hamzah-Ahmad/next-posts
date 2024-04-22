import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="block p-4">{post.title}</Link>
      ))}
    </div>
  );
};

export default PostList;
