const checkoutItems = document.getElementById("checkout-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const placeOrderBtn = document.getElementById("place-order-btn");
const checkoutForm = document.getElementById("checkout-form");

let cart = getCart();

// Display Checkout Items
function displayCheckoutItems() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <p class="no-products">
        Your cart is empty.
      </p>
    `;

    subtotalElement.textContent = "$0.00";
    totalElement.textContent = "$0.00";

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Cart is Empty";

    return;
  }

  placeOrderBtn.disabled = false;
  placeOrderBtn.textContent = "Place Order";

  cart.forEach((item) => {
    const checkoutItem = document.createElement("div");

    checkoutItem.className = "checkout-item";

    checkoutItem.innerHTML = `
      <img
        src="${item.image || "assets/images/placeholder.png"}"
        alt="${item.title}"
      >

      <div class="checkout-item-info">
        <h4>${item.title}</h4>

        <p>Quantity: ${item.quantity}</p>

        <p>$${item.price.toFixed(2)}</p>
      </div>
    `;

    checkoutItems.appendChild(checkoutItem);
  });

  calculateTotal();
}

// Calculate Total
function calculateTotal() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shipping = 10;
  const total = subtotal + shipping;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Place Order
placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  alert("🎉 Order placed successfully!");

  saveCart([]);
  updateCartCount();

  window.location.href = "index.html";
});

// Initialize
displayCheckoutItems();
