const API_URL = "https://api.escuelajs.co/api/v1/products";

// Fetch all products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
