/**
 * Lê Mê - Trà Sữa Đậm Vị - Ngọc Hồi
 * Địa chỉ: Số 2, ngách 298/31 đường Ngọc Hồi, Yên Ngưu, Đại Thanh, Hà Nội
 * Theme: Matcha Sage (#3a5a40), Cream (#e9edc9) & Warm Gold (#d4b872)
 */

// --- HELPERS ---
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

// --- 1. MENU CHÍNH THỨC — LÊ MÊ: LÀN GIÓ HƯƠNG TRÀ ---
// Bảng giá M / L và Topping đối chiếu theo bảng menu tại quán trên Google Maps & sản phẩm đóng chai của quán.
const PRODUCTS = [
  // HƯƠNG TRÀ NGUYÊN BẢN
  {
    id: 1,
    name: "Vấn Vương",
    category: "original",
    categoryName: "Hương trà nguyên bản",
    price: 27000,
    priceL: 37000,
    badge: "Signature",
    description: "Ô long, sữa, trân châu. Thơm đậm hương trà ô long, hậu vị dịu ngọt.",
    image: "assets/open.jpg",
    imagePos: "center 58%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 2,
    name: "Đậm Hương",
    category: "original",
    categoryName: "Hương trà nguyên bản",
    price: 27000,
    priceL: 37000,
    badge: "Đậm trà",
    description: "Hồng trà, sữa, trân châu. Vị hồng trà đậm đà truyền thống dễ ghiền.",
    image: "assets/open.jpg",
    imagePos: "center 52%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 3,
    name: "Thơm Dịu",
    category: "original",
    categoryName: "Hương trà nguyên bản",
    price: 29000,
    priceL: 39000,
    badge: "",
    description: "Ô long nhài, sữa, trân châu. Hương hoa nhài thanh nhẹ, béo dịu vừa phải.",
    image: "assets/open.jpg",
    imagePos: "center 62%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 4,
    name: "Hồng Trà Cacao",
    category: "original",
    categoryName: "Hương trà nguyên bản",
    price: 29000,
    priceL: 39000,
    badge: "",
    description: "Hồng trà, sữa, trân châu, cacao. Hòa quyện vị cacao thơm ấm cùng hồng trà.",
    image: "assets/open.jpg",
    imagePos: "center 56%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },

  // VỊ TRÀ CAO CẤP & SỮA TƯƠI THỦ CÔNG
  {
    id: 5,
    name: "Olong Lá Dứa",
    category: "premium",
    categoryName: "Vị trà cao cấp",
    price: 49000,
    priceL: 59000,
    badge: "Best Seller",
    description: "Ô long, sữa, lá dứa, trân châu, thạch lá dứa, kem cheese tươi.",
    image: "assets/drinks.jpg",
    imagePos: "72% 78%",
    imageZoom: "scale(2.2)",
    imageOrigin: "70% 80%",
    hasOptions: true,
    hasHotOption: false
  },
  {
    id: 6,
    name: "Vị Hạnh Trà",
    category: "premium",
    categoryName: "Vị trà cao cấp",
    price: 42000,
    priceL: 52000,
    badge: "",
    description: "Hồng trà, sữa, hạnh nhân, trân châu, kem cheese tươi béo mịn.",
    image: "assets/open.jpg",
    imagePos: "center 55%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 7,
    name: "Hồng Trà Kem Mây",
    category: "premium",
    categoryName: "Vị trà cao cấp",
    price: 42000,
    priceL: 52000,
    badge: "Kem trứng",
    description: "Hồng trà, sữa, trân châu, phủ lớp kem trứng sánh mịn thơm béo.",
    image: "assets/open.jpg",
    imagePos: "center 50%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 8,
    name: "Hồng Trà Đường Nâu",
    category: "premium",
    categoryName: "Vị trà cao cấp",
    price: 52000,
    priceL: 62000,
    badge: "",
    description: "Hồng trà, sữa, trân châu, đường nâu thơm ngọt và lớp kem trứng.",
    image: "assets/open.jpg",
    imagePos: "center 60%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },
  {
    id: 9,
    name: "Sữa Tươi Trân Châu Đường Nâu",
    category: "premium",
    categoryName: "Sữa tươi thủ công",
    price: 52000,
    priceL: 62000,
    badge: "Thủ công",
    description: "Sữa tươi, đường nâu, trân châu đường nâu nấu dẻo thơm.",
    image: "assets/single-bottle.jpg",
    imagePos: "center 66%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: true,
    hasHotOption: true
  },

  // TRÀ VỊ HOA QUẢ
  {
    id: 10,
    name: "Trà Cam Đào",
    category: "fruittea",
    categoryName: "Trà vị hoa quả",
    price: 39000,
    priceL: 49000,
    badge: "Thanh mát",
    description: "Hồng trà, đào miếng, cam vàng tươi, nước cốt sả thơm dịu.",
    image: "assets/drinks.jpg",
    imagePos: "38% 60%",
    imageZoom: "scale(1.85)",
    imageOrigin: "36% 62%",
    hasOptions: true,
    hasHotOption: false
  },
  {
    id: 11,
    name: "Trà Xoài Lá Dứa",
    category: "fruittea",
    categoryName: "Trà vị hoa quả",
    price: 42000,
    priceL: 52000,
    badge: "",
    description: "Ô long nhài, xoài cát chín ngọt, thạch lá dứa thanh mát.",
    image: "assets/drinks.jpg",
    imagePos: "38% 58%",
    imageZoom: "scale(1.85)",
    imageOrigin: "36% 60%",
    hasOptions: true,
    hasHotOption: false
  },
  {
    id: 12,
    name: "Mộc Tê Hoa Vải",
    category: "fruittea",
    categoryName: "Trà vị hoa quả",
    price: 35000,
    priceL: 45000,
    badge: "",
    description: "Hồng trà, hương quế hoa mộc tê, vải ngọt và chanh vàng tươi.",
    image: "assets/drinks.jpg",
    imagePos: "38% 62%",
    imageZoom: "scale(1.85)",
    imageOrigin: "36% 64%",
    hasOptions: true,
    hasHotOption: false
  },
  {
    id: 13,
    name: "Trà Chanh Vàng",
    category: "fruittea",
    categoryName: "Trà vị hoa quả",
    price: 15000,
    priceL: 25000,
    badge: "Giải nhiệt",
    description: "Hồng trà pha tươi cùng chanh vàng thơm thanh, giải khát tức thì.",
    image: "assets/drinks.jpg",
    imagePos: "38% 56%",
    imageZoom: "scale(1.85)",
    imageOrigin: "36% 58%",
    hasOptions: true,
    hasHotOption: false
  },
  {
    id: 14,
    name: "Trà Sen Olong",
    category: "fruittea",
    categoryName: "Trà vị hoa quả",
    price: 49000,
    priceL: 59000,
    badge: "",
    description: "Ô long nhài, hạt sen bùi, hạt củ năng nổ giòn và kem cheese tươi.",
    image: "assets/drinks.jpg",
    imagePos: "72% 78%",
    imageZoom: "scale(2.2)",
    imageOrigin: "70% 80%",
    hasOptions: true,
    hasHotOption: false
  },

  // CỐT TRÀ ĐÓNG CHAI MANG VỀ
  {
    id: 15,
    name: "Cốt Trà Sữa Đóng Chai",
    category: "bottle",
    categoryName: "Cốt trà đóng chai",
    price: 45000,
    priceL: 45000,
    badge: "Mang về",
    description: "Cốt trà sữa đóng chai thủy tinh 500ml, bảo quản lạnh, rót ra ly đá là uống.",
    image: "assets/single-bottle.jpg",
    imagePos: "center 65%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: false,
    hasHotOption: false
  },
  {
    id: 16,
    name: "Set 4 Chai Cốt Trà Sữa",
    category: "bottle",
    categoryName: "Cốt trà đóng chai",
    price: 165000,
    priceL: 165000,
    badge: "Làm quà",
    description: "Bộ 4 chai cốt trà sữa nhiều vị, hợp biếu tặng hoặc thưởng thức cùng gia đình.",
    image: "assets/bottles-lineup.jpg",
    imagePos: "center 68%",
    imageZoom: "",
    imageOrigin: "center center",
    hasOptions: false,
    hasHotOption: false
  }
];

const TOPPINGS = [
  { id: "pudding", name: "Thạch pudding", price: 5000 },
  { id: "moc-te", name: "Thạch hoa mộc tê", price: 5000 },
  { id: "tc-den", name: "Trân châu đen", price: 7000 },
  { id: "tc-olong", name: "Trân châu ô long", price: 7000 },
  { id: "kem-trung", name: "Kem trứng", price: 10000 },
  { id: "kem-cheese", name: "Kem cheese tươi", price: 10000 },
  { id: "kem-muoi", name: "Kem muối", price: 10000 }
];

const SHIPPING_NOTE = "Freeship trong bán kính 2km. Xa hơn quán sẽ báo phí khi xác nhận đơn.";
const SIZE_OPTIONS = ["M", "L"];
const TEMP_OPTIONS = ["Đá", "Nóng"];
const SUGAR_OPTIONS = ["100% đường", "70% đường", "50% đường", "30% đường", "0% đường"];
const ICE_OPTIONS = ["100% đá", "70% đá", "50% đá", "30% đá", "0% đá"];

function buildImgStyle(product) {
  const parts = [`object-position: ${product.imagePos || "center"}`];
  if (product.imageZoom) {
    parts.push(`transform: ${product.imageZoom}`);
    parts.push(`transform-origin: ${product.imageOrigin || "center center"}`);
  }
  return parts.join("; ");
}

function normalizeToppingIds(ids) {
  if (!Array.isArray(ids)) return [];
  const validSet = new Set(TOPPINGS.map(t => t.id));
  return [...new Set(ids.filter(id => typeof id === "string" && validSet.has(id)))].sort();
}

function getToppingObjects(ids) {
  return normalizeToppingIds(ids)
    .map(id => TOPPINGS.find(t => t.id === id))
    .filter(Boolean);
}

function calculateUnitPrice(product, size, toppingIds) {
  if (!product) return 0;
  const base = product.hasOptions && size === "L" ? product.priceL : product.price;
  const toppingTotal = product.hasOptions
    ? getToppingObjects(toppingIds).reduce((sum, t) => sum + t.price, 0)
    : 0;
  return base + toppingTotal;
}

function buildCartItemOptionsSummary(item) {
  if (!item.size && !item.sugar) return "";
  const parts = [];
  if (item.size) parts.push(`Size ${item.size}`);
  if (item.temp === "Nóng") {
    parts.push("Nóng");
    if (item.sugar) parts.push(item.sugar);
  } else {
    if (item.sugar) parts.push(item.sugar);
    if (item.ice) parts.push(item.ice);
  }
  const toppingNames = getToppingObjects(item.toppings).map(t => t.name);
  if (toppingNames.length > 0) parts.push(`+ ${toppingNames.join(", ")}`);
  return parts.join(" • ");
}

// --- 2. CART STATE ---
let cart = [];

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("leme_cart_v2");
    const parsed = saved ? JSON.parse(saved) : [];
    cart = [];
    if (Array.isArray(parsed)) parsed.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item?.id);
      if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) return;

      const size = product.hasOptions ? (SIZE_OPTIONS.includes(item.size) ? item.size : "M") : "";
      const temp = product.hasOptions
        ? (product.hasHotOption && TEMP_OPTIONS.includes(item.temp) ? item.temp : "Đá")
        : "";
      const sugar = product.hasOptions ? (SUGAR_OPTIONS.includes(item.sugar) ? item.sugar : "70% đường") : "";
      const ice = product.hasOptions
        ? (temp === "Nóng" ? "Không đá" : (ICE_OPTIONS.includes(item.ice) ? item.ice : "70% đá"))
        : "";
      const toppings = product.hasOptions ? normalizeToppingIds(item.toppings) : [];
      const unitPrice = calculateUnitPrice(product, size, toppings);
      const cartKey = `${product.id}|${size}|${temp}|${sugar}|${ice}|${toppings.join(",")}`;

      const existing = cart.find(entry => entry.cartKey === cartKey);
      if (existing) {
        existing.quantity = Math.min(99, existing.quantity + item.quantity);
      } else {
        cart.push({
          cartKey,
          id: product.id,
          name: product.name,
          price: unitPrice,
          size,
          temp,
          sugar,
          ice,
          toppings,
          image: product.image,
          imagePos: product.imagePos,
          imageZoom: product.imageZoom || "",
          imageOrigin: product.imageOrigin || "center center",
          quantity: Math.min(99, item.quantity)
        });
      }
    });
  } catch {
    cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  try {
    localStorage.setItem("leme_cart_v2", JSON.stringify(cart));
  } catch {
    showToast("Không lưu được giỏ hàng trên thiết bị này. Bạn giữ trang mở đến khi gửi đơn nhé.");
  }
  updateCartUI();
}

