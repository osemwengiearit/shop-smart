const checkoutItems = document.getElementById("checkout-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const placeOrderBtn = document.getElementById("place-order-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display checkout items
function displayCheckoutItems() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

    subtotalElement.textContent = "$0";
    totalElement.textContent = "$0";

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = "Cart is Empty";

    return;
  }

  cart.forEach((item) => {
    const checkoutItem = document.createElement("div");

    checkoutItem.classList.add("checkout-item");

    checkoutItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">

      <div class="checkout-item-info">
        <h4>${item.title}</h4>
        <p>Qty: ${item.quantity}</p>
        <p>$${item.price}</p>
      </div>
    `;

    checkoutItems.appendChild(checkoutItem);
  });

  calculateTotal();
}

// Calculate totals
function calculateTotal() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Place order
placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("🎉 Order placed successfully!");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
});

// Initialize page
displayCheckoutItems();
