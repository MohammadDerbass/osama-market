import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  // 🔍 فلترة المنتجات حسب الفئة المختارة
  const filteredProducts =
    selectedCategory === "الكل"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-row-reverse">
      {/* إرسال دالة تغيير الفئة للـ Sidebar */}
      <Sidebar onSelectCategory={setSelectedCategory} />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">
            🛍️ المنتجات المتوفرة {selectedCategory !== "الكل" && `- ${selectedCategory}`}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
