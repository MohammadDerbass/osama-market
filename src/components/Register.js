import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          إنشاء حساب جديد
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring"
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring"
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition">
            إنشاء الحساب
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            سجّل دخول
          </Link>
        </div>
      </div>
    </div>
  );
}