// --- AUDIO SYNTHESIZER (Web Audio API) ---
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.08);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch { /* Optional sound feedback */ }
}

function playTickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch { /* Optional sound feedback */ }
}

function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + idx * 0.07;
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.10, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.28);
    });
  } catch { /* Optional sound feedback */ }
}

// --- FLY TO CART ANIMATION ---
function triggerFlyToCart(sourceEl, imgSrc) {
  if (!sourceEl || prefersReducedMotion()) {
    bounceCartButton();
    playPopSound();
    return;
  }
  const mobileDock = document.getElementById("mobile-dock-cart");
  const headerCart = document.getElementById("cart-toggle-btn");
  const isMobile = window.innerWidth < 1024 && mobileDock && mobileDock.offsetParent !== null;
  const targetCart = isMobile ? mobileDock : headerCart;
  if (!targetCart) return;

  const startRect = sourceEl.getBoundingClientRect();
  const targetRect = targetCart.getBoundingClientRect();

  const fly = document.createElement("div");
  fly.className = "flying-cart-item";
  fly.style.backgroundImage = `url('${imgSrc || "assets/logo.png"}')`;
  const startX = startRect.left + startRect.width / 2 - 24;
  const startY = startRect.top + startRect.height / 2 - 24;
  fly.style.left = `${startX}px`;
  fly.style.top = `${startY}px`;
  document.body.appendChild(fly);

  const deltaX = targetRect.left + targetRect.width / 2 - 24 - startX;
  const deltaY = targetRect.top + targetRect.height / 2 - 24 - startY;

  requestAnimationFrame(() => {
    fly.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
    fly.style.opacity = "0.2";
  });

  setTimeout(() => {
    fly.remove();
    bounceCartButton();
    playPopSound();
  }, 650);
}

function addToCart(productId, options = {}, sourceEl = null, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const qty = Math.max(1, Math.min(99, Number.isInteger(quantity) ? quantity : 1));
  const size = product.hasOptions ? (SIZE_OPTIONS.includes(options.size) ? options.size : "M") : "";
  const temp = product.hasOptions
    ? (product.hasHotOption && TEMP_OPTIONS.includes(options.temp) ? options.temp : "Đá")
    : "";
  const sugar = product.hasOptions ? (SUGAR_OPTIONS.includes(options.sugar) ? options.sugar : "70% đường") : "";
  const ice = product.hasOptions
    ? (temp === "Nóng" ? "Không đá" : (ICE_OPTIONS.includes(options.ice) ? options.ice : "70% đá"))
    : "";
  const toppings = product.hasOptions ? normalizeToppingIds(options.toppings) : [];
  const unitPrice = calculateUnitPrice(product, size, toppings);

  const cartKey = `${product.id}|${size}|${temp}|${sugar}|${ice}|${toppings.join(",")}`;
  const existing = cart.find(item => item.cartKey === cartKey);

  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + qty);
  } else {
    cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: unitPrice,
      size,
      temp,
      sugar,
      ice,
      toppings,
      image: product.image,
      imagePos: product.imagePos,
      imageZoom: product.imageZoom || "",
      imageOrigin: product.imageOrigin || "center center",
      quantity: qty
    });
  }

  saveCartToStorage();
  const sizeLabel = size ? ` (${size})` : "";
  const qtyText = qty > 1 ? ` ×${qty}` : "";
  showToast(`Đã thêm ${product.name}${sizeLabel}${qtyText} vào giỏ`, "success");

  if (sourceEl) {
    triggerFlyToCart(sourceEl, product.image);
  } else {
    bounceCartButton();
    playPopSound();
  }
}

