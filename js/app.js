// Get cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) return;

  const cart = getCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = totalItems;
}

// Add product to cart
function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.category?.image || "",
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartCount();
}

// Remove item
function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);

  saveCart(cart);
  updateCartCount();
}

// Update quantity
function updateQuantity(id, change) {
  const cart = getCart();

  const item = cart.find((product) => product.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  updateCartCount();
}

// Clear cart
function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
