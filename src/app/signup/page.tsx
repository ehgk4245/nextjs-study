"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

function Signup() {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await signUp(email, password);

    if (error) {
      console.error("Error signing up:", error);
      alert("회원가입 중 오류가 발생했습니다.");
      setEmail("");
      setPassword("");
    } else {
      alert("회원가입이 완료되었습니다!");
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">👤 회원가입</h1>
          <p className="text-lg text-gray-600">
            블로그에 가입하고 다양한 기능을 이용해보세요
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                📧 이메일
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="EMAIL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                🔒 비밀번호
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="PASSWORD"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>가입 중...</span>
                </>
              ) : (
                <>
                  <span>📝</span>
                  <span>회원가입</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center space-x-1"
          >
            <span>←</span>
            <span>메인 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
