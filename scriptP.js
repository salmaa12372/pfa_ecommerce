
// ---------- BASE DE DONNÉES PRODUITS ----------
const productsData = [
    { id: 1, name: "Cookies sans gluten miel sésame", price: 12.9, rating: 4.8, category: "Cookies", glutenFree: true, lactoseFree: true, sugarFree: false, bio: true, vegan: false, stock: true, date: "2025-01-10", img: "https://placehold.co/400x400/e8f0e3/2c5e2e?text=Honey+Sesame" },
    { id: 2, name: "Bretzel olive & romarin", price: 14.5, rating: 4.7, category: "Snacks", glutenFree: false, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: true, date: "2025-02-14", img: "https://placehold.co/400x400/f5e6d3/8B5A2B?text=Olive+Rosemary" },
    { id: 3, name: "Barre figue noix", price: 16.9, rating: 4.9, category: "Bars", glutenFree: true, lactoseFree: true, sugarFree: false, bio: true, vegan: true, stock: true, date: "2025-01-22", img: "https://placehold.co/400x400/d9c5a7/6B3E1F?text=Fig+Walnut" },
    { id: 4, name: "Orange épicée (vegan)", price: 15.9, rating: 4.6, category: "Cookies", glutenFree: true, lactoseFree: true, sugarFree: false, bio: false, vegan: true, stock: true, date: "2025-03-01", img: "https://placehold.co/400x400/fce4c9/cc7b2c?text=Spiced+Orange" },
    { id: 5, name: "Pain dattes amandes", price: 18.5, rating: 4.9, category: "Bread", glutenFree: true, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: false, date: "2024-12-05", img: "https://placehold.co/400x400/eeddbb/9C6B3E?text=Date+Almond" },
    { id: 6, name: "Cookies caroube coco", price: 13.9, rating: 4.5, category: "Cookies", glutenFree: true, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: true, date: "2025-02-28", img: "https://placehold.co/400x400/cbbf91/5d3a1a?text=Carob+Coconut" },
    { id: 7, name: "Pistache & rose", price: 19.9, rating: 4.8, category: "Bars", glutenFree: true, lactoseFree: true, sugarFree: false, bio: false, vegan: true, stock: true, date: "2025-01-18", img: "https://placehold.co/400x400/f2dbd0/A5673F?text=Pistachio+Rose" },
    { id: 8, name: "Safran cardamome", price: 22.0, rating: 4.9, category: "Cookies", glutenFree: true, lactoseFree: true, sugarFree: false, bio: true, vegan: true, stock: true, date: "2025-02-10", img: "https://placehold.co/400x400/ecd9c6/B87333?text=Saffron" },
    { id: 9, name: "Zaatar & olives", price: 14.9, rating: 4.7, category: "Snacks", glutenFree: false, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: true, date: "2025-03-12", img: "https://placehold.co/400x400/d9c8a7/6F4E2E?text=Zaatar" },
    { id: 10, name: "Harissa & fromage végan", price: 15.9, rating: 4.6, category: "Snacks", glutenFree: true, lactoseFree: true, sugarFree: true, bio: false, vegan: true, stock: true, date: "2025-03-20", img: "https://placehold.co/400x400/e6c8a0/C15A2C?text=Harissa" },
    { id: 11, name: "Muesli crunch sans sucre", price: 12.5, rating: 4.4, category: "Bars", glutenFree: false, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: true, date: "2025-03-05", img: "https://placehold.co/400x400/f0e2bc/9B6E42?text=Muesli" },
    { id: 12, name: "Pain complet aux 5 graines", price: 11.9, rating: 4.5, category: "Bread", glutenFree: false, lactoseFree: true, sugarFree: true, bio: true, vegan: true, stock: true, date: "2025-02-18", img: "https://placehold.co/400x400/d9b48b/84613A?text=5+Seeds" }
];

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onload = () => {
    window.scrollTo(0, 0);
};

// État global
let currentFilters = {
    glutenFree: false, lactoseFree: false, sugarFree: false, bio: false, vegan: false,
    minPrice: 0, maxPrice: 50, category: "all", searchTerm: ""
};
let currentSort = "default";
let currentPage = 1;
const itemsPerPage = 6;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Helper : filtrer produits
function filterProducts() {
    return productsData.filter(p => {
        if (currentFilters.glutenFree && !p.glutenFree) return false;
        if (currentFilters.lactoseFree && !p.lactoseFree) return false;
        if (currentFilters.sugarFree && !p.sugarFree) return false;
        if (currentFilters.bio && !p.bio) return false;
        if (currentFilters.vegan && !p.vegan) return false;
        if (p.price < currentFilters.minPrice || p.price > currentFilters.maxPrice) return false;
        if (currentFilters.category !== "all" && p.category !== currentFilters.category) return false;
        if (currentFilters.searchTerm && !p.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())) return false;
        return true;
    });
}

