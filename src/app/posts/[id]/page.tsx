"use client";

import { PostProvider, usePost } from "@/context/PostProvider";
import Post from "@/components/postDetail/Post";
import CommentForm from "@/components/postDetail/CommentForm";
import CommentList from "@/components/postDetail/CommentList";
import { useRouter } from "next/navigation";

function PostDetailContent() {
  const router = useRouter();
  const { post, comments, isLoading } = usePost();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            글을 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 mb-6">요청하신 글을 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push("/posts")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            글 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Post />
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">💬</span>
            댓글 ({comments.length})
          </h2>
          <CommentForm />
          <CommentList />
        </div>
      </div>
    </div>
  );
}

export default function PostDetail() {
  return (
    <PostProvider>
      <PostDetailContent />
    </PostProvider>
  );
}
