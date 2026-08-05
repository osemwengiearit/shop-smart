const productsContainer = document.getElementById("products-container");
const cartCount = document.getElementById("cart-count");

const API_URL = "https://api.escuelajs.co/api/v1/products";

const productsContainer = document.getElementById("products-container");

async function getProducts() {
  // Show loading message
  productsContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const response = await fetch(API_URL);

    // Check if request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const products = await response.json();

    displayProducts(products.slice(0, 8));
  } catch (error) {
    console.error(error);

    productsContainer.innerHTML = `
      <p>Unable to load products. Please try again later.</p>
    `;
  }
}

getProducts();
updateCartCount();

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}">

      <h3>${product.title}</h3>

      <p>$${product.price}</p>

      <button class="add-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productsContainer.appendChild(card);

    const addButton = card.querySelector(".add-cart-btn");

    addButton.addEventListener("click", () => {
      addToCart(product);
    });
  });
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
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}
