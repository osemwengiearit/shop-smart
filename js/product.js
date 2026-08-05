const API_URL = "https://api.escuelajs.co/api/v1/products";

const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const cartCount = document.getElementById("cart-count");

let allProducts = [];

async function getProducts() {
  productsContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch products.");
    }

    const products = await response.json();

    allProducts = products;

    displayProducts(allProducts);
  } catch (error) {
    console.error(error);

    productsContainer.innerHTML = `
      <p class="error">
        Unable to load products. Please try again later.
      </p>
    `;
  }
}

getProducts();
updateCartCount();

function displayProducts(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <p class="error">
        No products found.
      </p>
    `;
    return;
  }

  products.forEach((product) => {
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

searchInput.addEventListener("input", () => {
  filterProducts();
});

categoryFilter.addEventListener("change", () => {
  filterProducts();
});

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();

  const selectedCategory = categoryFilter.value;

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || product.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert(`${product.title} added to cart.`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}
