//campus market - qpp.js
//runs on catalog.html(filtering + quantity calc) and register.html(form validation + password toggle)

const products = [
  {
    id: 1,
    name: "Used Calculus Textbook (8th Ed.)",
    category: "books",
    price: 1200,
    description: "Lightly highlighted, all pages intact. Great for MATH 101/102."
  },
  {
    id: 2,
    name: "Scientific Calculator",
    category: "electronics",
    price: 1800,
    description: "Casio fx-991, works perfectly, includes cover."
  },
  {
    id: 3,
    name: "Study Desk Lamp",
    category: "furniture",
    price: 900,
    description: "Adjustable LED lamp, three brightness levels."
  },
  {
    id: 4,
    name: "Campus Hoodie (Size M)",
    category: "clothing",
    price: 1500,
    description: "Worn twice, no stains or tears, machine washable."
  },
  {
    id: 5,
    name: "Mini Fridge",
    category: "furniture",
    price: 6500,
    description: "Perfect for a dorm room. Selling because I'm graduating."
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "electronics",
    price: 2200,
    description: "Barely used, comes with charging case and spare tips."
  }
];
 
// ---- Catalog page: render + filter ---------------------------------------
 
function renderProducts(list) {
  const productList = document.getElementById("productList");
  const noResults = document.getElementById("noResults");
  if (!productList) return; // we are not on catalog.html
 
  productList.innerHTML = "";
 
  // if/else decision: show the "no results" message only when needed
  if (list.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }
 
  // loop through the (already filtered) product list and build each row
  for (let i = 0; i < list.length; i++) {
    const product = list[i];
 
    const row = document.createElement("li");
    row.className = "product-row";
    row.innerHTML = `
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="product-category">${product.category}</span>
      </div>
      <div class="product-price" data-price="${product.price}">
        KES ${product.price.toLocaleString()}
      </div>
      <div class="qty-block">
        <label class="visually-hidden" for="qty-${product.id}">Quantity for ${product.name}</label>
        <input type="number" id="qty-${product.id}" min="1" value="1" data-price="${product.price}">
        <span class="qty-total" id="total-${product.id}">Total: KES ${product.price.toLocaleString()}</span>
      </div>
    `;
    productList.appendChild(row);
  }
 
  attachQuantityListeners();
}
 
function attachQuantityListeners() {
  const qtyInputs = document.querySelectorAll('.qty-block input[type="number"]');
 
  qtyInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const price = Number(input.dataset.price);
      let quantity = Number(input.value);
 
      // custom rule: never calculate with a zero/negative/invalid quantity
      if (!quantity || quantity < 1) {
        quantity = 1;
      }
 
      const total = price * quantity;
      const totalLabel = document.getElementById("total-" + input.id.split("-")[1]);
      totalLabel.textContent = "Total: KES " + total.toLocaleString();
    });
  });
}
 
function filterProducts() {
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  if (!searchInput || !categorySelect) return;
 
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const filtered = [];
 
  // loop through every product and decide, with if/else, whether it belongs
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
 
    if (matchesSearch && matchesCategory) {
      filtered.push(product);
    } else {
      // not a match, skip it
      continue;
    }
  }
 
  renderProducts(filtered);
}