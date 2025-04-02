
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("BASE_URL", BASE_URL);

export const fetchProducts = async <T>(): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
