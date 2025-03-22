import { useCart } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white text-gray-900 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">🛒 السلة</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-lg sm:text-xl transition"
            aria-label="إغلاق"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">السلة فارغة</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      الكمية: {item.quantity} × {item.price} شيكل
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 text-xs sm:text-sm transition"
                    onClick={() => removeFromCart(item.id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <p className="font-bold">الإجمالي: {total} شيكل</p>
          <button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition shadow-md">
            إتمام الشراء
          </button>
        </div>
      </div>
    </div>
  );
}
