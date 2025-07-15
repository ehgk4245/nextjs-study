"use client";

import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title?: string;
  body?: string;
}

interface Comment {
  id: number;
  contents: string;
  post_id: number;
}

function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: post, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();
      
      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", params.id);

      if (postError) {
        console.error("Error fetching post:", postError);
        alert("글을 불러오는 중 오류가 발생했습니다.");
        router.push("/posts");
        return;
      }

      setPost(post);
      setComments(comments || []);
    } catch (error) {
      console.error("Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
      router.push("/posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ 
          contents: newComment, 
          post_id: Number(params.id) 
        }])
        .select();

      if (error) {
        console.error("Error inserting comment:", error);
        alert("댓글 작성 중 오류가 발생했습니다.");
      } else {
        setNewComment("");
        // 댓글 목록 새로고침
        const { data: updatedComments } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", params.id);
        setComments(updatedComments || []);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

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
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">글을 찾을 수 없습니다</h2>
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
        {/* 글 내용 */}
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

        {/* 댓글 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">💬</span>
            댓글 ({comments.length})
          </h2>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                댓글 작성
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                placeholder="댓글을 입력하세요..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>작성 중...</span>
                </>
              ) : (
                <>
                  <span>📤</span>
                  <span>댓글 작성</span>
                </>
              )}
            </button>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">💭</div>
                <p>아직 댓글이 없습니다.</p>
                <p className="text-sm">첫 번째 댓글을 남겨보세요!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">👤</div>
                    <div className="flex-1">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {comment.contents}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        댓글 ID: {comment.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
