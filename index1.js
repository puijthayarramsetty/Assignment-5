let allProducts = [];
let currentIndex = 0;
const productsPerPage = 8;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    allProducts = res.products;
    renderProducts();
  });

function renderProducts() {
  const box = document.getElementById("box");

  const nextProducts = allProducts.slice(currentIndex, currentIndex + productsPerPage);
  nextProducts.forEach((product) => {
    const stockClass =
      product.stock === 0
        ? "stock-out"
        : product.stock < 20
        ? "stock-low"
        : "stock-high";

    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#productModal">
        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <span class="badge bg-primary badge-pill">${product.category}</span>
          <span class="badge bg-warning text-dark badge-pill">${product.brand}</span>
          <p class="mt-2">${product.description.substring(0, 60)}...</p>
          <div class="price-tag">₹${product.price}</div>
          <div class="mt-2 stock-badge ${stockClass}">
            ${product.stock === 0 ? "Out of Stock" : product.stock < 20 ? "Low Stock" : "In Stock"}
          </div>
        </div>
      </div>
    `;

    card.querySelector(".card").addEventListener("click", () => {
      document.getElementById("modalTitle").innerText = product.title;
      document.getElementById("modalImage").src = product.thumbnail;
      document.getElementById("modalDescription").innerText = product.description;
      document.getElementById("modalCategory").innerText = product.category;
      document.getElementById("modalBrand").innerText = product.brand;
      document.getElementById("modalPrice").innerText = product.price;
      document.getElementById("modalStock").innerText = product.stock;
    });

    box.appendChild(card);
  });

  currentIndex += productsPerPage;

  // Hide the Load More button when all products are shown
  if (currentIndex >= allProducts.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

// Handle Load More button click
document.getElementById("loadMoreBtn").addEventListener("click", renderProducts);
