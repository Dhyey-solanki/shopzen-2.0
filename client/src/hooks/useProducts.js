import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchProducts(params);

        if (!isActive) {
          return;
        }

        setProducts(response.products || []);
        setCategories(response.categories || ["All"]);
      } catch (apiError) {
        if (!isActive) {
          return;
        }

        setError(apiError.response?.data?.message || "Unable to load products");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [JSON.stringify(params)]);

  return { products, categories, loading, error };
};
