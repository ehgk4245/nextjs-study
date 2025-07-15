"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { BeatLoader } from "react-spinners";

interface Post {
  id: number;
  title?: string;
  body?: string;
}

function Posts() {
  const fetchData = async () => {
    const { data, error } = await supabase.from("posts").select("*");
    setPosts(data || []);
    setLoading(false);
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 모든 글 목록
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 주제의 글들을 읽고 새로운 지식을 얻어보세요
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              아직 글이 없습니다
            </h3>
            <p className="text-gray-500 mb-6">첫 번째 글을 작성해보세요!</p>
            <Link
              href="/posts/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block"
            >
              ✏️ 새 글 작성하기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">📄</div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      ID: {post.id}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title || "제목 없음"}
                  </h2>

                  {post.body && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.body}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>📖 읽기</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/posts/new"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>✏️</span>
            <span>새 글 작성하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Posts;
