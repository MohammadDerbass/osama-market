import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import ProductDetails from "./components/ProductDetails";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 البحث

  // 🔍 فلترة المنتجات حسب الفئة + البحث
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "الكل" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <div className="bg-gray-100 min-h-screen flex flex-row-reverse">
              {/* Sidebar */}
              <Sidebar onSelectCategory={setSelectedCategory} />

              <div className="flex-1">
                <Navbar />
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4 text-gray-700">
                    🛍️ المنتجات المتوفرة{" "}
                    {selectedCategory !== "الكل" && `- ${selectedCategory}`}
                  </h1>

                  {/* 🔍 حقل البحث */}
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring"
                  />

                  {/* عرض المنتجات */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showLink
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* صفحة تفاصيل المنتج */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
