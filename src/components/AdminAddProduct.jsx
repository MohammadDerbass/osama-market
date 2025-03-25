import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import useCategories from "../hooks/useCategories";
import { useDropzone } from "react-dropzone";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null, // تغيير إلى null لأننا سنستخدم Dropzone
  });

  const [newCategory, setNewCategory] = useState("");
  const [addingNewCategory, setAddingNewCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { categories, addCategory } = useCategories();

  const baseCategories = [
    "الفواكه والخضروات",
    "المخبوزات",
    "منتجات الألبان",
    "اللحوم والأسماك",
    "الوجبات الخفيفة",
    "العناية الشخصية"
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // إضافة فئة جديدة إذا اختار المستخدم ذلك
      if (addingNewCategory && newCategory.trim() !== "") {
        await addCategory(newCategory);
        form.category = newCategory;
      }

      // رفع الصورة إلى Firebase Storage والحصول على رابطها
      let imageUrl = "";
      if (form.image) {
        const storageRef = ref(storage, `images/${form.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, form.image);

        await uploadTask;

        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        image: imageUrl, // استخدام رابط الصورة هنا
      });

      setMessage("✅ تم إضافة المنتج بنجاح!");
      setForm({ name: "", price: "", category: "", image: null });
      setNewCategory("");
      setAddingNewCategory(false);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ حدث خطأ أثناء الإضافة.");
    }

    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

        {!addingNewCategory ? (
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              if (e.target.value === "__new") {
                setAddingNewCategory(true);
              } else {
                setForm({ ...form, category: e.target.value });
              }
            }}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">اختر الفئة</option>
            {combinedCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
            <option value="__new">➕ أضف فئة جديدة</option>
          </select>
        ) : (
          <input
            type="text"
            placeholder="اسم الفئة الجديدة"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        )}

        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="text-center">اسحب الصورة هنا أو انقر لاختيار صورة</p>
        </div>

        {form.image && (
          <div className="text-center mt-2">
            <p>الصورة المحددة:</p>
            <img
              src={URL.createObjectURL(form.image)}
              alt="Selected"
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
