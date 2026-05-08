// HOME PAGE 
// PRODUCTS 
const products = [
  {
    id: 1,
    name: "Shoes",
    price: 80,
    image: "./images/white shoes 2.jpg",
    para: "Shoes are important for daily use  which that protect our feet form harm and provide comfort while walking. We offer a wide range of styles for all your needs this is one of the best."
  },
  {
    id: 2,
    name: "Bag",
    price: 20,
    image: "./images/brown bag.jpg",
    para: "Bags are the most essential accessories for daily use, they are on of essentials items for ladies. we offer really nice and easy to carry bas with different colors and styles. And they are really affordable."
  },
  {
    id: 3,
    name: "Dresses",
    price: 100,
    image: "./images/cream brown.jpg",
    para: "Every woman needs a good dress for special occasions.We recommend modern dresses which you look beautiful, also nice. And we have different colors and styles for you to choose from. We are sure that you will find the perfect dress for you."
  },
  {
    id: 4,
    name: "Set of all products",
    price: 200,
    image: "./images/brown dress.jpg",
    para: "This set includes all our best-selling products at a discounted price. It's a great way to try out different items and find your favorites."
  }
];

// SLIDER 
const sliderElement = document.getElementById("mySlider");

if (sliderElement && typeof bootstrap !== "undefined") {
  const carousel = new bootstrap.Carousel(sliderElement, {
    interval: 4000,
    ride: "carousel"
  });
}


// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


// UPDATE CART
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  el.innerText = count;
}


// ADD TO CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartCount();
}


// REMOVE ITEM
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);

  saveCart();
  renderCart();
  updateCartCount();
}


// QUANTITY
function changeQty(id, type) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (type === "inc") item.qty++;
  if (type === "dec" && item.qty > 1) item.qty--;

  saveCart();
  renderCart();
  updateCartCount();
}

// PRODUCTS
function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = products
    .map(p => `
      <div class="col-md-3 mb-4">
        <div class="card p-2 shadow h-100">
          <img src="${p.image}" class="img-fluid">
          <div class="card-body text-center">
            <h5>${p.name}</h5>
            <p>$${p.price}</p>
            <p>${p.para}</p>
            <button class="btn btn-dark" onclick="addToCart(${p.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `)
    .join("");
}

updateCartCount();
// CART 
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  let total = 0;

  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;

    return `
      <div class="border p-3 mb-2 d-flex justify-content-between">
        <div>
          <h5>${item.name}</h5>
          <p>$${item.price}</p>
        </div>

        <div>
          <button onclick="changeQty(${item.id}, 'dec')">-</button>
          <span class="mx-2">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 'inc')">+</button>
        </div>

        <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">
          Remove
        </button>
      </div>
    `;
  }).join("");

  document.getElementById("total").innerText = total;
}

// CHECK OUT 
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let name = prompt("Enter your name:");
  let email = prompt("Enter your email:");

  // Forme
  if (!name || !email || !email.includes("@")) {
    alert("Please enter valid name and email!");
    return;
  }

  alert(`Thank you ${name}! Your order of $${total} is confirmed.`);

  //  CART
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

/* FUntions */
renderProducts();
renderCart();
updateCartCount();


// CONTACT PAGE 
const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name validation
function validateName() {
  if (nameInput.value.trim() === '') {
    nameInput.classList.add('is-invalid');
    return false;
  } else {
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
    return true;
  }
}

// Email validation
function validateEmail() {
  if (!emailPattern.test(emailInput.value)) {
    emailInput.classList.add('is-invalid');
    return false;
  } else {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    return true;
  }
}

// Password validation
function validatePassword() {
  if (passwordInput.value.length < 6) {
    passwordInput.classList.add('is-invalid');
    return false;
  } else {
    passwordInput.classList.remove('is-invalid');
    passwordInput.classList.add('is-valid');
    return true;
  }
}

// Confirm password
function validateConfirmPassword() {
  if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === '') {
    confirmPasswordInput.classList.add('is-invalid');
    return false;
  } else {
    confirmPasswordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.add('is-valid');
    return true;
  }
}

// Real 
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    alert('Form submitted successfully!');
    form.reset();

    document.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('is-valid');
    });
  }
});