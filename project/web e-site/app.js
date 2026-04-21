/* ===================================================
   NEXUS STORE — E-Commerce JavaScript
   =================================================== */

// ===== DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: "AeroKick Pro Sneakers",
    category: "footwear",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 2341,
    badge: ["sale", "hot"],
    desc: "Experience next-level comfort with our signature AeroKick Pro sneakers. Engineered with advanced air-cushion technology and breathable mesh upper for all-day wearability.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    img: "images/sneakers.png",
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "SoundWave Elite X",
    category: "electronics",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 1892,
    badge: ["sale"],
    desc: "Immerse yourself in studio-quality audio with active noise cancellation, 40-hour battery life, and premium leather ear cushions. The ultimate wireless audio experience.",
    sizes: [],
    img: "images/headphones.png",
    isNew: false,
    isSale: true
  },
  {
    id: 3,
    name: "AuroraTech ProWatch",
    category: "accessories",
    price: 499.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 876,
    badge: ["new"],
    desc: "A fusion of elegance and technology. Track health metrics, receive notifications, and make payments — all from your wrist. Sapphire crystal display, 5ATM water resistant.",
    sizes: ["40mm", "44mm"],
    img: "images/watch.png",
    isNew: true,
    isSale: false
  },
  {
    id: 4,
    name: "Eclipse Sunglasses",
    category: "accessories",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviews: 543,
    badge: ["sale"],
    desc: "UV400 polarized lenses in a sleek gold titanium frame. Crafted for those who demand both protection and style. Includes premium leather case.",
    sizes: [],
    img: "images/sunglasses.png",
    isNew: false,
    isSale: true
  },
  {
    id: 5,
    name: "UrbanPack Elite",
    category: "accessories",
    price: 189.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 1234,
    badge: ["new", "hot"],
    desc: "A premium everyday carry backpack with dedicated laptop sleeve, RFID-blocking pocket, and sustainable recycled materials. Built for the modern urban professional.",
    sizes: [],
    img: "images/bag.png",
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: "NightRider Bomber",
    category: "apparel",
    price: 249.99,
    originalPrice: 329.99,
    rating: 4.7,
    reviews: 678,
    badge: ["sale"],
    desc: "Premium satin bomber jacket with minimalist embroidery. Water-resistant outer shell, quilted lining for warmth, and ribbed cuffs for a perfect fit.",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    img: "images/jacket.png",
    isNew: false,
    isSale: true
  },
  {
    id: 7,
    name: "VisionPro AR Glasses",
    category: "electronics",
    price: 899.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 312,
    badge: ["new"],
    desc: "Step into the future with lightweight AR glasses. Display real-time notifications, navigation, and media directly in your field of view. Compatible with iOS and Android.",
    sizes: [],
    img: "images/sunglasses.png",
    isNew: true,
    isSale: false
  },
  {
    id: 8,
    name: "CloudRun Air 3",
    category: "footwear",
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviews: 3210,
    badge: ["sale", "hot"],
    desc: "Engineered for the everyday runner. Ultra-responsive CloudTec® cushioning system, seamless upper construction, and durable rubber outsole for any surface.",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    img: "images/sneakers.png",
    isNew: false,
    isSale: true
  }
];

const CATEGORIES = [
  { id: "all", name: "All Items", icon: "🏪", count: "500+" },
  { id: "footwear", name: "Footwear", icon: "👟", count: "120+" },
  { id: "electronics", name: "Electronics", icon: "🎧", count: "85+" },
  { id: "accessories", name: "Accessories", icon: "⌚", count: "200+" },
  { id: "apparel", name: "Apparel", icon: "👔", count: "180+" },
  { id: "sports", name: "Sports", icon: "⚽", count: "95+" },
  { id: "beauty", name: "Beauty", icon: "✨", count: "140+" },
  { id: "home", name: "Home & Living", icon: "🏠", count: "220+" }
];

