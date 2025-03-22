import {
    FaAppleAlt,
    FaBreadSlice,
    FaCarrot,
    FaFish,
    FaCookie,
    FaPumpSoap,
  } from "react-icons/fa";
  
  export default function Sidebar({ onSelectCategory }) {
    const categories = [
      { name: "الكل", icon: "🛒" },
      { name: "اللحوم والأسماك", icon: <FaFish className="text-blue-400" /> },
      { name: "الفواكه والخضروات", icon: <FaCarrot className="text-orange-400" /> },
      { name: "المخبوزات", icon: <FaBreadSlice className="text-yellow-400" /> },
      { name: "منتجات الألبان", icon: <FaAppleAlt className="text-red-400" /> },
      { name: "الوجبات الخفيفة", icon: <FaCookie className="text-pink-400" /> },
      { name: "العناية الشخصية", icon: <FaPumpSoap className="text-green-400" /> },
    ];
  
    return (
      <div className="group w-16 hover:w-64 bg-gradient-to-b from-slate-800 to-gray-900 text-white transition-all duration-300 ease-in-out shadow-xl z-10 overflow-hidden min-h-screen">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-6 text-yellow-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300">
            🛍️ الفئات
          </h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => onSelectCategory(category.name)}
                className="flex items-center space-x-3 p-2 hover:bg-yellow-400 hover:text-gray-900 rounded cursor-pointer transition-all"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300">
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  