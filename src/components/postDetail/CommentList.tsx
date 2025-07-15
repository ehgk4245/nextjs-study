import React from "react";
import { usePost } from "@/context/PostProvider";

const CommentList: React.FC = () => {
  const { comments } = usePost();

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">💭</div>
        <p>아직 댓글이 없습니다.</p>
        <p className="text-sm">첫 번째 댓글을 남겨보세요!</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
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
      ))}
    </div>
  );
};

export default CommentList;
