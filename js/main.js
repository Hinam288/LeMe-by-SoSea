/**
 * Lê Mê - Trà Sữa Đậm Vị (Ngọc Hồi)
 * Theme: Lê Mê Signature Blue & Butter Cream Yellow
 * Clean, Elegant & Minimalist Cafe Experience
 */

// --- 1. PRODUCT DATABASE (Kết hợp hình ảnh thật từ quán) ---
const PRODUCTS = [
  {
    id: 1,
    name: "Cốt Trà Sữa Nguyên Bản (Chai 500ml)",
    category: "signature",
    categoryName: "Dòng Chai Nguyên Bản",
    price: 45000,
    rating: 5.0,
    reviewsCount: 380,
    badge: "BEST SELLER ⭐",
    badgeColor: "bg-sky-600 text-white",
    description: "Cốt trà ủ đậm vị đóng chai thủy tinh thắt dây cói vintage. Tiện lợi trữ lạnh, rót ra dùng trực tiếp với đá.",
    ingredients: "Trà nguyên lá tuyển chọn, sữa tươi béo thanh, công thức độc quyền Lê Mê ủ lạnh",
    image: "assets/single-bottle.jpg"
  },
  {
    id: 2,
    name: "Trà Sữa Lê Mê Signature (Ly Xanh)",
    category: "signature",
    categoryName: "Trà Sữa Đậm Vị",
    price: 35000,
    rating: 5.0,
    reviewsCount: 412,
    badge: "SIGNATURE 🧋",
    badgeColor: "bg-amber-500 text-white",
    description: "Ly màu xanh biểu tượng của Lê Mê. Vị trà đậm đà lưu luyến hòa cùng sữa tươi ngậy dịu, chuẩn gu người sành trà.",
    ingredients: "Cốt trà đậm vị, sữa tươi thanh trùng, trân châu dẻo dai",
    image: "assets/drinks.jpg"
  },
  {
    id: 3,
    name: "Matcha Dâu Tây Phân Tầng",
    category: "signature",
    categoryName: "Trà Sữa Đậm Vị",
    price: 42000,
    rating: 4.9,
    reviewsCount: 295,
    badge: "GEN Z FAVORITE ✨",
    badgeColor: "bg-emerald-600 text-white",
    description: "3 tầng màu sắc nghệ thuật: sốt dâu tây ngọt dịu dưới đáy, sữa tươi thanh béo và lớp matcha Nhật Bản xanh mướt.",
    ingredients: "Matcha nguyên chất Uji, sốt dâu tây tươi nấu thủ công, sữa tươi Đà Lạt",
    image: "assets/drinks.jpg"
  },
  {
    id: 4,
    name: "Trà Hoa Quả Tươi Nhiệt Đới",
    category: "fruittea",
    categoryName: "Trà Hoa Quả",
    price: 38000,
    rating: 4.9,
    reviewsCount: 240,
    badge: "REFRESH 🍑",
    badgeColor: "bg-orange-500 text-white",
    description: "Cốt trà hoa thơm ngát kết hợp cùng những lát đào giòn ngọt mọng nước. Vị chua ngọt cân bằng, giải nhiệt tức thì.",
    ingredients: "Trà đen ủ lạnh, đào miếng tươi ngâm, nước cốt quả mọng",
    image: "assets/drinks.jpg"
  },
  {
    id: 5,
    name: "Combo 4 Vị Cốt Trà Sữa (Set 4 Chai)",
    category: "signature",
    categoryName: "Dòng Chai Nguyên Bản",
    price: 165000,
    rating: 5.0,
    reviewsCount: 180,
    badge: "TIẾT KIỆM 🎁",
    badgeColor: "bg-sky-700 text-white",
    description: "Trọn bộ 4 chai cốt trà đặc trưng: Ô long nướng, Hồng trà sữa, Trà sữa lài và Trà sữa truyền thống.",
    ingredients: "4 chai 500ml thủy tinh thắt cói cao cấp, phù hợp tặng quà hoặc thưởng thức cùng gia đình",
    image: "assets/bottles-lineup.jpg"
  },
  {
    id: 6,
    name: "Trà Lài Dưa Lưới Nha Đam",
    category: "fruittea",
    categoryName: "Trà Hoa Quả",
    price: 39000,
    rating: 4.8,
    reviewsCount: 160,
    badge: "THANH MÁT 🍃",
    badgeColor: "bg-teal-600 text-white",
    description: "Hương hoa lài thanh tao quyện cùng nước ép dưa lưới dịu ngọt và thạch nha đam tươi giòn sần sật.",
    ingredients: "Trà nhài ủ lạnh, dưa lưới mọng nước, nha đam tươi giòn",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Thạch Pha Lê Giòn Nhà Làm",
    category: "topping",
    categoryName: "Topping Cuốn",
    price: 8000,
    rating: 4.9,
    reviewsCount: 310,
    badge: "HOMEMADE 🍮",
    badgeColor: "bg-sky-500 text-white",
    description: "Từng hạt thạch trong suốt giòn dai vui miệng, ngâm trong nước đường phèn dịu ngọt thanh khiết.",
    ingredients: "Thạch rong biển tự nhiên, đường phèn Quảng Ngãi",
    image: "assets/drinks.jpg"
  },
  {
    id: 8,
    name: "Trân Châu Hoàng Kim Nấu Mật",
    category: "topping",
    categoryName: "Topping Cuốn",
    price: 10000,
    rating: 5.0,
    reviewsCount: 420,
    badge: "TOPPING #1 ⭐",
    badgeColor: "bg-amber-600 text-white",
    description: "Trân châu hoàng kim màu óng ánh dẻo bùi, nấu mới mỗi ngày và ngâm cùng mật ong hoa nhãn thơm lừng.",
    ingredients: "Bột năng cao cấp, mật ong rừng nguyên chất, đường mía",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&auto=format&fit=crop&q=80"
  }
];

