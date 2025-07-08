"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id} /{" "}
            <Link
              className="p-2 rounded hover:bg-red-100"
              href={`/posts/${post.id}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