function updateItemQuantity(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.quantity = Math.min(99, item.quantity + delta);
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartKey !== cartKey);
  }
  playPopSound();
  saveCartToStorage();
}

function removeFromCart(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  saveCartToStorage();
}

function clearCart() {
  cart = [];
  saveCartToStorage();
}

function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// --- 3. MENU RENDERING (Compact Boutique Café Cards) ---
function renderMenu(filter = "all") {
  const container = document.getElementById("product-grid");
  if (!container) return;

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  container.innerHTML = filtered.map(product => `
    <div class="group bg-white rounded-3xl p-3.5 sm:p-4 border border-[#e4e8d8] card-soft flex items-center gap-3.5 sm:gap-4" data-product-id="${product.id}">
      <button type="button" aria-label="Chọn ${escapeHtml(product.name)}" class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#f0f2eb] flex-shrink-0 cursor-pointer block" onclick="handleProductClick(${product.id}, event)">
        <div class="product-img-frame">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async"
               style="${buildImgStyle(product)}"
               class="product-card-img w-full h-full object-cover">
        </div>
        ${product.badge ? `<span class="absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#3a5a40] shadow-sm border border-[#e4e8d8]/80">${escapeHtml(product.badge)}</span>` : ""}
      </button>

      <div class="flex-1 min-w-0 flex flex-col self-stretch">
        <div class="flex items-center justify-between gap-2 mb-0.5">
          <span class="text-[11px] font-semibold text-[#3a5a40] truncate">${escapeHtml(product.categoryName)}</span>
          ${product.hasHotOption ? `<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f2eb] text-[#3a5a40] flex-shrink-0">Đá / Nóng</span>` : ""}
        </div>

        <h3 class="text-base sm:text-lg font-bold font-quicksand text-slate-900 leading-snug truncate">${escapeHtml(product.name)}</h3>
        <p class="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 mt-0.5 mb-2.5">${escapeHtml(product.description)}</p>

        <div class="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-[#e4e8d8]/80">
          <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
            <span class="text-base sm:text-lg font-bold font-quicksand text-[#3a5a40]">${formatVND(product.price)}</span>
            ${product.hasOptions ? `<span class="text-[11px] font-semibold text-slate-500">M · L ${formatVND(product.priceL)}</span>` : `<span class="text-[11px] font-semibold text-slate-500">Chai 500ml</span>`}
          </div>
          <button type="button" onclick="handleProductClick(${product.id}, event)" title="Thêm vào giỏ" aria-label="Thêm ${escapeHtml(product.name)} vào giỏ"
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3a5a40] hover:bg-[#d4b872] text-[#e9edc9] hover:text-slate-900 flex items-center justify-center font-bold text-xl flex-shrink-0 transition active:scale-90 shadow-sm">
            +
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function handleProductClick(productId, event = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const targetEl = event?.currentTarget || event?.target;
  const card = targetEl?.closest?.(".group");
  const imgEl = card?.querySelector?.(".product-card-img") || targetEl;

  if (product.hasOptions) {
    playTickSound();
    openProductModal(productId);
  } else {
    addToCart(productId, {}, imgEl, 1);
  }
}

function updateCartUI() {
  const totalCount = getItemCount();
  const subtotal = getSubtotal();

  document.querySelectorAll(".cart-counter-badge").forEach(badge => {
    badge.textContent = totalCount;
    badge.classList.toggle("hidden", totalCount === 0);
  });

  const headerCount = document.getElementById("cart-header-count");
  if (headerCount) {
    headerCount.textContent = `${totalCount} món`;
    headerCount.classList.toggle("hidden", totalCount === 0);
  }

  const mobileDockText = document.getElementById("mobile-dock-cart-text");
  if (mobileDockText) {
    if (totalCount === 0) {
      mobileDockText.textContent = "Giỏ (0đ)";
    } else {
      mobileDockText.textContent = `${totalCount} món • ${formatVND(subtotal)}`;
    }
  }

  const cartList = document.getElementById("cart-items-list");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const emptyCartState = document.getElementById("cart-empty-state");
  const cartFooter = document.getElementById("cart-footer");

  if (!cartList) return;

  if (cart.length === 0) {
    emptyCartState?.classList.remove("hidden");
    cartFooter?.classList.add("hidden");
    cartList.innerHTML = "";
  } else {
    emptyCartState?.classList.add("hidden");
    cartFooter?.classList.remove("hidden");

    cartList.innerHTML = cart.map(item => {
      const optSummary = buildCartItemOptionsSummary(item);
      return `
        <div class="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-[#e4e8d8]/80">
          <div class="w-14 h-14 rounded-xl overflow-hidden bg-[#f0f2eb] flex-shrink-0">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" style="${buildImgStyle(item)}"
                 class="w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold font-quicksand text-sm text-slate-800 truncate">${escapeHtml(item.name)}</h4>
            ${optSummary ? `<p class="text-xs text-slate-500 leading-snug mt-0.5">${escapeHtml(optSummary)}</p>` : ""}
            <div class="flex items-center justify-between mt-2">
              <span class="text-sm font-bold text-[#3a5a40]">${formatVND(item.price)}</span>
              <div class="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden">
                <button type="button" onclick="updateItemQuantity('${escapeHtml(item.cartKey)}', -1)" class="w-7 h-7 text-slate-700 hover:bg-slate-100 font-bold active:scale-95 transition" aria-label="Bớt">−</button>
                <span class="w-7 text-center text-sm font-bold text-slate-800">${item.quantity}</span>
                <button type="button" onclick="updateItemQuantity('${escapeHtml(item.cartKey)}', 1)" class="w-7 h-7 text-slate-700 hover:bg-slate-100 font-bold active:scale-95 transition" aria-label="Thêm">+</button>
              </div>
            </div>
          </div>
          <button type="button" onclick="removeFromCart('${escapeHtml(item.cartKey)}')" title="Xóa món" aria-label="Xóa món" class="text-slate-400 hover:text-red-500 p-1 self-start transition">✕</button>
        </div>
      `;
    }).join("");
  }

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatVND(subtotal);
}

function bounceCartButton() {
  if (prefersReducedMotion()) return;
  const btn = document.getElementById("cart-toggle-btn");
  const mobileDockBtn = document.getElementById("mobile-dock-cart");
  [btn, mobileDockBtn].forEach(el => {
    if (el) {
      el.classList.remove("cart-bounce-effect");
      void el.offsetWidth;
      el.classList.add("cart-bounce-effect");
      setTimeout(() => el.classList.remove("cart-bounce-effect"), 500);
    }
  });
}

// --- 4. TOAST ---
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const styles = {
    success: "bg-white border-l-4 border-[#3a5a40] text-slate-800",
    info: "bg-white border-l-4 border-amber-400 text-slate-800"
  };

  const toast = document.createElement("div");
  toast.className = `toast-item px-4 py-3 rounded-xl shadow-lg border border-[#e4e8d8] flex items-center gap-2.5 text-sm ${styles[type] || styles.info}`;

  const textEl = document.createElement("div");
  textEl.className = "flex-1 font-medium";
  textEl.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "text-slate-400 hover:text-slate-600 ml-2 flex-shrink-0";
  closeBtn.setAttribute("aria-label", "Đóng");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", () => toast.remove());

  toast.append(textEl, closeBtn);
  container.appendChild(toast);

  setTimeout(() => {
    if (!toast.isConnected) return;
    toast.style.animation = "toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- 5. PRODUCT OPTIONS MODAL (Size M/L, Đá/Nóng, Đường, Đá, Topping, Số lượng) ---
let activeModalProduct = null;
let activeModalQty = 1;
let activeModalSize = "M";
let activeModalTemp = "Đá";
let activeModalToppings = new Set();

function optionButtons(groupId, values, activeValue) {
  return `
    <div class="flex flex-wrap gap-1.5" id="${groupId}">
      ${values.map(v => `
        <button type="button" data-val="${escapeHtml(v)}" aria-pressed="${v === activeValue}"
                class="modal-opt-btn py-1.5 px-3 rounded-lg border text-xs sm:text-sm transition ${v === activeValue ? "active border-[#3a5a40] bg-[#f0f2eb] text-[#3a5a40] font-bold" : "border-slate-200 text-slate-700 hover:border-[#3a5a40]/50"}">
          ${escapeHtml(v)}
        </button>
      `).join("")}
    </div>
  `;
}

function refreshModalTotal() {
  if (!activeModalProduct) return;
  const unitPrice = calculateUnitPrice(activeModalProduct, activeModalSize, [...activeModalToppings]);
  const qtyEl = document.getElementById("modal-qty-value");
  const totalEl = document.getElementById("modal-line-total");
  const unitEl = document.getElementById("modal-unit-price");
  if (qtyEl) qtyEl.textContent = String(activeModalQty);
  if (unitEl) unitEl.textContent = formatVND(unitPrice);
  if (totalEl) totalEl.textContent = formatVND(unitPrice * activeModalQty);
}

function updateModalQty(delta) {
  if (!activeModalProduct) return;
  activeModalQty = Math.max(1, Math.min(99, activeModalQty + delta));
  refreshModalTotal();
  playTickSound();
}

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  activeModalProduct = product;
  activeModalQty = 1;
  activeModalSize = "M";
  activeModalTemp = "Đá";
  activeModalToppings = new Set();

  const modal = document.getElementById("product-detail-modal");
  const content = document.getElementById("product-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-4">
      <!-- Header sản phẩm -->
      <div class="flex items-center gap-4 pr-7">
        <div class="w-20 h-20 rounded-2xl overflow-hidden bg-[#f0f2eb] border border-[#e4e8d8] flex-shrink-0">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" style="${buildImgStyle(product)}" class="w-full h-full object-cover">
        </div>
        <div class="min-w-0">
          <span class="text-xs font-semibold text-[#3a5a40]">${escapeHtml(product.categoryName)}</span>
          <h3 class="text-lg sm:text-xl font-bold font-quicksand text-slate-900 leading-tight">${escapeHtml(product.name)}</h3>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-2">${escapeHtml(product.description)}</p>
          <div id="modal-unit-price" class="text-base font-bold font-quicksand text-[#3a5a40] mt-1">${formatVND(product.price)}</div>
        </div>
      </div>

      <!-- Chọn Size & Nhiệt độ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-[#e4e8d8]">
        <div>
          <span class="font-bold text-xs sm:text-sm text-slate-800 block mb-1.5">Kích cỡ</span>
          <div class="flex gap-2" id="option-size-group">
            <button type="button" data-val="M" aria-pressed="true"
                    class="modal-size-btn flex-1 py-2 px-3 rounded-xl border text-xs sm:text-sm transition active border-[#3a5a40] bg-[#f0f2eb] text-[#3a5a40] font-bold">
              Size M (${formatVND(product.price)})
            </button>
            <button type="button" data-val="L" aria-pressed="false"
                    class="modal-size-btn flex-1 py-2 px-3 rounded-xl border text-xs sm:text-sm transition border-slate-200 text-slate-700 hover:border-[#3a5a40]/50">
              Size L (+10K)
            </button>
          </div>
        </div>

        ${product.hasHotOption ? `
        <div>
          <span class="font-bold text-xs sm:text-sm text-slate-800 block mb-1.5">Nhiệt độ</span>
          <div class="flex gap-2" id="option-temp-group">
            <button type="button" data-val="Đá" aria-pressed="true"
                    class="modal-temp-btn flex-1 py-2 px-3 rounded-xl border text-xs sm:text-sm transition active border-[#3a5a40] bg-[#f0f2eb] text-[#3a5a40] font-bold">
              Uống đá
            </button>
            <button type="button" data-val="Nóng" aria-pressed="false"
                    class="modal-temp-btn flex-1 py-2 px-3 rounded-xl border text-xs sm:text-sm transition border-slate-200 text-slate-700 hover:border-[#3a5a40]/50">
              Uống nóng
            </button>
          </div>
        </div>` : ""}
      </div>

      <!-- Đường & Đá -->
      <div class="space-y-3">
        <div>
          <span class="font-bold text-xs sm:text-sm text-slate-800 block mb-1.5">Độ ngọt</span>
          ${optionButtons("option-sugar-group", SUGAR_OPTIONS, "70% đường")}
        </div>
        <div id="modal-ice-wrapper">
          <span class="font-bold text-xs sm:text-sm text-slate-800 block mb-1.5">Lượng đá</span>
          ${optionButtons("option-ice-group", ICE_OPTIONS, "70% đá")}
        </div>
      </div>

      <!-- Topping thêm -->
      <div>
        <span class="font-bold text-xs sm:text-sm text-slate-800 block mb-1.5">Topping thêm <span class="font-normal text-slate-500">(chọn nhiều)</span></span>
        <div class="flex flex-wrap gap-1.5" id="option-topping-group">
          ${TOPPINGS.map(t => `
            <button type="button" data-topping-id="${escapeHtml(t.id)}" aria-pressed="false"
                    class="modal-topping-btn py-1.5 px-2.5 rounded-lg border border-slate-200 text-slate-700 hover:border-[#3a5a40]/50 text-xs transition">
              ${escapeHtml(t.name)} <span class="font-bold text-[#3a5a40]">+${t.price / 1000}K</span>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Số lượng + Tạm tính + Nút thêm -->
      <div class="pt-3 border-t border-[#e4e8d8] flex items-center justify-between gap-3">
        <div class="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          <button type="button" onclick="updateModalQty(-1)" class="w-9 h-9 text-slate-700 hover:bg-slate-200 font-bold transition" aria-label="Giảm số lượng">−</button>
          <span id="modal-qty-value" class="w-9 text-center text-sm font-bold text-slate-900">1</span>
          <button type="button" onclick="updateModalQty(1)" class="w-9 h-9 text-slate-700 hover:bg-slate-200 font-bold transition" aria-label="Tăng số lượng">+</button>
        </div>
        <div class="text-right">
          <span class="block text-[11px] text-slate-500">Tạm tính</span>
          <span id="modal-line-total" class="text-lg font-bold font-quicksand text-[#3a5a40]">${formatVND(product.price)}</span>
        </div>
      </div>

      <button type="button" onclick="confirmModalAddToCart()" class="w-full py-3 rounded-xl bg-[#3a5a40] hover:bg-[#283e2c] text-[#e9edc9] font-quicksand font-bold text-sm transition shadow-sm">
        Thêm vào giỏ
      </button>
    </div>
  `;

  setupModalOptionListeners();
  modal.classList.remove("hidden");
  activateDialog(modal);
}

function setupModalOptionListeners() {
  // Size buttons
  const sizeGroup = document.getElementById("option-size-group");
  if (sizeGroup) {
    const btns = sizeGroup.querySelectorAll(".modal-size-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        playTickSound();
        activeModalSize = btn.getAttribute("data-val") || "M";
        btns.forEach(b => {
          const isActive = b === btn;
          b.setAttribute("aria-pressed", String(isActive));
          b.classList.toggle("active", isActive);
          b.classList.toggle("border-[#3a5a40]", isActive);
          b.classList.toggle("bg-[#f0f2eb]", isActive);
          b.classList.toggle("text-[#3a5a40]", isActive);
          b.classList.toggle("font-bold", isActive);
          b.classList.toggle("border-slate-200", !isActive);
          b.classList.toggle("text-slate-700", !isActive);
        });
        refreshModalTotal();
      });
    });
  }

  // Temp buttons (Đá / Nóng)
  const tempGroup = document.getElementById("option-temp-group");
  if (tempGroup) {
    const btns = tempGroup.querySelectorAll(".modal-temp-btn");
    const iceWrapper = document.getElementById("modal-ice-wrapper");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        playTickSound();
        activeModalTemp = btn.getAttribute("data-val") || "Đá";
        btns.forEach(b => {
          const isActive = b === btn;
          b.setAttribute("aria-pressed", String(isActive));
          b.classList.toggle("active", isActive);
          b.classList.toggle("border-[#3a5a40]", isActive);
          b.classList.toggle("bg-[#f0f2eb]", isActive);
          b.classList.toggle("text-[#3a5a40]", isActive);
          b.classList.toggle("font-bold", isActive);
          b.classList.toggle("border-slate-200", !isActive);
          b.classList.toggle("text-slate-700", !isActive);
        });
        if (iceWrapper) iceWrapper.classList.toggle("hidden", activeModalTemp === "Nóng");
      });
    });
  }

  // Sugar & Ice groups
  ["option-sugar-group", "option-ice-group"].forEach(groupId => {
    const group = document.getElementById(groupId);
    if (!group) return;
    const buttons = group.querySelectorAll(".modal-opt-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        playTickSound();
        buttons.forEach(b => {
          b.setAttribute("aria-pressed", "false");
          b.classList.remove("active", "border-[#3a5a40]", "bg-[#f0f2eb]", "text-[#3a5a40]", "font-bold");
          b.classList.add("border-slate-200", "text-slate-700");
        });
        btn.classList.add("active", "border-[#3a5a40]", "bg-[#f0f2eb]", "text-[#3a5a40]", "font-bold");
        btn.setAttribute("aria-pressed", "true");
        btn.classList.remove("border-slate-200", "text-slate-700");
      });
    });
  });

  // Toppings multi-select
  const toppingGroup = document.getElementById("option-topping-group");
  if (toppingGroup) {
    toppingGroup.querySelectorAll(".modal-topping-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playTickSound();
        const id = btn.getAttribute("data-topping-id");
        if (!id) return;
        const selected = !activeModalToppings.has(id);
        if (selected) activeModalToppings.add(id);
        else activeModalToppings.delete(id);

        btn.setAttribute("aria-pressed", String(selected));
        btn.classList.toggle("active", selected);
        btn.classList.toggle("border-[#3a5a40]", selected);
        btn.classList.toggle("bg-[#f0f2eb]", selected);
        btn.classList.toggle("text-[#3a5a40]", selected);
        btn.classList.toggle("font-bold", selected);
        btn.classList.toggle("border-slate-200", !selected);
        btn.classList.toggle("text-slate-700", !selected);
        refreshModalTotal();
      });
    });
  }
}

