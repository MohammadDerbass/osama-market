import {
  FaAppleAlt,
  FaBreadSlice,
  FaCarrot,
  FaFish,
  FaCookie,
  FaPumpSoap,
} from "react-icons/fa";

import useCategories from "../hooks/useCategories";

const iconsMap = {
  "الكل": "🛒",
  "الفواكه والخضروات": <FaCarrot className="text-orange-400" />,
  "المخبوزات": <FaBreadSlice className="text-yellow-400" />,
  "منتجات الألبان": <FaAppleAlt className="text-red-400" />,
  "اللحوم والأسماك": <FaFish className="text-blue-400" />,
  "الوجبات الخفيفة": <FaCookie className="text-pink-400" />,
  "العناية الشخصية": <FaPumpSoap className="text-green-400" />,
};

export default function Sidebar({ onSelectCategory }) {
  const { categories } = useCategories();

  const allCategories = ["الكل", ...categories];

  return (
    <div className="group w-16 hover:w-64 bg-gradient-to-b from-slate-800 to-gray-900 text-white transition-all duration-300 ease-in-out shadow-xl z-10 overflow-hidden min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-6 text-yellow-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300">
          🛍️ الفئات
        </h2>
        <ul className="space-y-4">
          {allCategories.map((name, index) => (
            <li
              key={index}
              onClick={() => onSelectCategory(name)}
              className="flex items-center space-x-3 p-2 hover:bg-yellow-400 hover:text-gray-900 rounded cursor-pointer transition-all"
            >
              <span className="text-xl">{iconsMap[name] || "🛒"}</span>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