// --- 2. SHOPPING CART STATE ---
let cart = [];

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("leme_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem("leme_cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, options = {}) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = options.size || "Chuẩn (M)";
  const ice = options.ice || "50% Đá";
  const sugar = options.sugar || "70% Đường";
  const topping = options.topping || "Trân châu hoàng kim (+10k)";
  const toppingPrice = options.toppingPrice !== undefined ? options.toppingPrice : (product.category === 'topping' ? 0 : 10000);
  const sizePrice = size === "Lớn (L)" ? 6000 : 0;
  const finalUnitPrice = product.price + sizePrice + toppingPrice;

  const cartKey = `${product.id}-${size}-${ice}-${sugar}-${topping}`;
  const existingIndex = cart.findIndex(item => item.cartKey === cartKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: finalUnitPrice,
      basePrice: product.price,
      size,
      ice,
      sugar,
      topping,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  showToast(`Đã thêm <b>${product.name}</b> vào giỏ! 🧋`, "success");
  bounceCartButton();
}

function updateItemQuantity(cartKey, delta) {
  const index = cart.findIndex(item => item.cartKey === cartKey);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      showToast("Đã bớt món khỏi giỏ", "info");
    }
    saveCartToStorage();
  }
}

function removeFromCart(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  saveCartToStorage();
  showToast("Đã xóa món khỏi giỏ hàng", "info");
}