function sortProducts(products) {
    let sorted = [...products];
    if (currentSort === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (currentSort === "price_desc") sorted.sort((a, b) => b.price - a.price);
    else if (currentSort === "popularite") sorted.sort((a, b) => b.rating - a.rating);
    else if (currentSort === "nouveaute") sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted;
}

function renderProducts() {
    let filtered = filterProducts();
    document.getElementById("resultCount").innerText = filtered.length;
    let sorted = sortProducts(filtered);
    const totalPages = Math.ceil(sorted.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = sorted.slice(start, start + itemsPerPage);
    const grid = document.getElementById("productsGrid");
    if (!grid) return;
    grid.innerHTML = paginated.map(p => {
        const isFav = wishlist.includes(p.id);
        const stockText = p.stock ? "✅ En stock" : "❌ Rupture";
        return `
        <div class="product-card" data-id="${p.id}">
          <div class="product-img">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <div class="fav-icon ${isFav ? 'active' : ''}" data-id="${p.id}"><i class="fas fa-heart"></i></div>
            <div class="product-badges">
              ${p.glutenFree ? '<span class="badge gluten">🌾 Sans gluten</span>' : ''}
              ${p.bio ? '<span class="badge bio">🌿 Bio</span>' : ''}
              ${p.vegan ? '<span class="badge vegan">🥑 Vegan</span>' : ''}
              ${p.sugarFree ? '<span class="badge">🚫 Sans sucre</span>' : ''}
            </div>
          </div>
          <div class="product-info">
            <div class="product-title">${p.name}</div>
            <div class="rating">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 >= 0.5 ? '½' : ''} (${p.rating})</div>
            <div class="price">${p.price.toFixed(2)} TND</div>
            <div class="stock-status">${stockText}</div>
            <div class="card-actions">
              <button class="add-to-cart" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Ajouter</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
    // Attach event listeners
    document.querySelectorAll(".fav-icon").forEach(icon => {
        icon.addEventListener("click", (e) => { e.stopPropagation(); toggleWishlist(parseInt(icon.dataset.id)); renderProducts(); });
    });
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => { e.stopPropagation(); addToCart(parseInt(btn.dataset.id)); });
    });
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagDiv = document.getElementById("pagination");
    if (!pagDiv) return;
    if (totalPages <= 1) { pagDiv.innerHTML = ""; return; }
    let html = "";
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    pagDiv.innerHTML = html;
    document.querySelectorAll(".page-btn").forEach(btn => {
        btn.addEventListener("click", () => { currentPage = parseInt(btn.dataset.page); renderProducts(); window.scrollTo({ top: document.querySelector('.products-area').offsetTop - 80, behavior: 'smooth' }); });
    });
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) wishlist = wishlist.filter(i => i !== id);
    else wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} ajouté au panier !`);
}

function updateCartCount() {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cartCount").innerText = total;
}

// Mise à jour des filtres et rechargement
function applyFiltersAndRender() {
    currentPage = 1;
    renderProducts();
}

// Event listeners UI
document.querySelectorAll(".diet-filter").forEach(cb => {
    cb.addEventListener("change", (e) => {
        currentFilters[e.target.dataset.filter] = e.target.checked;
        applyFiltersAndRender();
    });
});
document.getElementById("minPrice")?.addEventListener("input", (e) => { currentFilters.minPrice = parseFloat(e.target.value) || 0; applyFiltersAndRender(); });
document.getElementById("maxPrice")?.addEventListener("input", (e) => { currentFilters.maxPrice = parseFloat(e.target.value) || 100; applyFiltersAndRender(); });
document.getElementById("categoryFilter")?.addEventListener("change", (e) => { currentFilters.category = e.target.value; applyFiltersAndRender(); });
document.getElementById("sortSelect")?.addEventListener("change", (e) => { currentSort = e.target.value; applyFiltersAndRender(); });
document.getElementById("searchInput")?.addEventListener("input", (e) => { currentFilters.searchTerm = e.target.value; applyFiltersAndRender(); });
document.getElementById("resetFilters")?.addEventListener("click", () => {
    currentFilters = { glutenFree: false, lactoseFree: false, sugarFree: false, bio: false, vegan: false, minPrice: 0, maxPrice: 50, category: "all", searchTerm: "" };
    document.querySelectorAll(".diet-filter").forEach(cb => cb.checked = false);
    document.getElementById("minPrice").value = 0;
    document.getElementById("maxPrice").value = 50;
    document.getElementById("categoryFilter").value = "all";
    document.getElementById("searchInput").value = "";
    currentSort = "default";
    document.getElementById("sortSelect").value = "default";
    applyFiltersAndRender();
});
document.getElementById("scrollToProducts")?.addEventListener("click", () => { document.querySelector(".shop-layout").scrollIntoView({ behavior: "smooth" }); });

updateCartCount();
renderProducts();
