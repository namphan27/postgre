import Link from "next/link";
import { AlertTriangle } from "lucide-react"; 

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="p-4 bg-red-100 rounded-full mb-6">
        <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops! Không tìm thấy</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Trang bạn đang tìm kiếm có thể đã bị xóa hoặc đường dẫn không còn tồn tại.
      </p>

      <Link 
        href="/" 
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}