function clearCart() {
  cart = [];
  saveCartToStorage();
}

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// --- 3. UI RENDERING FUNCTIONS ---
function renderMenu(filter = "all", searchQuery = "") {
  const container = document.getElementById("product-grid");
  if (!container) return;

  let filtered = PRODUCTS;
  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      p.ingredients.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-3 bg-amber-100 text-[#0672ba] rounded-full flex items-center justify-center text-2xl font-bold">🧋</div>
        <h3 class="text-lg font-bold font-quicksand text-slate-800 mb-1">Không tìm thấy món phù hợp</h3>
        <p class="text-slate-500 text-xs max-w-sm mx-auto">Bạn thử tìm với từ khóa "cốt trà", "trà sữa", "matcha" hoặc bấm xem tất cả nhé.</p>
        <button onclick="resetMenuFilter()" class="mt-4 px-5 py-2.5 bg-[#0672ba] text-[#fde68a] rounded-full font-bold text-xs shadow-sm hover:bg-[#055c99] transition">Xem tất cả menu</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((product) => `
    <div class="group bg-white rounded-3xl p-4 border-2 border-amber-200/80 shadow-card-clean hover:border-[#0672ba] transition-all duration-300 flex flex-col justify-between">
      <div>
        <!-- Image Container -->
        <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 mb-3.5 cursor-pointer" onclick="openProductModal(${product.id})">
          <img src="${product.image}" alt="${product.name}" 
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          
          <!-- Badge -->
          <span class="absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${product.badgeColor}">
            ${product.badge}
          </span>
        </div>

        <!-- Category & Rating -->
        <div class="flex items-center justify-between text-xs mb-1.5">
          <span class="font-bold text-[#0672ba] bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">${product.categoryName}</span>
          <span class="text-amber-500 font-bold text-xs flex items-center gap-1">
            <span>★</span> ${product.rating}
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-base font-bold font-quicksand text-slate-900 mb-1 group-hover:text-[#0672ba] transition-colors cursor-pointer" onclick="openProductModal(${product.id})">
          ${product.name}
        </h3>

        <!-- Description -->
        <p class="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
          ${product.description}
        </p>
      </div>

      <!-- Price & Actions -->
      <div class="pt-3 border-t border-amber-100 flex items-center justify-between mt-auto">
        <div>
          <span class="text-[11px] text-slate-400 block font-medium">Giá từ</span>
          <span class="text-base sm:text-lg font-bold font-quicksand text-[#0672ba]">${formatVND(product.price)}</span>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="openProductModal(${product.id})" class="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#0672ba] transition text-xs font-bold border border-amber-200">
            Tùy chọn
          </button>
          <button onclick="addToCart(${product.id})" title="Thêm vào giỏ" class="w-9 h-9 rounded-xl bg-[#0672ba] hover:bg-[#055c99] text-[#fde68a] flex items-center justify-center font-bold text-base shadow-xs transition active:scale-90">
            +
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function resetMenuFilter() {
  document.querySelectorAll(".menu-tab-btn").forEach(btn => {
    btn.classList.remove("active-tab", "bg-[#0672ba]", "text-[#fde68a]");
    btn.classList.add("bg-white", "text-slate-700", "border-amber-200");
  });
  const allBtn = document.querySelector('[data-filter="all"]');
  if (allBtn) {
    allBtn.classList.add("active-tab", "bg-[#0672ba]", "text-[#fde68a]");
    allBtn.classList.remove("bg-white", "text-slate-700", "border-amber-200");
  }
  const searchInput = document.getElementById("menu-search");
  if (searchInput) searchInput.value = "";
  renderMenu("all", "");
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll(".cart-counter-badge");
  badgeElements.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeshipThreshold = 50000;
  const isFreeship = subtotal >= freeshipThreshold;
  const shippingFee = subtotal === 0 ? 0 : (isFreeship ? 0 : 15000);
  const finalTotal = subtotal + shippingFee;

  const freeshipProgress = document.getElementById("freeship-progress-bar");
  const freeshipText = document.getElementById("freeship-text");
  if (freeshipProgress && freeshipText) {
    if (subtotal === 0) {
      freeshipProgress.style.width = "0%";
      freeshipText.innerHTML = `Đơn từ <b>50.000đ</b> để được <b>FREESHIP</b>! 🛵`;
    } else if (isFreeship) {
      freeshipProgress.style.width = "100%";
      freeshipText.innerHTML = `🎉 Tuyệt vời! Đơn của bạn được <b>FREESHIP</b>!`;
    } else {
      const remaining = freeshipThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeshipThreshold) * 100));
      freeshipProgress.style.width = `${pct}%`;
      freeshipText.innerHTML = `Thêm <b>${formatVND(remaining)}</b> để nhận <b>FREESHIP</b>!`;
    }
  }

  const cartList = document.getElementById("cart-items-list");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartShippingEl = document.getElementById("cart-shipping");
  const cartTotalEl = document.getElementById("cart-total-price");
  const emptyCartState = document.getElementById("cart-empty-state");
  const cartFooter = document.getElementById("cart-footer");

  if (!cartList) return;

  if (cart.length === 0) {
    if (emptyCartState) emptyCartState.classList.remove("hidden");
    if (cartFooter) cartFooter.classList.add("hidden");
    cartList.innerHTML = "";
  } else {
    if (emptyCartState) emptyCartState.classList.add("hidden");
    if (cartFooter) cartFooter.classList.remove("hidden");

    cartList.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold font-quicksand text-xs sm:text-sm text-slate-800 truncate">${item.name}</h4>
          <p class="text-[11px] text-slate-500 line-clamp-1">
            ${item.size} • ${item.sugar} • ${item.ice}
          </p>
          <p class="text-[11px] text-sky-600 font-medium truncate">
            ${item.topping}
          </p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs font-bold text-sky-600">${formatVND(item.price)}</span>
            
            <div class="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden">
              <button onclick="updateItemQuantity('${item.cartKey}', -1)" class="w-5 h-5 flex items-center justify-center text-slate-700 hover:bg-slate-100 text-xs font-bold">-</button>
              <span class="w-6 text-center text-xs font-bold text-slate-800">${item.quantity}</span>
              <button onclick="updateItemQuantity('${item.cartKey}', 1)" class="w-5 h-5 flex items-center justify-center text-slate-700 hover:bg-slate-100 text-xs font-bold">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeFromCart('${item.cartKey}')" title="Xóa món" class="text-slate-400 hover:text-red-500 p-1 self-start">
          ✕
        </button>
      </div>
    `).join("");
  }

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatVND(subtotal);
  if (cartShippingEl) cartShippingEl.textContent = isFreeship ? "0đ (Miễn phí)" : formatVND(shippingFee);
  if (cartTotalEl) cartTotalEl.textContent = formatVND(finalTotal);
}

