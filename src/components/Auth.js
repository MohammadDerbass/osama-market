import { useState } from "react";
import AnimatedPage from "./AnimatedPage";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatedPage>
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="الاسم الكامل"
              className="w-full border rounded p-2"
            />
          )}
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full border rounded p-2"
          />

          <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "ليس لديك حساب؟" : "هل لديك حساب؟"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "أنشئ حساب" : "سجّل دخول"}
          </button>
        </p>
      </div>
    </AnimatedPage>
  );
}
