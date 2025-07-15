"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    })

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [])
  
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <></>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              📝 블로그
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
            >
              🏠 메인
            </Link>
            <Link 
              href="/posts" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
            >
              📚 글 목록
            </Link>
            <Link 
              href="/posts/new" 
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              ✏️ 새 글 작성
            </Link>

            {user ? (<>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              🔓 로그아웃
            </button>
            </>) : (<>
              <Link 
              href="/login" 
              className="bg-orange-600 hover:bg-orange-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              🔐 로그인
            </Link>
            <Link 
              href="/signup" 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              👤 회원가입
            </Link>
            </>)}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Nav