function confirmModalAddToCart() {
  if (!activeModalProduct) return;
  const sugarBtn = document.querySelector("#option-sugar-group .modal-opt-btn.active");
  const iceBtn = document.querySelector("#option-ice-group .modal-opt-btn.active");
  const modalImg = document.querySelector("#product-modal-content img");

  addToCart(activeModalProduct.id, {
    size: activeModalSize,
    temp: activeModalTemp,
    sugar: sugarBtn ? sugarBtn.getAttribute("data-val") : "70% đường",
    ice: iceBtn ? iceBtn.getAttribute("data-val") : "70% đá",
    toppings: [...activeModalToppings]
  }, modalImg, activeModalQty);
  closeProductModal();
}

function closeProductModal() {
  const modal = document.getElementById("product-detail-modal");
  if (modal) modal.classList.add("hidden");
  deactivateDialog(modal);
  activeModalProduct = null;
  activeModalQty = 1;
  activeModalSize = "M";
  activeModalTemp = "Đá";
  activeModalToppings = new Set();
}

// --- 6. CART DRAWER ---
function toggleCartDrawer(open = true) {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  if (!backdrop || !drawer) return;

  backdrop.classList.toggle("open", open);
  drawer.classList.toggle("open", open);
  drawer.inert = !open;
  drawer.setAttribute("aria-hidden", String(!open));
  if (open) activateDialog(drawer);
  else deactivateDialog(drawer);
}

