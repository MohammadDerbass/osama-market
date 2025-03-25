import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import useCategories from "../hooks/useCategories";
import { useDropzone } from "react-dropzone";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    imageUrl: "",
  });

  const [useUrl, setUseUrl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { categories } = useCategories();

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

  const combinedCategories = Array.from(
    new Set([...baseCategories, ...categories])
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setForm({ ...form, image: file });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let finalImageUrl = "";

      if (useUrl && form.imageUrl) {
        finalImageUrl = form.imageUrl;
      } else if (form.image) {
        const storageRef = ref(storage, `images/${form.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, form.image);
        await uploadTask;
        finalImageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        image: finalImageUrl,
      });

      setMessage("✅ تم إضافة المنتج بنجاح!");
      setForm({ name: "", price: "", category: "", image: null, imageUrl: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ حدث خطأ أثناء الإضافة.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">اختر الفئة</option>
          {combinedCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="border p-2 rounded">
          <label className="block font-semibold mb-1">طريقة إدخال الصورة:</label>
          <div className="flex gap-4 mb-3">
            <label>
              <input
                type="radio"
                checked={!useUrl}
                onChange={() => setUseUrl(false)}
              />{" "}
              رفع من الجهاز
            </label>
            <label>
              <input
                type="radio"
                checked={useUrl}
                onChange={() => setUseUrl(true)}
              />{" "}
              رابط مباشر
            </label>
          </div>

          {!useUrl ? (
            <div
              {...getRootProps({
                className:
                  "dropzone border p-2 rounded text-center cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <p>اسحب الصورة هنا أو انقر لاختيار صورة</p>
            </div>
          ) : (
            <input
              type="text"
              name="imageUrl"
              placeholder="رابط مباشر للصورة"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}
        </div>

        {(form.image || form.imageUrl) && (
          <div className="text-center mt-2">
            <p>معاينة الصورة:</p>
            <img
              src={
                useUrl
                  ? form.imageUrl
                  : form.image
                  ? URL.createObjectURL(form.image)
                  : ""
              }
              alt="Preview"
              className="max-w-full h-auto mt-2 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "جاري الإضافة..." : "➕ أضف المنتج"}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
