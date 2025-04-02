import { Product } from "@/types/product";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("BASE_URL", BASE_URL);

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
