import { useCart } from "../context/CartContext";
import AnimatedPage from "./AnimatedPage";

export default function Checkout() {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-4 md:p-10">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden md:flex">
          {/* معلومات الدفع */}
          <div className="w-full md:w-2/3 p-6 md:p-10 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              💳 معلومات الدفع
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="الاسم الكامل" className="input" />
              <input
                type="text"
                placeholder="الرمز البريدي"
                className="input"
              />
            </div>

            <input type="text" placeholder="رقم البطاقة" className="input" />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="تاريخ الانتهاء"
                className="input"
              />
              <input type="text" placeholder="رمز CVV" className="input" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-yellow-500" />
              <label>حفظ البطاقة للشراء لاحقًا</label>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="w-full md:w-1/3 bg-gray-100 p-6 md:p-8 border-t md:border-t-0 md:border-r rounded-t-xl md:rounded-r-xl space-y-4">
            <h3 className="font-bold text-lg">🧾 ملخص الطلب</h3>
            <ul className="divide-y text-sm space-y-2">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <span className="text-gray-500 text-xs">
                      {item.quantity} × {item.price} شيكل
                    </span>
                  </div>
                  <span className="font-medium">
                    {item.price * item.quantity} شيكل
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4 font-bold flex justify-between text-base">
              <span>الإجمالي:</span>
              <span>{total} شيكل</span>
            </div>

            <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white py-2 rounded-lg shadow text-base">
              تأكيد الدفع
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