function bounceCartButton() {
  const btn = document.getElementById("cart-toggle-btn");
  if (btn) {
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 200);
  }
}

// --- 4. TOAST NOTIFICATION ---
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgStyles = {
    success: "bg-white border-l-4 border-sky-600 text-slate-800 shadow-md",
    info: "bg-white border-l-4 border-amber-500 text-slate-800 shadow-md",
    deal: "bg-sky-600 text-white shadow-lg"
  };

  toast.className = `toast-item px-4 py-3 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs font-medium ${bgStyles[type] || bgStyles.info}`;
  toast.innerHTML = `
    <span class="text-sm">🧋</span>
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 ml-2 text-xs">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- 5. PRODUCT CUSTOMIZATION MODAL ---
let activeModalProduct = null;

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  activeModalProduct = product;

  const modal = document.getElementById("product-detail-modal");
  const content = document.getElementById("product-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative flex flex-col sm:flex-row gap-5">
      <!-- Image -->
      <div class="w-full sm:w-5/12">
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
          <span class="absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-1 rounded-full shadow ${product.badgeColor}">
            ${product.badge}
          </span>
        </div>
        <div class="mt-3 p-3 bg-sky-50/70 rounded-xl text-xs text-slate-700">
          <span class="font-bold text-sky-800 block mb-0.5">🍃 Thành phần tuyển chọn:</span>
          <p class="text-slate-600 leading-relaxed text-[11px]">${product.ingredients}</p>
        </div>
      </div>

      <!-- Options -->
      <div class="w-full sm:w-7/12 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold text-sky-600 mb-1 block">${product.categoryName}</span>
          <h3 class="text-xl font-bold font-quicksand text-slate-800 mb-1">${product.name}</h3>
          <p class="text-xs text-slate-500 mb-3">${product.description}</p>
          
          <div class="text-xl font-bold font-quicksand text-sky-600 mb-4" id="modal-calculated-price">
            ${formatVND(product.price)}
          </div>

          <div class="space-y-3.5 text-xs">
            <!-- Size -->
            <div>
              <label class="font-bold text-slate-800 block mb-1">1. Kích thước:</label>
              <div class="grid grid-cols-2 gap-2" id="option-size-group">
                <button type="button" data-val="Chuẩn (M)" data-add="0" class="modal-opt-btn active py-2 px-3 rounded-xl border border-sky-600 bg-sky-50 font-bold text-sky-700 flex justify-between">
                  <span>Size Vừa (M)</span> <span>+0đ</span>
                </button>
                <button type="button" data-val="Lớn (L)" data-add="6000" class="modal-opt-btn py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-medium flex justify-between">
                  <span>Size Lớn (L)</span> <span>+6.000đ</span>
                </button>
              </div>
            </div>

            <!-- Sugar -->
            <div>
              <label class="font-bold text-slate-800 block mb-1">2. Độ ngọt:</label>
              <div class="flex flex-wrap gap-1.5" id="option-sugar-group">
                <button type="button" data-val="100% Đường" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">100%</button>
                <button type="button" data-val="70% Đường" class="modal-opt-btn active py-1 px-2.5 rounded-lg border border-sky-600 bg-sky-50 text-sky-700 font-bold">70% (Chuẩn)</button>
                <button type="button" data-val="50% Đường" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">50%</button>
                <button type="button" data-val="30% Đường" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">30% (Thanh)</button>
                <button type="button" data-val="Không đường" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">0%</button>
              </div>
            </div>

            <!-- Ice -->
            <div>
              <label class="font-bold text-slate-800 block mb-1">3. Lượng đá:</label>
              <div class="flex flex-wrap gap-1.5" id="option-ice-group">
                <button type="button" data-val="100% Đá" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">100%</button>
                <button type="button" data-val="70% Đá" class="modal-opt-btn active py-1 px-2.5 rounded-lg border border-sky-600 bg-sky-50 text-sky-700 font-bold">70% Đá</button>
                <button type="button" data-val="50% Đá" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">50% Đá</button>
                <button type="button" data-val="Ít đá" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">30% Đá</button>
                <button type="button" data-val="Không đá" class="modal-opt-btn py-1 px-2.5 rounded-lg border border-slate-200 text-slate-700">Không đá</button>
              </div>
            </div>

            <!-- Topping -->
            <div>
              <label class="font-bold text-slate-800 block mb-1">4. Topping kèm theo:</label>
              <div class="grid grid-cols-2 gap-2" id="option-topping-group">
                <button type="button" data-val="Trân châu hoàng kim (+10k)" data-price="10000" class="modal-opt-btn active py-2 px-2.5 rounded-xl border border-sky-600 bg-sky-50 font-bold text-sky-700 text-left">
                  <span>Trân châu hoàng kim</span> <span class="block text-[10px] text-sky-600 font-normal">+10.000đ</span>
                </button>
                <button type="button" data-val="Thạch pha lê giòn (+8k)" data-price="8000" class="modal-opt-btn py-2 px-2.5 rounded-xl border border-slate-200 text-slate-700 text-left">
                  <span>Thạch pha lê giòn</span> <span class="block text-[10px] text-slate-500 font-normal">+8.000đ</span>
                </button>
                <button type="button" data-val="Không lấy topping" data-price="0" class="modal-opt-btn py-2 px-2.5 rounded-xl border border-slate-200 text-slate-700 text-left col-span-2">
                  <span>Không lấy topping</span> <span class="text-[10px] text-slate-500 font-normal">+0đ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-slate-100">
          <button onclick="confirmModalAddToCart()" class="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-quicksand font-bold text-sm shadow transition flex items-center justify-center gap-2">
            <span>Thêm Vào Giỏ Hàng</span>
            <span>🧋</span>
          </button>
        </div>
      </div>
    </div>
  `;

  setupModalOptionListeners();
  updateModalPriceDisplay();

  modal.classList.remove("hidden");
}

