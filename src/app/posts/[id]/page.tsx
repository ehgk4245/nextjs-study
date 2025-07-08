"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${params.id}`)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, []);

  return (
    <>
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </>
  );
}

export default PostDetail;
