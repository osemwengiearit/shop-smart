const cartContainer = document.getElementById("cart-container");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Cart Items
function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <h2>Your cart is empty.</h2>
      <p>Add some products to continue shopping.</p>
    `;

    subtotalElement.textContent = "$0";
    totalElement.textContent = "$0";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">

      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>$${item.price}</p>
      </div>

      <div class="cart-actions">
        <button class="decrease-btn" data-id="${item.id}">-</button>

        <span>${item.quantity}</span>

        <button class="increase-btn" data-id="${item.id}">+</button>

        <button class="remove-btn" data-id="${item.id}">
          Remove
        </button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  updateTotals();
  addEventListeners();
}

// Update Total Price
function updateTotals() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  subtotalElement.textContent = `$${subtotal}`;
  totalElement.textContent = `$${subtotal}`;
}

// Increase, Decrease & Remove
function addEventListeners() {
  const increaseButtons = document.querySelectorAll(".increase-btn");
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  const removeButtons = document.querySelectorAll(".remove-btn");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      increaseQuantity(Number(button.dataset.id));
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      decreaseQuantity(Number(button.dataset.id));
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeItem(Number(button.dataset.id));
    });
  });
}

// Increase Quantity
function increaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  if (item) {
    item.quantity++;
  }

  saveCart();
}

// Decrease Quantity
function decreaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((product) => product.id !== id);
  }

  saveCart();
}

// Remove Item
function removeItem(id) {
  cart = cart.filter((product) => product.id !== id);

  saveCart();
}

// Save Cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

// Load Cart
displayCart();
