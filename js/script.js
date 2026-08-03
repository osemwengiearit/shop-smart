const API_URL = "https://api.escuelajs.co/api/v1/products";

const productsContainer = document.getElementById("products-container");

async function getProducts() {
  try {
    const response = await fetch(API_URL);

    const products = await response.json();

    displayProducts(products.slice(0, 8));
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>

      <button>Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}
