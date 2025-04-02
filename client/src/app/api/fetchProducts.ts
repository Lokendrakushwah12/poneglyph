import { Product } from "@/types/product";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async (): Promise<{ products: Product[] }> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
    }
    const data: unknown = await response.json();
    return { products: data as Product[] };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
