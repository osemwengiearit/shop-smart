// Get cart from Local Storage
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

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

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
      image: product.images[0],
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${product.title} added to cart!`);
}

// Run on every page
updateCartCount();
