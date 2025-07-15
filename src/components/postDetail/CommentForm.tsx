import React from "react";
import { usePost } from "@/context/PostProvider";

const CommentForm: React.FC = () => {
  const { newComment, setNewComment, isSubmitting, handleSubmitComment } = usePost();

  return (
    <form onSubmit={handleSubmitComment} className="mb-8">
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
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
  );
};

export default CommentForm;
