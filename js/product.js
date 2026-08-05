const productsContainer = document.getElementById("products-container");

// Display products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.slice(0, 8).forEach((product) => {
    const card = document.createElement("article");

    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}">

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
    });

    productsContainer.appendChild(card);
  });
}

// Load products
async function loadProducts() {
  productsContainer.innerHTML = "<p>Loading products...</p>";

  const products = await fetchProducts();

  if (products.length === 0) {
    productsContainer.innerHTML =
      "<p>Unable to load products. Please try again later.</p>";
    return;
  }

  displayProducts(products);
}

loadProducts();