const TESTIMONIALS = [
  { name: "Sarah K.", tag: "Verified Buyer", text: "Absolutely obsessed with my order! The quality exceeded my expectations and delivery was super fast. NEXUS is now my go-to for premium shopping.", stars: 5 },
  { name: "Marcus T.", tag: "Verified Buyer", text: "The SoundWave headphones are incredible. Best purchase I've made this year. Customer service was also super helpful when I had a sizing question.", stars: 5 },
  { name: "Priya R.", tag: "Gold Member", text: "Third time ordering and I'm always impressed. The packaging is beautiful, products are authentic, and the prices during sales are unbeatable!", stars: 5 },
  { name: "James L.", tag: "Verified Buyer", text: "Quick delivery, great quality, easy returns process. What more can you ask for? The NEXUS20 code saved me a lot too — definitely coming back.", stars: 5 },
  { name: "Aisha M.", tag: "VIP Member", text: "The watch is absolutely stunning in person. Photos don't do it justice. Worth every penny and I've already gifted one to my partner.", stars: 5 },
  { name: "Carlos V.", tag: "Verified Buyer", text: "Love the curated selection and the dark mode on the site! Everything feels premium from start to finish. Highly recommend NEXUS to everyone.", stars: 5 }
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('nexus_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('nexus_wishlist') || '[]');
let activeFilter = 'all';
let visibleCount = 8;
let notifVisible = true;

// ===== DOM REFS =====
const header = document.getElementById('header');
const notifBar = document.getElementById('notifBar');
const notifClose = document.getElementById('notifClose');
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const overlay = document.getElementById('overlay');
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartEmpty = document.getElementById('cartEmpty');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartShipping = document.getElementById('cartShipping');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const productsGrid = document.getElementById('productsGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const testimonialsGrid = document.getElementById('testimonialsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTop = document.getElementById('backToTop');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutForm = document.getElementById('checkoutForm');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');
const copyCode = document.getElementById('copyCode');
const hamburger = document.getElementById('hamburger');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  renderTestimonials();
  updateCartUI();
  updateWishlistBadge();
  startCountdown();
  createParticles();
  initScrollEffects();
  initCardAnimations();
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  const colors = ['rgba(124,58,237,0.6)', 'rgba(236,72,153,0.5)', 'rgba(245,158,11,0.4)', 'rgba(167,139,250,0.5)'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      filter: blur(${Math.random() > 0.5 ? 1 : 0}px);
    `;
    container.appendChild(p);
  }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    header.classList.toggle('scrolled', sy > 50);
    backToTop.classList.toggle('visible', sy > 400);
  });
}

// ===== INTERSECTION OBSERVER (card animations) =====
function initCardAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.style.animationDelay = '0ms', i * 60);
        e.target.classList.add('animated');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.trust-item, .category-card, .testimonial-card').forEach(el => observer.observe(el));
}

// ===== NOTIFICATION BAR =====
notifClose.addEventListener('click', () => {
  notifBar.style.maxHeight = notifBar.offsetHeight + 'px';
  requestAnimationFrame(() => {
    notifBar.style.transition = 'max-height 0.4s ease, opacity 0.3s';
    notifBar.style.maxHeight = '0';
    notifBar.style.opacity = '0';
    notifBar.style.padding = '0';
  });
});

// ===== HAMBURGER / MOBILE MENU =====
let mobileMenuOpen = false;
const mobileMenuOverlay = document.createElement('div');
mobileMenuOverlay.className = 'mobile-menu-overlay';
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <nav class="mobile-nav">
    <a href="#hero">Home</a>
    <a href="#products">Shop</a>
    <a href="#categories">Categories</a>
    <a href="#deals">Deals</a>
    <a href="#contact">Contact</a>
  </nav>`;
document.body.appendChild(mobileMenuOverlay);
document.body.appendChild(mobileMenu);

hamburger.addEventListener('click', () => {
  mobileMenuOpen = !mobileMenuOpen;
  mobileMenu.classList.toggle('open', mobileMenuOpen);
  mobileMenuOverlay.classList.toggle('open', mobileMenuOpen);
});
mobileMenuOverlay.addEventListener('click', () => {
  mobileMenuOpen = false;
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.classList.remove('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenuOpen = false;
  mobileMenu.classList.remove('open');
  mobileMenuOverlay.classList.remove('open');
}));

// ===== SEARCH =====
searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput.focus();
});
searchInput.addEventListener('input', debounce(handleSearch, 250));
document.getElementById('searchSubmit').addEventListener('click', handleSearch);

function handleSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ''; return; }
  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ).slice(0, 5);
  searchResults.innerHTML = matches.length
    ? matches.map(p => `
        <div class="search-result-item" onclick="openProductModal(${p.id})">
          <img src="${p.img}" alt="${p.name}" onerror="this.style.background='#1a1a27'">
          <div>
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-price">$${p.price.toFixed(2)}</div>
          </div>
        </div>`).join('')
    : '<div style="padding:16px;color:var(--text-muted);font-size:.9rem">No products found for "<strong>' + q + '</strong>"</div>';
}

