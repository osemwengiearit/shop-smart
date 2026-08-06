const productsContainer = document.getElementById("products-container");

const API_URL = "https://api.escuelajs.co/api/v1/products";

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

// Fetch Products
async function loadProducts() {
  productsContainer.innerHTML = '<p class="loading">Loading products...</p>';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch products.");
    }

    const products = await response.json();

    displayProducts(products.slice(0, 8));
  } catch (error) {
    console.error(error);

    productsContainer.innerHTML = `
      <p class="no-products">
        Failed to load products.<br>
        Please refresh the page.
      </p>
    `;
  }
}

// Display Products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  if (!products.length) {
    productsContainer.innerHTML =
      '<p class="no-products">No products found.</p>';
    return;
  }

  products.forEach((product) => {
    const image =
      product.images?.[0] ||
      product.category?.image ||
      "assets/images/no-image.png";

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img
        src="${image}"
        alt="${product.title}"
        onerror="this.src='assets/images/no-image.png'"
      >

      <div class="product-info">
        <h3>${product.title}</h3>

        <p class="price">$${product.price}</p>

        <button class="add-cart-btn">
          Add to Cart
        </button>
      </div>
    `;

    const button = card.querySelector(".add-cart-btn");

    button.addEventListener("click", () => {
      addToCart(product);

      button.textContent = "✓ Added";
      button.disabled = true;

      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Add to Cart";
      }, 1200);
    });

    productsContainer.appendChild(card);
  });
}
