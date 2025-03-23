import { FaHome, FaStar, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <FaHome />, label: "الرئيسية" },
    { to: "/favorites", icon: <FaStar />, label: "المفضلة" },
    { to: "/cart", icon: <FaShoppingCart />, label: "السلة" },
    { to: "/account", icon: <FaUser />, label: "الحساب" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md flex justify-around items-center py-2 z-50 sm:hidden">
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          to={item.to}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.to ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
