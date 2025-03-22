import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product, showLink }) {
  const { addToCart } = useCart();

  const content = (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-2xl transition-all">
      {showLink && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-white text-xs px-2 py-1 rounded-br-md">
          اضغط للتفاصيل
        </div>
      )}

      <div className="w-full h-48 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-yellow-500 font-bold mt-2">{product.price} شيكل</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-2 rounded hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md"
        >
          🛒 إضافة إلى السلة
        </button>
      </div>
    </div>
  );

  return showLink ? <Link to={`/product/${product.id}`}>{content}</Link> : content;
}
