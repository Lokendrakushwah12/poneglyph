import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { scrapeProduct } from "./scrapeProduct";

export const useScrapeProduct = () => {
  const mutation = useMutation<Product, Error, string>({
    mutationFn: scrapeProduct,
    onSuccess: (data) => {
      console.log("Product scraped successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error scraping product:", error);
    },
  });

  return mutation;
};
