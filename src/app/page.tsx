import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            안녕하세요! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Next.js로 만든 블로그에 오신 것을 환영합니다. 
            다양한 글들을 읽고 새로운 이야기를 공유해보세요.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Link 
            href="/posts" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            글 목록 보기
          </Link>
          <Link 
            href="/posts/new" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            새 글 작성
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">글 작성</h3>
            <p className="text-gray-600">새로운 이야기를 작성하고 공유해보세요</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2">글 읽기</h3>
            <p className="text-gray-600">다양한 글들을 읽고 댓글을 남겨보세요</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold mb-2">소통하기</h3>
            <p className="text-gray-600">다른 사람들과 의견을 나누어보세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