// --- 7. CHECKOUT ---
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Giỏ hàng đang trống, bạn chọn món trước nhé.", "info");
    return;
  }
  toggleCartDrawer(false);

  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  const listEl = document.getElementById("checkout-summary-list");
  if (listEl) {
    listEl.innerHTML = cart.map(item => {
      const opt = buildCartItemOptionsSummary(item);
      return `
        <div class="flex items-start justify-between gap-2">
          <span class="min-w-0 flex-1">${escapeHtml(item.name)}${opt ? ` <span class="text-slate-500">(${escapeHtml(opt)})</span>` : ""} ×${item.quantity}</span>
          <span class="font-semibold text-slate-800 flex-shrink-0">${formatVND(item.price * item.quantity)}</span>
        </div>
      `;
    }).join("");
  }

  document.getElementById("checkout-summary-items").textContent = `${getItemCount()} món`;
  document.getElementById("checkout-summary-subtotal").textContent = formatVND(getSubtotal());

  modal.classList.remove("hidden");
  activateDialog(modal);
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.add("hidden");
  deactivateDialog(modal);
}

let lastGeneratedOrderMessage = "";
let lastOrderDraft = null;
const DRAFT_KEY = "leme_order_draft_v1";

function loadOrderDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
    if (draft && ["name", "phone", "address", "message"].every(key => typeof draft[key] === "string") &&
        Number.isFinite(draft.subtotal) && draft.subtotal >= 0) {
      lastOrderDraft = draft;
      lastGeneratedOrderMessage = draft.message;
      document.getElementById("resume-order-btn")?.classList.remove("hidden");
    }
  } catch { /* A blocked store must not stop ordering. */ }
}

function showOrderDraft() {
  if (!lastOrderDraft) return;
  toggleCartDrawer(false);
  const draft = lastOrderDraft;
  document.getElementById("success-customer-name").textContent = draft.name;
  document.getElementById("success-customer-phone").textContent = draft.phone;
  document.getElementById("success-customer-address").textContent = draft.address;
  document.getElementById("success-order-total").textContent = formatVND(draft.subtotal);
  document.getElementById("generated-order-text").value = draft.message;
  document.getElementById("copy-order-status").textContent = "Sao chép nội dung bên dưới, mở Zalo hoặc Messenger rồi dán và gửi cho quán.";
  const modal = document.getElementById("order-success-modal");
  modal.classList.remove("hidden");
  activateDialog(modal);
}

function discardOrderDraft() {
  closeSuccessModal();
  lastOrderDraft = null;
  lastGeneratedOrderMessage = "";
  try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* Optional storage. */ }
  document.getElementById("resume-order-btn")?.classList.add("hidden");
  document.getElementById("checkout-form")?.reset();
  document.getElementById("generated-order-text").value = "";
  ["success-customer-name", "success-customer-phone", "success-customer-address", "success-order-total"]
    .forEach(id => { document.getElementById(id).textContent = ""; });
  showToast("Đã xóa bản soạn. Các món trong giỏ vẫn được giữ lại.");
}