// ===== CATEGORIES =====
function renderCategories() {
  categoriesGrid.innerHTML = CATEGORIES.map(c => `
    <div class="category-card" onclick="filterByCategory('${c.id}')" role="button" tabindex="0" aria-label="Browse ${c.name}">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count} items</div>
    </div>`).join('');
}

function filterByCategory(cat) {
  activeFilter = cat;
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  renderProducts();
}

// ===== PRODUCTS =====
function renderProducts() {
  let filtered = activeFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === activeFilter);
  const sort = sortSelect.value;
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  else if (sort === 'newest') filtered.sort((a,b) => b.isNew - a.isNew);

  const visible = filtered.slice(0, visibleCount);
  productsGrid.innerHTML = visible.map((p, i) => renderProductCard(p, i)).join('');
  loadMoreBtn.style.display = filtered.length > visibleCount ? 'inline-flex' : 'none';

  // Attach events
  productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
    });
  });
  productsGrid.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(parseInt(btn.dataset.id), btn);
    });
  });
  productsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.add-to-cart-btn') && !e.target.closest('.product-wishlist')) {
        openProductModal(parseInt(card.dataset.id));
      }
    });
  });
}

function renderProductCard(p, i) {
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const wishlisted = wishlist.includes(p.id);
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 60}ms" role="button" tabindex="0" aria-label="${p.name}">
      <div class="product-img-wrap">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.style.background='var(--surface)'">
        <div class="product-badges">
          ${p.isNew ? '<span class="badge-tag badge-new">New</span>' : ''}
          ${p.isSale && discount > 0 ? `<span class="badge-tag badge-sale">-${discount}%</span>` : ''}
          ${p.badge.includes('hot') ? '<span class="badge-tag badge-hot">🔥 Hot</span>' : ''}
        </div>
        <button class="product-wishlist ${wishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Add to wishlist">
          ${wishlisted ? '❤️' : '🤍'}
        </button>
        <div class="product-quick-view">👁 Quick View</div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="product-price-original">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">+</button>
        </div>
      </div>
    </div>`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    visibleCount = 8;
    renderProducts();
  });
});
sortSelect.addEventListener('change', renderProducts);
loadMoreBtn.addEventListener('click', () => {
  visibleCount += 4;
  renderProducts();
});

// ===== PRODUCT MODAL =====
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  modalBody.innerHTML = `
    <div class="modal-img-section">
      <img class="modal-img" src="${p.img}" alt="${p.name}" onerror="this.parentElement.style.background='var(--surface)'">
    </div>
    <div class="modal-info">
      <div class="modal-cat">${p.category}</div>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-rating">
        <span class="stars">${stars}</span>
        <span class="rating-count" style="color:var(--text-muted);font-size:.85rem">${p.rating} · ${p.reviews.toLocaleString()} reviews</span>
      </div>
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-price-row">
        <span class="modal-price">$${p.price.toFixed(2)}</span>
        ${p.originalPrice ? `<span class="modal-price-orig">$${p.originalPrice.toFixed(2)}</span>` : ''}
        ${discount > 0 ? `<span class="modal-save">Save ${discount}%</span>` : ''}
      </div>
      ${p.sizes.length > 0 ? `
        <div class="size-label">Size</div>
        <div class="size-options">
          ${p.sizes.map((s, i) => `<button class="size-btn${i === 0 ? ' active' : ''}" onclick="selectSize(this)">${s}</button>`).join('')}
        </div>` : ''}
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="addToCart(${p.id}); document.getElementById('modalOverlay').classList.remove('open')">Add to Cart 🛍️</button>
        <button class="btn btn-ghost" onclick="toggleWishlistModal(${p.id}, this)">${wishlist.includes(p.id) ? '❤️ Wishlisted' : '🤍 Wishlist'}</button>
      </div>
    </div>`;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectSize(btn) {
  btn.closest('.size-options').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function toggleWishlistModal(id, btn) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.textContent = '❤️ Wishlisted';
    showToast('Added to wishlist!', 'success', '❤️');
  } else {
    wishlist.splice(idx, 1);
    btn.textContent = '🤍 Wishlist';
    showToast('Removed from wishlist', 'warning', '💔');
  }
  saveWishlist();
  updateWishlistBadge();
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CART =====
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1, name: product.name, price: product.price, img: product.img, category: product.category });
  }
  saveCart();
  updateCartUI();
  openCart();
  showToast(`${product.name} added to cart!`, 'success', '🛍️');

  // Animate badge
  cartBadge.style.transform = 'scale(1.5)';
  setTimeout(() => cartBadge.style.transform = '', 300);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else { saveCart(); updateCartUI(); }
  }
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartBadge.textContent = totalQty;
  cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
    return;
  }
  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';
  const shipping = total >= 75 ? 'Free' : '$9.99';
  const shippingCost = total >= 75 ? 0 : 9.99;
  cartSubtotal.textContent = `$${total.toFixed(2)}`;
  cartShipping.textContent = shipping;
  cartTotal.textContent = `$${(total + shippingCost).toFixed(2)}`;

  const itemsHtml = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='var(--surface)'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.category}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove">✕</button>
    </div>`).join('');
  cartItems.innerHTML = itemsHtml;
}

