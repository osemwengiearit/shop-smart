const cartContainer = document.getElementById("cart-container");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const emptyCart = document.getElementById("empty-cart");

let cart = getCart();

// Display Cart
function displayCart() {
  cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    document.querySelector(".cart-section").style.display = "none";
    emptyCart.style.display = "block";
    updateTotals();
    return;
  }

  document.querySelector(".cart-section").style.display = "grid";
  emptyCart.style.display = "none";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image || "assets/images/placeholder.png"}" alt="${item.title}">

      <div class="item-details">
        <h3>${item.title}</h3>

        <p class="item-price">$${item.price.toFixed(2)}</p>

        <div class="quantity-controls">
          <button class="decrease-btn">−</button>

          <span>${item.quantity}</span>

          <button class="increase-btn">+</button>
        </div>

        <button class="remove-btn">
          Remove
        </button>
      </div>
    `;

    cartItem.querySelector(".increase-btn").addEventListener("click", () => {
      updateQuantity(item.id, 1);
      displayCart();
    });

    cartItem.querySelector(".decrease-btn").addEventListener("click", () => {
      updateQuantity(item.id, -1);
      displayCart();
    });

    cartItem.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(item.id);
      displayCart();
    });

    cartContainer.appendChild(cartItem);
  });

  updateTotals();
}

// Update Totals
function updateTotals() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`;

  updateCartCount();
}

// Initialize
displayCart();