function validateCheckout() {
  const name = document.getElementById("order-name");
  const phone = document.getElementById("order-phone");
  const address = document.getElementById("order-address");
  const normalizedPhone = phone.value.replace(/[\s().-]/g, "").replace(/^\+84/, "0");
  name.setCustomValidity(name.value.trim() ? "" : "Bạn nhập họ tên nhé.");
  phone.setCustomValidity(/^0[0-9]{9,10}$/.test(normalizedPhone) ? "" : "Nhập số điện thoại gồm 10–11 chữ số, bắt đầu bằng 0 hoặc +84.");
  address.setCustomValidity(address.value.trim() ? "" : "Bạn nhập địa chỉ nhận hàng nhé.");
  return document.getElementById("checkout-form").reportValidity();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (cart.length === 0 || !validateCheckout()) return;

  const name = document.getElementById("order-name")?.value.trim() || "Khách hàng";
  const phone = document.getElementById("order-phone")?.value.trim() || "";
  const address = document.getElementById("order-address")?.value.trim() || "";
  const note = document.getElementById("order-note")?.value.trim() || "";
  const subtotal = getSubtotal();

  const itemsText = cart.map((item, index) => {
    const opt = buildCartItemOptionsSummary(item);
    return `${index + 1}. ${item.name}${opt ? ` (${opt})` : ""} x${item.quantity} = ${formatVND(item.price * item.quantity)}`;
  }).join("\n");

  lastGeneratedOrderMessage = `ĐƠN HÀNG MỚI - LÊ MÊ (NGỌC HỒI)

Khách: ${name}
SĐT: ${phone}
Địa chỉ: ${address}
${note ? `Ghi chú: ${note}\n` : ""}
Món:
${itemsText}

Tạm tính: ${formatVND(subtotal)}
Ship: ${SHIPPING_NOTE}

Quán xác nhận đơn giúp em nhé!`;

  lastOrderDraft = { name, phone, address, subtotal, message: lastGeneratedOrderMessage };
  let saved = true;
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(lastOrderDraft)); }
  catch { saved = false; }
  document.getElementById("resume-order-btn")?.classList.remove("hidden");
  closeCheckoutModal();
  showOrderDraft();
  playChimeSound();
  if (!saved) showToast("Không lưu được bản soạn. Bạn sao chép và gửi cho quán trước khi tải lại trang nhé.");
  copyGeneratedOrderText();
}

async function copyGeneratedOrderText() {
  const message = lastGeneratedOrderMessage;
  if (!message) return;
  const status = document.getElementById("copy-order-status");
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(message);
    if (message !== lastGeneratedOrderMessage) return;
    status.textContent = "Đã sao chép. Bạn mở Zalo hoặc Messenger, dán nội dung rồi bấm gửi cho quán nhé.";
  } catch {
    if (message !== lastGeneratedOrderMessage) return;
    status.textContent = "Chưa sao chép tự động được. Bạn chọn nội dung bên dưới để sao chép thủ công rồi gửi cho quán.";
    const field = document.getElementById("generated-order-text");
    if (!document.getElementById("order-success-modal").classList.contains("hidden")) {
      field.focus();
      field.select();
    }
  }
}

function closeSuccessModal() {
  const modal = document.getElementById("order-success-modal");
  if (modal) modal.classList.add("hidden");
  deactivateDialog(modal);
}

async function copyHotline(phoneNumber) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(phoneNumber);
    showToast(`Đã sao chép số ${phoneNumber}`, "success");
  } catch {
    showToast(`Hotline Lê Mê: ${phoneNumber}`, "info");
  }
}

// --- 8. VIDEO POP-UP (video dọc 9:16) ---
function openVideoModal() {
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-tea-video");
  if (!modal) return;

  modal.classList.remove("hidden");
  activateDialog(modal);
  if (modalVideo) {
    modalVideo.currentTime = 0;
    modalVideo.play().catch(() => {});
  }
}

function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  if (!modal || modal.classList.contains("hidden")) return;

  modal.classList.add("hidden");
  deactivateDialog(modal);
  document.getElementById("modal-tea-video")?.pause();
}

function handleVideoModalBackdropClick(event) {
  if (event.target.id === "video-modal") closeVideoModal();
}

// --- 9. RANDOMIZER: "HÔM NAY UỐNG GÌ?" ---
const RANDOMIZER_PRESETS = [
  {
    productId: 1,
    mood: "⚡ Signature ô long đậm vị",
    size: "M",
    temp: "Đá",
    sugar: "70% đường",
    ice: "70% đá"
  },
  {
    productId: 5,
    mood: "🍃 Best Seller thơm lá dứa + kem cheese",
    size: "M",
    temp: "Đá",
    sugar: "50% đường",
    ice: "70% đá"
  },
  {
    productId: 7,
    mood: "☁️ Béo mịn lớp kem trứng thơm lừng",
    size: "M",
    temp: "Đá",
    sugar: "70% đường",
    ice: "70% đá"
  },
  {
    productId: 10,
    mood: "🍊 Thanh mát giải nhiệt tức thì",
    size: "M",
    temp: "Đá",
    sugar: "70% đường",
    ice: "70% đá"
  },
  {
    productId: 12,
    mood: "🌸 Nhẹ nhàng hương quế hoa & vải ngọt",
    size: "M",
    temp: "Đá",
    sugar: "50% đường",
    ice: "70% đá"
  },
  {
    productId: 15,
    mood: "🏠 Thích chill một mình tại nhà",
    size: "",
    temp: "",
    sugar: "",
    ice: ""
  }
];

let currentRandomDrink = null;
let isSpinning = false;
let spinIntervalId = null;

function openRandomizerModal() {
  const modal = document.getElementById("randomizer-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  activateDialog(modal);
  spinRandomizer();
}

function closeRandomizerModal() {
  const modal = document.getElementById("randomizer-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  if (spinIntervalId) {
    clearInterval(spinIntervalId);
    spinIntervalId = null;
  }
  isSpinning = false;
  const addBtn = document.getElementById("randomizer-add-btn");
  if (addBtn) addBtn.disabled = false;
  modal.classList.add("hidden");
  deactivateDialog(modal);
}

function spinRandomizer() {
  if (isSpinning) return;
  isSpinning = true;

  const card = document.getElementById("randomizer-card");
  const addBtn = document.getElementById("randomizer-add-btn");
  if (addBtn) addBtn.disabled = true;

  let count = 0;
  const totalTicks = prefersReducedMotion() ? 1 : 8;
  spinIntervalId = setInterval(() => {
    count++;
    const pick = RANDOMIZER_PRESETS[Math.floor(Math.random() * RANDOMIZER_PRESETS.length)];
    renderRandomizerResult(pick);
    playTickSound();
    if (!prefersReducedMotion()) {
      card?.classList.add("animate-slot-item");
      setTimeout(() => card?.classList.remove("animate-slot-item"), 120);
    }

    if (count >= totalTicks) {
      clearInterval(spinIntervalId);
      spinIntervalId = null;
      let finalPick;
      do {
        finalPick = RANDOMIZER_PRESETS[Math.floor(Math.random() * RANDOMIZER_PRESETS.length)];
      } while (RANDOMIZER_PRESETS.length > 1 && finalPick === currentRandomDrink);

      currentRandomDrink = finalPick;
      renderRandomizerResult(finalPick);
      playChimeSound();
      isSpinning = false;
      if (addBtn) addBtn.disabled = false;
    }
  }, 105);
}

function renderRandomizerResult(preset) {
  if (!preset) return;
  const product = PRODUCTS.find(p => p.id === preset.productId);
  if (!product) return;

  const img = document.getElementById("randomizer-img");
  const mood = document.getElementById("randomizer-mood");
  const name = document.getElementById("randomizer-name");
  const spec = document.getElementById("randomizer-spec");
  const price = document.getElementById("randomizer-price");

  if (img) {
    img.src = product.image;
    img.alt = product.name;
    img.setAttribute("style", buildImgStyle(product));
  }
  if (mood) mood.textContent = preset.mood;
  if (name) name.textContent = product.name;
  if (spec) spec.textContent = preset.sugar ? `Size ${preset.size} • ${preset.sugar} • ${preset.ice}` : "Rót ra đá là uống liền";
  if (price) price.textContent = formatVND(product.price);
}

function addRandomizerDrinkToCart() {
  if (!currentRandomDrink || isSpinning) return;
  const modalImg = document.getElementById("randomizer-img");
  addToCart(currentRandomDrink.productId, {
    size: currentRandomDrink.size,
    temp: currentRandomDrink.temp,
    sugar: currentRandomDrink.sugar,
    ice: currentRandomDrink.ice
  }, modalImg, 1);
  closeRandomizerModal();
}

// --- 10. SHARED DIALOG FOCUS & SCROLL MANAGEMENT ---
let activeDialog = null;
let dialogTrigger = null;
let previousBodyOverflow = "";
let inertBackground = [];
let lenisInstance = null;

function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -74 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

function getDialogControls(dialog) {
  return [...dialog.querySelectorAll('a[href], button, input, textarea, select, video[controls], [tabindex="0"]')]
    .filter(element => !element.disabled && element.getClientRects().length > 0);
}

function activateDialog(dialog) {
  if (!dialog || activeDialog === dialog) return;
  if (activeDialog) deactivateDialog(activeDialog);
  dialogTrigger = document.activeElement;
  previousBodyOverflow = document.body.style.overflow;
  activeDialog = dialog;
  document.body.style.overflow = "hidden";
  lenisInstance?.stop();
  inertBackground = [...document.body.children].filter(element =>
    element !== dialog && element.id !== "cart-backdrop" && element.id !== "toast-container" &&
    !["SCRIPT", "STYLE"].includes(element.tagName)
  ).map(element => ({ element, wasInert: element.inert }));
  inertBackground.forEach(({ element }) => { element.inert = true; });
  (getDialogControls(dialog)[0] || dialog).focus({ preventScroll: true });
}

function deactivateDialog(dialog) {
  if (!dialog || activeDialog !== dialog) return;
  activeDialog = null;
  document.body.style.overflow = previousBodyOverflow;
  lenisInstance?.start();
  inertBackground.forEach(({ element, wasInert }) => { element.inert = wasInert; });
  inertBackground = [];
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  dialogTrigger = null;
}

document.addEventListener("keydown", (e) => {
  if (activeDialog?.id === "story-viewer-modal") {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextStory();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevStory();
      return;
    }
    if (e.key === " " && document.activeElement?.tagName !== "BUTTON") {
      e.preventDefault();
      toggleStoryPause();
      return;
    }
  }

  if (e.key === "Tab" && activeDialog) {
    const controls = getDialogControls(activeDialog);
    const first = controls[0] || activeDialog;
    const last = controls[controls.length - 1] || activeDialog;
    if (e.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
      e.preventDefault();
      first.focus();
    }
  }
  if (e.key !== "Escape") return;
  closeVideoModal();
  closeProductModal();
  closeCheckoutModal();
  closeSuccessModal();
  closeRandomizerModal();
  closeStoryViewer();
  toggleCartDrawer(false);
});

