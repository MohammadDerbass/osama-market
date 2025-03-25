import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const data = snapshot.docs.map((doc) => doc.data().name);
    setCategories(data);
  };

  const addCategory = async (newCategory) => {
    await addDoc(collection(db, "categories"), { name: newCategory });
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, addCategory };
};

export default useCategories;