function setupModalOptionListeners() {
  const btnGroups = ["option-size-group", "option-sugar-group", "option-ice-group", "option-topping-group"];
  btnGroups.forEach(groupId => {
    const group = document.getElementById(groupId);
    if (!group) return;
    const buttons = group.querySelectorAll(".modal-opt-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => {
          b.classList.remove("active", "border-sky-600", "bg-sky-50", "text-sky-700", "font-bold");
          b.classList.add("border-slate-200", "text-slate-700");
        });
        btn.classList.add("active", "border-sky-600", "bg-sky-50", "text-sky-700", "font-bold");
        btn.classList.remove("border-slate-200", "text-slate-700");
        updateModalPriceDisplay();
      });
    });
  });
}

function updateModalPriceDisplay() {
  if (!activeModalProduct) return;
  const sizeBtn = document.querySelector("#option-size-group .modal-opt-btn.active");
  const toppingBtn = document.querySelector("#option-topping-group .modal-opt-btn.active");

  const sizeAdd = sizeBtn ? parseInt(sizeBtn.getAttribute("data-add") || "0", 10) : 0;
  const toppingAdd = toppingBtn ? parseInt(toppingBtn.getAttribute("data-price") || "0", 10) : 0;

  const total = activeModalProduct.price + sizeAdd + toppingAdd;
  const priceEl = document.getElementById("modal-calculated-price");
  if (priceEl) {
    priceEl.textContent = formatVND(total);
  }
}

