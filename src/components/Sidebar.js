import {
  FaAppleAlt,
  FaBreadSlice,
  FaCarrot,
  FaFish,
  FaCookie,
  FaPumpSoap,
  FaBaby,
  FaSnowflake,
  FaWineBottle,
  FaBroom,
  FaBox
} from "react-icons/fa";

const baseCategories = [
  "الفواكه والخضروات",
  "المخبوزات",
  "منتجات الألبان",
  "اللحوم والأسماك",
  "الوجبات الخفيفة",
  "العناية الشخصية",
  "المشروبات",
  "المنظفات والورقيات",
  "مستلزمات الأطفال",
  "المجمدات",
  "البقالة الجافة"
];

const iconsMap = {
  "الكل": "🛒",
  "الفواكه والخضروات": <FaCarrot className="text-orange-400" />,
  "المخبوزات": <FaBreadSlice className="text-yellow-400" />,
  "منتجات الألبان": <FaAppleAlt className="text-red-400" />,
  "اللحوم والأسماك": <FaFish className="text-blue-400" />,
  "الوجبات الخفيفة": <FaCookie className="text-pink-400" />,
  "العناية الشخصية": <FaPumpSoap className="text-green-400" />,
  "المشروبات": <FaWineBottle className="text-cyan-400" />, // بديل لـ FaBottleWater
  "المنظفات والورقيات": <FaBroom className="text-purple-400" />,
  "مستلزمات الأطفال": <FaBaby className="text-blue-300" />,
  "المجمدات": <FaSnowflake className="text-sky-400" />,
  "البقالة الجافة": <FaBox className="text-gray-300" />,
};

export default function Sidebar({ onSelectCategory }) {
  const allCategories = ["الكل", ...baseCategories];

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
