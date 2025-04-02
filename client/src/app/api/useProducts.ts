import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./fetchProducts";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["jobs"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};
