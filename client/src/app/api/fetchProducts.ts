export const API_BASE_URL = "http://localhost:5000";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