function confirmModalAddToCart() {
  if (!activeModalProduct) return;

  const sizeBtn = document.querySelector("#option-size-group .modal-opt-btn.active");
  const sugarBtn = document.querySelector("#option-sugar-group .modal-opt-btn.active");
  const iceBtn = document.querySelector("#option-ice-group .modal-opt-btn.active");
  const toppingBtn = document.querySelector("#option-topping-group .modal-opt-btn.active");

  const options = {
    size: sizeBtn ? sizeBtn.getAttribute("data-val") : "Chuẩn (M)",
    sugar: sugarBtn ? sugarBtn.getAttribute("data-val") : "70% Đường",
    ice: iceBtn ? iceBtn.getAttribute("data-val") : "70% Đá",
    topping: toppingBtn ? toppingBtn.getAttribute("data-val") : "Trân châu hoàng kim (+10k)",
    toppingPrice: toppingBtn ? parseInt(toppingBtn.getAttribute("data-price") || "10000", 10) : 10000
  };

  addToCart(activeModalProduct.id, options);
  closeProductModal();
}

function closeProductModal() {
  const modal = document.getElementById("product-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    activeModalProduct = null;
  }
}

// Drawer
function toggleCartDrawer(open = true) {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  if (!backdrop || !drawer) return;

  if (open) {
    backdrop.classList.add("open");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  } else {
    backdrop.classList.remove("open");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Checkout Modal
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Giỏ hàng đang trống! Vui lòng chọn món trước.", "info");
    return;
  }
  toggleCartDrawer(false);

  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeship = subtotal >= 50000;
  const shippingFee = isFreeship ? 0 : 15000;
  const total = subtotal + shippingFee;

  document.getElementById("checkout-summary-items").textContent = `${cart.length} món (${cart.reduce((s,i)=>s+i.quantity,0)} ly)`;
  document.getElementById("checkout-summary-subtotal").textContent = formatVND(subtotal);
  document.getElementById("checkout-summary-shipping").textContent = isFreeship ? "Miễn phí (Freeship)" : formatVND(shippingFee);
  document.getElementById("checkout-summary-total").textContent = formatVND(total);

  modal.classList.remove("hidden");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.add("hidden");
}

let lastGeneratedOrderMessage = "";

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (cart.length === 0) {
    showToast("Giỏ hàng đang trống!", "info");
    return;
  }

  const name = document.getElementById("order-name")?.value.trim() || "Khách hàng";
  const phone = document.getElementById("order-phone")?.value.trim() || "";
  const address = document.getElementById("order-address")?.value.trim() || "";
  const note = document.getElementById("order-note")?.value.trim() || "";
  const paymentMethodInput = document.querySelector('input[name="payment_method"]:checked');
  const paymentMethod = paymentMethodInput?.value === "chuyenkhoan" ? "Chuyển khoản / VietQR" : "Tiền mặt khi nhận (COD)";

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeship = subtotal >= 50000;
  const shippingFee = isFreeship ? 0 : 15000;
  const total = subtotal + shippingFee;
  const orderId = "LM-" + Math.floor(100000 + Math.random() * 900000);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ngày ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  // Soạn chi tiết từng món
  const itemsText = cart.map((item, index) => {
    let opt = [];
    if (item.size) opt.push(`Size: ${item.size}`);
    if (item.sugar) opt.push(item.sugar);
    if (item.ice) opt.push(item.ice);
    if (item.topping && item.topping !== "Không lấy topping") opt.push(`Topping: ${item.topping}`);
    const optStr = opt.length > 0 ? `   (${opt.join(' • ')})` : '';
    return `${index + 1}. ${item.name} x ${item.quantity} ly = ${formatVND(item.price * item.quantity)}\n${optStr}`;
  }).join('\n');

  // Bản tin nhắn đầy đủ gửi quán
  lastGeneratedOrderMessage = `🧋 [ĐƠN HÀNG MỚI - LÊ MÊ TRÀ SỮA ĐẬM VỊ - NGỌC HỒI]
Mã đơn: ${orderId}
Thời gian: ${timeStr}

👤 THÔNG TIN KHÁCH HÀNG:
• Họ tên: ${name}
• Số điện thoại: ${phone}
• Địa chỉ nhận hàng: ${address}
${note ? `• Ghi chú: ${note}\n` : ''}• Thanh toán: ${paymentMethod}

📋 DANH SÁCH MÓN ĐÃ CHỌN:
${itemsText}

💰 TỔNG CỘNG:
• Tạm tính: ${formatVND(subtotal)}
• Phí ship: ${isFreeship ? '0đ (Miễn phí Freeship)' : formatVND(shippingFee)}
👉 TỔNG THANH TOÁN: ${formatVND(total)}

Quán xác nhận đơn giúp em nhé ạ! Cảm ơn Lê Mê ❤️`;

  // Tự động sao chép vào clipboard để khách chỉ cần Paste
  navigator.clipboard.writeText(lastGeneratedOrderMessage).catch(() => {});

  closeCheckoutModal();
  triggerConfetti();

  // Điền dữ liệu vào Popup thông báo
  const orderSuccessModal = document.getElementById("order-success-modal");
  if (orderSuccessModal) {
    const orderIdEl = document.getElementById("success-order-id");
    const nameEl = document.getElementById("success-customer-name");
    const phoneEl = document.getElementById("success-customer-phone");
    const addressEl = document.getElementById("success-customer-address");
    const totalEl = document.getElementById("success-order-total");

    if (orderIdEl) orderIdEl.textContent = orderId;
    if (nameEl) nameEl.textContent = name;
    if (phoneEl) phoneEl.textContent = phone;
    if (addressEl) addressEl.textContent = address;
    if (totalEl) totalEl.textContent = formatVND(total);

    orderSuccessModal.classList.remove("hidden");
  }

  showToast(`🎉 Đã sao chép đơn! Đang kết nối Zalo quán...`, "deal");

  // Mở tab Zalo quán sau 500ms
  setTimeout(() => {
    window.open("https://zalo.me/0362126184", "_blank");
  }, 600);

  // Xóa giỏ hàng
  clearCart();
}

