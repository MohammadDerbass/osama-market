import { FaFacebook, FaGoogle, FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome to Mohammad Market
        </h2>

        <form className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="اسم المستخدم"
              className="w-full border rounded-full py-2 px-10 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full border rounded-full py-2 px-10 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
            تسجيل الدخول
          </button>

          <div className="text-center text-gray-500">أو</div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-full flex justify-center items-center gap-2 hover:bg-blue-700 transition">
            <FaFacebook /> تسجيل الدخول باستخدام فيسبوك
          </button>

          <button className="w-full bg-red-500 text-white py-2 rounded-full flex justify-center items-center gap-2 hover:bg-red-600 transition">
            <FaGoogle /> تسجيل الدخول باستخدام جوجل
          </button>

          <div className="text-center mt-6 text-sm">
  ليس لديك حساب؟{" "}
  <Link to="/register" className="text-blue-500 hover:underline">
    إنشاء حساب جديد
  </Link>
</div>

        </form>
      </div>
    </div>
  );
}