// --- 11. NIGHT AMBIENCE MODE (QUÁN LÊN ĐÈN) ---
function setNightModeUI(isNight) {
  document.body.classList.toggle("night-mode", isNight);
  const headerIcon = document.getElementById("theme-toggle-icon");
  const headerBtn = document.getElementById("theme-toggle-btn");
  const mobileIcon = document.getElementById("mobile-theme-icon");
  const mobileLabel = document.getElementById("mobile-theme-label");
  const mobileBtn = document.getElementById("mobile-theme-btn");

  if (headerIcon) headerIcon.textContent = isNight ? "🌙" : "💡";
  if (headerBtn) headerBtn.setAttribute("aria-pressed", String(isNight));
  if (mobileIcon) mobileIcon.textContent = isNight ? "🌙" : "💡";
  if (mobileLabel) mobileLabel.textContent = isNight ? "Ban ngày" : "Bật đèn";
  if (mobileBtn) mobileBtn.setAttribute("aria-pressed", String(isNight));
}

function toggleNightMode() {
  const isNight = !document.body.classList.contains("night-mode");
  setNightModeUI(isNight);
  try { localStorage.setItem("leme_night_mode", isNight ? "1" : "0"); } catch { /* Optional preference */ }
  playPopSound();
  showToast(isNight ? "Đã bật đèn quán (Chế độ chill đêm)" : "Đã chuyển sang chế độ ban ngày", "info");
}

function initNightMode() {
  try {
    const saved = localStorage.getItem("leme_night_mode");
    setNightModeUI(saved === "1");
  } catch {
    setNightModeUI(false);
  }
}

// --- 12. LIVE STORE HOURS STATUS (Vietnam UTC+7) ---
function updateStoreOpenStatus() {
  const dot = document.getElementById("store-status-dot");
  const text = document.getElementById("store-status-text");
  if (!dot || !text) return;

  let hour = new Date().getHours();
  try {
    const vnHourStr = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      hour12: false
    }).format(new Date());
    const parsed = Number.parseInt(vnHourStr, 10);
    if (Number.isFinite(parsed)) hour = parsed;
  } catch { /* Fallback to local hour */ }

  const isOpen = hour >= 9 && hour < 22;
  if (isOpen) {
    dot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
    text.textContent = "Đang mở cửa • 9:00 – 22:00";
  } else {
    dot.className = "w-2 h-2 rounded-full bg-amber-400";
    text.textContent = "Tạm nghỉ • Mở lại 9:00";
  }
}

// --- 13. LÊ MÊ STORIES ---
const STORIES_DATA = [
  {
    type: "video",
    src: "assets/make-tea.webm",
    title: "Pha trà tươi tại quán",
    time: "Vừa đăng",
    caption: "Cốt trà được ủ và nấu mới mỗi ngày cùng kem cheese tươi đánh thủ công 🍵",
    ctaLabel: "Xem Menu & Đặt món",
    ctaTarget: "#menu",
    fit: "cover"
  },
  {
    type: "image",
    src: "assets/store-interior.webp",
    title: "Góc quán chill Ngọc Hồi",
    time: "Số 2, ngách 298/31 Ngọc Hồi",
    caption: "Không gian ấm cúng, ánh đèn dịu và góc ngồi chill lý tưởng tại Yên Ngưu 🌿",
    ctaLabel: "Xem không gian quán",
    ctaTarget: "#about",
    fit: "cover"
  },
  {
    type: "image",
    src: "assets/bottles-lineup.jpg",
    title: "Set 4 chai cốt trà sữa",
    time: "Hôm nay",
    caption: "Đóng chai thủy tinh tiện lợi, bảo quản lạnh uống dần hoặc làm quà biếu 🧋",
    ctaLabel: "Xem Cốt trà đóng chai",
    ctaTarget: "#menu",
    fit: "cover"
  },
  {
    type: "image",
    src: "assets/open.jpg",
    title: "Freeship dưới 2km",
    time: "9:00 – 22:00 hàng ngày",
    caption: "Nhận đơn mỗi ngày qua Zalo 0869 256 962, ShopeeFood và freeship trong bán kính 2km 🛵",
    ctaLabel: "Chọn món giao tận nơi",
    ctaTarget: "#menu",
    fit: "cover"
  },
  {
    type: "image",
    src: "assets/facebook-reviews.png",
    title: "Feedback từ khách yêu",
    time: "5.0 ★ Google Maps & Fanpage",
    caption: "Cảm ơn mọi người đã luôn ủng hộ vị trà đậm đà của Lê Mê ❤️",
    ctaLabel: "Xem thêm tại Góc \"Mê\"",
    ctaTarget: "#reviews",
    fit: "contain"
  }
];

const WATCHED_STORIES_KEY = "leme_watched_stories_v1";
let watchedStories = new Set();
let currentStoryIdx = 0;
let storyProgressInterval = null;
let storyProgressVal = 0;
let isStoryMuted = true;
let isStoryPaused = false;

function loadWatchedStories() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(WATCHED_STORIES_KEY));
    if (Array.isArray(saved)) {
      saved.forEach(idx => {
        if (Number.isInteger(idx) && idx >= 0 && idx < STORIES_DATA.length) watchedStories.add(idx);
      });
    }
  } catch { /* Optional */ }
  syncWatchedStoryRings();
}

function markStoryWatched(index) {
  watchedStories.add(index);
  try {
    sessionStorage.setItem(WATCHED_STORIES_KEY, JSON.stringify([...watchedStories]));
  } catch { /* Optional */ }
  syncWatchedStoryRings();
}