function openCart() {
  cartSidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
cartToggle.addEventListener('click', () => cartSidebar.classList.contains('open') ? closeCart() : openCart());
cartClose.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
continueShoppingBtn.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCart();
  checkoutOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

// ===== CHECKOUT =====
checkoutClose.addEventListener('click', () => {
  checkoutOverlay.classList.remove('open');
  document.body.style.overflow = '';
});
checkoutOverlay.addEventListener('click', (e) => {
  if (e.target === checkoutOverlay) {
    checkoutOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.getElementById('cardNum').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
});
document.getElementById('expiry').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v;
});
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.checkout-body').innerHTML = `
    <div class="order-success">
      <div class="success-icon">🎉</div>
      <h3>Order Placed!</h3>
      <p>Thank you for your purchase! You'll receive a confirmation email shortly.<br>Your order will arrive in 3-5 business days.</p>
      <button class="btn btn-primary" onclick="document.getElementById('checkoutOverlay').classList.remove('open'); document.body.style.overflow=''">Continue Shopping</button>
    </div>`;
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Order placed successfully! 🎉', 'success', '✅');
});

// ===== WISHLIST =====
function toggleWishlist(id, btn) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.innerHTML = '❤️';
    btn.classList.add('active');
    showToast('Added to wishlist!', 'success', '❤️');
  } else {
    wishlist.splice(idx, 1);
    btn.innerHTML = '🤍';
    btn.classList.remove('active');
    showToast('Removed from wishlist', 'warning', '💔');
  }
  saveWishlist();
  updateWishlistBadge();
}
function updateWishlistBadge() {
  wishlistBadge.textContent = wishlist.length;
  wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
}
document.getElementById('wishlistBtn').addEventListener('click', () => {
  showToast(wishlist.length > 0 ? `You have ${wishlist.length} item(s) in your wishlist!` : 'Your wishlist is empty.', 'warning', '❤️');
});

// ===== TESTIMONIALS =====
function renderTestimonials() {
  testimonialsGrid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.name[0]}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-tag">${t.tag}</div>
        </div>
      </div>
    </div>`).join('');
}

// ===== COUNTDOWN =====
function startCountdown() {
  const end = new Date();
  end.setHours(end.getHours() + 3, end.getMinutes() + 47, end.getSeconds() + 22);
  setInterval(() => {
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ===== PROMO CODE COPY =====
copyCode.addEventListener('click', () => {
  navigator.clipboard.writeText('NEXUS20').then(() => {
    copyCode.textContent = 'Copied!';
    showToast('Promo code NEXUS20 copied!', 'success', '✅');
    setTimeout(() => copyCode.textContent = 'Copy', 2000);
  }).catch(() => {
    copyCode.textContent = 'NEXUS20';
  });
});

// ===== NEWSLETTER =====
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  newsletterMsg.textContent = `🎉 Welcome! You're now subscribed with ${email}`;
  newsletterForm.reset();
  showToast('Subscribed successfully!', 'success', '📧');
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== TOAST =====
function showToast(message, type = 'success', icon = '✅') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== PERSIST =====
function saveCart() {
  localStorage.setItem('nexus_cart', JSON.stringify(cart));
}
function saveWishlist() {
  localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist));
}

// ===== UTILITIES =====
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ===== KEYBOARD NAV =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
    checkoutOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== EXPOSE GLOBALS =====
window.openProductModal = openProductModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.toggleWishlist = toggleWishlist;
window.toggleWishlistModal = toggleWishlistModal;
window.selectSize = selectSize;
window.filterByCategory = filterByCategory;
