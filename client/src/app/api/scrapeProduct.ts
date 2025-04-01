import axios from "axios";
import { Product } from "@/types/product";

export const scrapeProduct = async (url: string): Promise<Product> => {
  if (!url.includes("amazon.in")) {
    throw new Error("Please enter a valid Amazon India product URL");
  }

  const response = await axios.post("http://localhost:5000/api/v1/scrape", { url });
  return response.data.newProduct;
};