function syncWatchedStoryRings() {
  document.querySelectorAll("[data-story-index]").forEach(btn => {
    const idx = Number.parseInt(btn.getAttribute("data-story-index"), 10);
    const ring = btn.querySelector(".story-ring");
    if (ring) ring.classList.toggle("watched", watchedStories.has(idx));
  });
}

function updateStorySoundButton() {
  const soundBtn = document.getElementById("story-sound-btn");
  if (!soundBtn) return;
  soundBtn.textContent = isStoryMuted ? "🔇" : "🔊";
  soundBtn.setAttribute("aria-label", isStoryMuted ? "Bật âm thanh" : "Tắt âm thanh");
}

function updateStoryPauseButton() {
  const pauseBtn = document.getElementById("story-pause-btn");
  if (!pauseBtn) return;
  pauseBtn.textContent = isStoryPaused ? "▶" : "⏸";
  pauseBtn.setAttribute("aria-label", isStoryPaused ? "Tiếp tục story" : "Tạm dừng story");
}

function openStoryViewer(index = 0) {
  const modal = document.getElementById("story-viewer-modal");
  if (!modal) return;
  isStoryPaused = false;
  updateStoryPauseButton();
  updateStorySoundButton();
  modal.classList.remove("hidden");
  activateDialog(modal);
  currentStoryIdx = index;
  showStory(currentStoryIdx);
}

function closeStoryViewer() {
  const modal = document.getElementById("story-viewer-modal");
  if (!modal || modal.classList.contains("hidden")) return;
  clearInterval(storyProgressInterval);
  storyProgressInterval = null;
  isStoryPaused = false;
  const video = document.getElementById("active-story-video");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
  const mediaContainer = document.getElementById("story-media-container");
  if (mediaContainer) mediaContainer.innerHTML = "";
  modal.classList.add("hidden");
  deactivateDialog(modal);
}

function showStory(index) {
  if (index < 0 || index >= STORIES_DATA.length) {
    closeStoryViewer();
    return;
  }
  currentStoryIdx = index;
  markStoryWatched(index);
  const story = STORIES_DATA[index];

  clearInterval(storyProgressInterval);
  storyProgressInterval = null;
  storyProgressVal = 0;
  isStoryPaused = false;
  updateStoryPauseButton();

  const fills = document.querySelectorAll("#story-progress-container .story-progress-fill");
  fills.forEach((fill, i) => {
    fill.style.width = i < index ? "100%" : "0%";
  });

  const mediaContainer = document.getElementById("story-media-container");
  const titleEl = document.getElementById("story-title-text");
  const caption = document.getElementById("story-caption-text");
  const timeBadge = document.getElementById("story-time-badge");
  const soundBtn = document.getElementById("story-sound-btn");
  const ctaLabel = document.getElementById("story-cta-label");

  if (titleEl) titleEl.textContent = story.title;
  if (timeBadge) timeBadge.textContent = story.time;
  if (caption) caption.textContent = story.caption;
  if (ctaLabel) ctaLabel.textContent = story.ctaLabel || "Xem Menu & Đặt món";

  if (story.type === "video") {
    if (soundBtn) soundBtn.classList.remove("hidden");
    updateStorySoundButton();
    mediaContainer.innerHTML = `
      <video id="active-story-video" src="${escapeHtml(story.src)}" autoplay ${isStoryMuted ? "muted" : ""} loop playsinline class="w-full h-full object-cover"></video>
    `;
    const v = document.getElementById("active-story-video");
    if (v) v.play().catch(() => {});
  } else {
    if (soundBtn) soundBtn.classList.add("hidden");
    if (story.fit === "contain") {
      mediaContainer.innerHTML = `
        <div class="w-full h-full flex items-center justify-center px-3 bg-gradient-to-b from-[#16241a] via-[#111a14] to-black">
          <img src="${escapeHtml(story.src)}" alt="${escapeHtml(story.title)}" class="w-full h-auto max-h-[70%] object-contain rounded-2xl border border-[#d4b872]/40 shadow-2xl">
        </div>
      `;
    } else {
      mediaContainer.innerHTML = `
        <img src="${escapeHtml(story.src)}" alt="${escapeHtml(story.title)}" class="w-full h-full object-cover">
      `;
    }
  }

  const duration = story.type === "video" ? 8000 : 5500;
  const interval = 50;
  const step = (interval / duration) * 100;

  storyProgressInterval = setInterval(() => {
    if (isStoryPaused) return;
    storyProgressVal += step;
    if (fills[index]) fills[index].style.width = `${Math.min(100, storyProgressVal)}%`;
    if (storyProgressVal >= 100) {
      clearInterval(storyProgressInterval);
      storyProgressInterval = null;
      nextStory();
    }
  }, interval);
}

function toggleStoryPause() {
  isStoryPaused = !isStoryPaused;
  updateStoryPauseButton();
  const video = document.getElementById("active-story-video");
  if (video) {
    if (isStoryPaused) video.pause();
    else video.play().catch(() => {});
  }
}

function nextStory() {
  if (currentStoryIdx < STORIES_DATA.length - 1) {
    playTickSound();
    showStory(currentStoryIdx + 1);
  } else {
    closeStoryViewer();
  }
}

function prevStory() {
  if (currentStoryIdx > 0) {
    playTickSound();
    showStory(currentStoryIdx - 1);
  } else {
    showStory(0);
  }
}

function toggleStorySound() {
  isStoryMuted = !isStoryMuted;
  const video = document.getElementById("active-story-video");
  if (video) video.muted = isStoryMuted;
  updateStorySoundButton();
}

function handleStoryCtaClick() {
  const story = STORIES_DATA[currentStoryIdx];
  closeStoryViewer();
  if (story?.ctaTarget) {
    scrollToSection(story.ctaTarget);
  }
}

// --- 14. INIT ---
document.addEventListener("DOMContentLoaded", () => {
  renderMenu("all");
  loadCartFromStorage();
  loadOrderDraft();
  initNightMode();
  loadWatchedStories();
  updateStoreOpenStatus();
  setInterval(updateStoreOpenStatus, 60000);

  document.querySelectorAll("#checkout-form input").forEach(input => {
    input.addEventListener("input", () => input.setCustomValidity(""));
  });

  if (typeof Lenis !== "undefined" && !prefersReducedMotion()) {
    try {
      lenisInstance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.35
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
          const href = this.getAttribute("href");
          if (href && href !== "#") {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              lenisInstance.scrollTo(target, { offset: -74 });
            }
          }
        });
      });
    } catch {
      lenisInstance = null;
    }
  }

  const stickyTabs = document.getElementById("sticky-tabs-container");
  if (stickyTabs) {
    window.addEventListener("scroll", () => {
      const rect = stickyTabs.getBoundingClientRect();
      stickyTabs.classList.toggle("is-stuck", rect.top <= 68);
    }, { passive: true });
  }

  const navLinks = document.querySelectorAll(".desktop-nav-link[data-nav-section]");
  if (navLinks.length > 0 && "IntersectionObserver" in window) {
    const sections = [...navLinks]
      .map(link => document.getElementById(link.getAttribute("data-nav-section")))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("nav-link-active", link.getAttribute("data-nav-section") === id);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(sec => observer.observe(sec));
  }

  const filterTabs = document.querySelectorAll(".menu-tab-btn");
  filterTabs.forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === "all"));
    btn.addEventListener("click", () => {
      playTickSound();
      filterTabs.forEach(b => {
        b.setAttribute("aria-pressed", "false");
        b.classList.remove("bg-[#3a5a40]", "text-[#e9edc9]");
        b.classList.add("text-slate-600");
      });
      btn.classList.add("bg-[#3a5a40]", "text-[#e9edc9]");
      btn.setAttribute("aria-pressed", "true");
      btn.classList.remove("text-slate-600");
      renderMenu(btn.getAttribute("data-filter") || "all");
    });
  });

  const header = document.getElementById("main-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const hidden = mobileMenu.classList.toggle("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", String(!hidden));
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
});
