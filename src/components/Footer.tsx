import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">📝 블로그</h3>
            <p className="text-gray-300">
              Next.js로 만든 모던한 블로그 플랫폼입니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">🔗 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  메인 페이지
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-300 hover:text-white transition-colors">
                  글 목록
                </Link>
              </li>
              <li>
                <Link href="/posts/new" className="text-gray-300 hover:text-white transition-colors">
                  새 글 작성
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">📞 연락처</h3>
            <p className="text-gray-300">
              문의사항이 있으시면 언제든 연락주세요.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 블로그. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
