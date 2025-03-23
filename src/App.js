import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import BottomNav from "./components/BottomNav";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import ProductDetails from "./components/ProductDetails";
import Favorites from "./components/Favorites";
import CartPage from "./components/CartPage";
import Account from "./components/Account";
import AnimatedPage from "./components/AnimatedPage";
import Checkout from "./components/Checkout";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";

function AnimatedRoutes({
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <div className="bg-gray-100 min-h-screen flex flex-row-reverse">
                <Sidebar onSelectCategory={setSelectedCategory} />
                <div className="flex-1">
                  <Navbar />
                  <div className="p-6 pb-20">
                    <h1 className="text-3xl font-bold mb-4 text-gray-700">
                      🛍️ المنتجات المتوفرة{" "}
                      {selectedCategory !== "الكل" && `- ${selectedCategory}`}
                    </h1>
                    <input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          showLink
                        />
                      ))}
                    </div>
                    <BottomNav />
                  </div>
                </div>
              </div>
            </AnimatedPage>
          }
        />

        <Route
          path="/product/:id"
          element={
            <AnimatedPage>
              <ProductDetails />
            </AnimatedPage>
          }
        />
        <Route
          path="/favorites"
          element={
            <AnimatedPage>
              <Favorites />
            </AnimatedPage>
          }
        />
        <Route
          path="/cart"
          element={
            <AnimatedPage>
              <CartPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/account"
          element={
            <AnimatedPage>
              <Account />
            </AnimatedPage>
          }
        />
        <Route
          path="/checkout"
          element={
            <AnimatedPage>
              <Checkout />
            </AnimatedPage>
          }
        />
        <Route
          path="/auth"
          element={
            <AnimatedPage>
              <Auth />
            </AnimatedPage>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

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
      <AnimatedRoutes
        filteredProducts={filteredProducts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Router>
  );
}
