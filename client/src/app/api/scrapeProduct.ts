import { Product } from "@/types/product";
import axios from "axios";
import { BASE_URL } from "./fetchProducts";

export const scrapeProduct = async (url: string): Promise<Product> => {
  if (!url.includes("amazon.in")) {
    throw new Error("Please enter a valid Amazon India product URL");
  }

  const response = await axios.post(`${BASE_URL}/api/v1/scrape`, { url });
  return response.data.newProduct;
};
