
import { useEffect, useState } from "react";
import { GET_LIST_OF_CATEGORIES_API } from "../constants";


const useCategories = () => {

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch(GET_LIST_OF_CATEGORIES_API, {
      method: 'GET',
    });
    const resJSON = await res.json();
    setCategories(resJSON.categories);
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();

    return () => setCategories([]);
  }, []);

  return {
    categories,
    loading,
  };
};


export default useCategories;
