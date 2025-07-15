import React from "react";
import { usePost } from "@/context/PostProvider";
import { useRouter } from "next/navigation";

const Post: React.FC = () => {
  const { post } = usePost();
  const router = useRouter();

  if (!post) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">📄</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            ID: {post.id}
          </span>
        </div>
        <button
          onClick={() => router.push("/posts")}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← 목록으로
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {post.title || "제목 없음"}
      </h1>
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
          {post.body || "내용이 없습니다."}
        </div>
      </div>
    </div>
  );
};

export default Post;
