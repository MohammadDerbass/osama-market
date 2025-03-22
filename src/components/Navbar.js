import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer"; // استدعاء المكون الجديد

export default function Navbar() {
  const { cartItems } = useCart();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold flex items-center">
          🛒 Osama Market
        </h1>

        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <a href="#" className="hover:text-gray-300">
              الرئيسية
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              المنتجات
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              عنا
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              اتصل بنا
            </a>
          </li>
        </ul>

        {/* زر السلة */}
        <div className="relative">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition"
          >
            <FaShoppingCart className="text-white text-lg" />
            <span className="hidden md:inline">السلة</span>
          </button>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>
      </nav>

      {/* مكون السلة الجانبي */}
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

