import { useMutation } from "@tanstack/react-query";
import { scrapeProduct } from "./scrapeProduct";

export const useScrapeProduct = () => {
  const mutation = useMutation({
    mutationFn: scrapeProduct,
    onSuccess: (data) => {
      console.log("Product scraped successfully:", data);
    },
    onError: (error: any) => {
      console.error("Error scraping product:", error);
    },
  });

  return mutation;
};
