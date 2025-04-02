import type { Product } from "@/types/product";
import axios from "axios";
import { BASE_URL } from "./fetchProducts";

type ScrapeResponse = {
  message?: string;
  newProduct?: Product;
  product?: Product;
};

export const scrapeProduct = async (url: string): Promise<Product> => {
  if (!url.includes("amazon.in")) {
    throw new Error("Please enter a valid Amazon India product URL");
  }

  const response = await axios.post<ScrapeResponse>(
    `${BASE_URL}/api/v1/scrape`,
    { url },
  );
  console.log("Scrape response:", response);
  if (response.data.message) {
    if (!response.data.product) {
      throw new Error("Product data is undefined");
    }
    return response.data.product;
  }
  if (!response.data.newProduct) {
    throw new Error("New product data is undefined");
  }
  return response.data.newProduct;
};
