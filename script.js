// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cartItems = getCartItems();
  cartList.innerHTML = "";
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  if (product) {
    let cartItems = getCartItems();
    cartItems.push(product);
    setCartItems(cartItems);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.id !== productId);
  setCartItems(cartItems);
  renderCart();
}

// Clear cart
function clearCart() {
  setCartItems([]);
  renderCart();
}

// Get cart items from session storage
function getCartItems() {
  const cartJson = sessionStorage.getItem("cart");
  return cartJson ? JSON.parse(cartJson) : [];
}

// Set cart items in session storage
function setCartItems(items) {
  sessionStorage.setItem("cart", JSON.stringify(items));
}

// Add event listener to product list for adding items to cart
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Add event listener to cart list for removing items from cart
cartList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Add event listener to clear cart button
const clearCartBtn = document.getElementById("clear-cart-btn");
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();