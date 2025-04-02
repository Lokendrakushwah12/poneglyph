import type { Product } from "@/types/product";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async (): Promise<{ products: Product[] }> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`,
      );
    }

    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "products" in data &&
      typeof data.products === "object" &&
      data.products !== null &&
      "products" in data.products &&
      Array.isArray(data.products.products)
    ) {
      return { products: data.products.products as Product[] };
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