function copyGeneratedOrderText() {
  if (!lastGeneratedOrderMessage) {
    showToast("Không tìm thấy thông tin đơn hàng", "info");
    return;
  }
  navigator.clipboard.writeText(lastGeneratedOrderMessage).then(() => {
    showToast("📋 Đã sao chép chi tiết đơn hàng! Bạn có thể dán (Paste) vào Zalo/Messenger.", "deal");
  }).catch(() => {
    showToast("Vui lòng thử lại", "info");
  });
}

function closeSuccessModal() {
  const modal = document.getElementById("order-success-modal");
  if (modal) modal.classList.add("hidden");
}

// Deal / Voucher Hub Modal
function openDealModal() {
  const modal = document.getElementById("deal-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeDealModal() {
  const modal = document.getElementById("deal-modal");
  if (modal) modal.classList.add("hidden");
}

function copyVoucherCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Đã sao chép mã <b>${code}</b>! Dùng ngay khi đặt món ✨`, "deal");
  }).catch(() => {
    showToast(`Mã giảm giá: <b>${code}</b>`, "deal");
  });
}

// Newsletter form
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("newsletter-email");
  if (!input || !input.value) return;

  triggerConfetti();
  showToast("🎉 Mã giảm 20%: <b>LEME20OFF</b>!", "deal");

  const voucherBox = document.getElementById("newsletter-voucher-result");
  if (voucherBox) {
    voucherBox.classList.remove("hidden");
  }
  input.value = "";
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#fde68a', '#10b981', '#38bdf8']
    });
  }
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderMenu("all", "");
  loadCartFromStorage();

  const filterTabs = document.querySelectorAll(".menu-tab-btn");
  filterTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      filterTabs.forEach(b => {
        b.classList.remove("active-tab", "bg-[#0672ba]", "text-[#fde68a]");
        b.classList.add("bg-white", "text-slate-700", "border-amber-200");
      });
      btn.classList.add("active-tab", "bg-[#0672ba]", "text-[#fde68a]");
      btn.classList.remove("bg-white", "text-slate-700", "border-amber-200");

      const filter = btn.getAttribute("data-filter") || "all";
      const searchInput = document.getElementById("menu-search");
      const searchQuery = searchInput ? searchInput.value : "";
      renderMenu(filter, searchQuery);
    });
  });

  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeTab = document.querySelector(".menu-tab-btn.active-tab");
      const filter = activeTab ? activeTab.getAttribute("data-filter") : "all";
      renderMenu(filter, e.target.value);
    });
  }

  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("glass-nav", "shadow-sm");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove("glass-nav", "shadow-sm");
      header.classList.add("bg-transparent");
    }
  });

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      once: true,
      duration: 600,
      offset: 40,
      easing: 'ease-out-cubic'
    });
  }
});
