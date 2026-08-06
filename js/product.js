const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortProducts = document.getElementById("sort-products");

let allProducts = [];

// Display Products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <p class="no-products">
        No products found.
      </p>
    `;
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <img
        src="${product.images?.[0] || product.category?.image || "assets/images/placeholder.png"}"
        alt="${product.title}"
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

      button.textContent = "Added ✓";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false;
      }, 1000);
    });

    productsContainer.appendChild(card);
  });
}

// Filter & Sort Products
function filterProducts() {
  let filtered = [...allProducts];

  // Search
  if (searchInput.value.trim() !== "") {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
  }

  // Category
  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(
      (product) =>
        product.category.name.toLowerCase() ===
        categoryFilter.value.toLowerCase(),
    );
  }

  // Sort
  switch (sortProducts.value) {
    case "low-high":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "high-low":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "name":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  displayProducts(filtered);
}

// Load Products
async function loadProducts() {
  productsContainer.innerHTML = `
    <p class="loading">Loading products...</p>
  `;

  allProducts = await fetchProducts();

  if (!allProducts.length) {
    productsContainer.innerHTML = `
      <p class="no-products">
        Unable to load products.
      </p>
    `;
    return;
  }

  displayProducts(allProducts);
}

// Event Listeners
if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterProducts);
}

if (sortProducts) {
  sortProducts.addEventListener("change", filterProducts);
}

// Initialize
if (productsContainer) {
  loadProducts();
}
