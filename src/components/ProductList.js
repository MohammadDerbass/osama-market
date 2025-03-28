import React, { useState } from 'react';
import useProducts from '../hooks/useProducts'; // جلب البيانات من Firestore

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useProducts(); // المنتجات من فايربيز

  // ترتيب عشوائي للمنتجات إذا ما في بحث، وإلا فلترة حسب الاسم
  const filteredProducts = searchTerm.trim() === ''
    ? [...products].sort(() => Math.random() - 0.5)
    : products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="ابحث عن منتج..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-yellow-600 font-bold mt-2">{product.price} ₪</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
