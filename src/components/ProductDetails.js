import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id); // نجيب المنتج من Firestore حسب id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null); // لو المنتج مش موجود
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">⏳ جاري تحميل المنتج...</div>;
  }

  if (!product) {
    return <div className="p-6 text-center text-red-500">❌ المنتج غير موجود</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">الفئة: {product.category}</p>
      <p className="text-yellow-600 font-bold text-xl mb-4">
        {product.price} ₪
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        🛒 أضف إلى السلة
      </button>

      <Link
        to="/"
        className="mt-6 inline-block text-blue-600 hover:underline text-sm"
      >
        ← الرجوع إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
