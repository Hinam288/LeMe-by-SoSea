/**
 * Lê Mê - Trà Sữa Đậm Vị
 * Theme: Xanh rêu & Kem
 */

// --- 1. MENU ---
// LƯU Ý: Tên món và giá đang là tạm tính, cần quán xác nhận lại trước khi chạy chính thức.
// imagePos: dùng để cắt đúng phần ly tương ứng trong ảnh chụp chung drinks.jpg
const PRODUCTS = [
  {
    id: 1,
    name: "Trà Sữa Lê Mê",
    category: "milktea",
    categoryName: "Trà sữa",
    price: 35000,
    badge: "Signature",
    description: "Ly xanh đặc trưng của quán. Vị trà đậm, hậu ngọt dịu.",
    image: "assets/drinks.jpg",
    imagePos: "70% 35%",
    hasOptions: true
  },
  {
    id: 2,
    name: "Matcha Phân Tầng",
    category: "milktea",
    categoryName: "Matcha",
    price: 42000,
    badge: "",
    description: "Matcha và sữa tươi chia tầng, khuấy đều trước khi uống.",
    image: "assets/drinks.jpg",
    imagePos: "80% 80%",
    hasOptions: true
  },
  {
    id: 3,
    name: "Trà Hoa Quả",
    category: "fruittea",
    categoryName: "Trà hoa quả",
    price: 38000,
    badge: "",
    description: "Trà kết hợp hoa quả tươi, thanh mát, dễ uống.",
    image: "assets/drinks.jpg",
    imagePos: "25% 60%",
    hasOptions: true
  },
  {
    id: 4,
    name: "Cốt Trà Sữa Đóng Chai",
    category: "bottle",
    categoryName: "Cốt trà đóng chai",
    price: 45000,
    badge: "Mang về",
    description: "Cốt trà sữa đóng chai thủy tinh, bảo quản lạnh, rót ra ly đá là uống.",
    image: "assets/single-bottle.jpg",
    imagePos: "center",
    hasOptions: false
  },
  {
    id: 5,
    name: "Set 4 Chai Cốt Trà Sữa",
    category: "bottle",
    categoryName: "Cốt trà đóng chai",
    price: 165000,
    badge: "Làm quà",
    description: "Bộ 4 chai cốt trà sữa nhiều vị, hợp để biếu tặng hoặc dùng cả nhà.",
    image: "assets/bottles-lineup.jpg",
    imagePos: "center",
    hasOptions: false
  }
];

const SHIPPING_NOTE = "Freeship trong bán kính 2km. Xa hơn quán sẽ báo phí khi xác nhận đơn.";
const SUGAR_OPTIONS = ["100% đường", "70% đường", "50% đường", "30% đường", "Không đường"];
const ICE_OPTIONS = ["100% đá", "70% đá", "50% đá", "Ít đá", "Không đá"];

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
      const sugar = product.hasOptions ? (SUGAR_OPTIONS.includes(item.sugar) ? item.sugar : "70% đường") : "";
      const ice = product.hasOptions ? (ICE_OPTIONS.includes(item.ice) ? item.ice : "70% đá") : "";
      const cartKey = `${product.id}-${sugar}-${ice}`;
      const existing = cart.find(entry => entry.cartKey === cartKey);
      if (existing) existing.quantity = Math.min(99, existing.quantity + item.quantity);
      else cart.push({ ...product, sugar, ice, cartKey, quantity: Math.min(99, item.quantity) });
    });
  } catch (e) {
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

function addToCart(productId, options = {}) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const sugar = product.hasOptions ? (options.sugar || "70% đường") : "";
  const ice = product.hasOptions ? (options.ice || "70% đá") : "";

  const cartKey = `${product.id}-${sugar}-${ice}`;
  const existing = cart.find(item => item.cartKey === cartKey);

  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + 1);
  } else {
    cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: product.price,
      sugar,
      ice,
      image: product.image,
      imagePos: product.imagePos,
      quantity: 1
    });
  }

  saveCartToStorage();
  showToast(`Đã thêm <b>${product.name}</b> vào giỏ`, "success");
  bounceCartButton();
}

function updateItemQuantity(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.quantity = Math.min(99, item.quantity + delta);
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartKey !== cartKey);
  }
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
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// --- 3. MENU RENDERING ---
function renderMenu(filter = "all") {
  const container = document.getElementById("product-grid");
  if (!container) return;

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  container.innerHTML = filtered.map(product => `
    <div class="group bg-white rounded-3xl p-3.5 border border-[#e4e8d8] card-soft flex flex-col">
      <button type="button" aria-label="Chọn ${product.name}" class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f0f2eb] mb-3 cursor-pointer" onclick="handleProductClick(${product.id})">
        <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async"
             style="object-position: ${product.imagePos};"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        ${product.badge ? `<span class="absolute top-2.5 left-2.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#3a5a40] shadow-sm">${product.badge}</span>` : ""}
      </button>

      <span class="text-xs font-semibold text-[#3a5a40] mb-1">${product.categoryName}</span>
      <h3 class="text-base font-bold font-quicksand text-slate-900 mb-1">${product.name}</h3>
      <p class="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">${product.description}</p>

      <div class="mt-auto pt-3 border-t border-[#e4e8d8] flex items-center justify-between">
        <span class="text-lg font-bold font-quicksand text-[#3a5a40]">${formatVND(product.price)}</span>
        <button onclick="handleProductClick(${product.id})" title="Thêm vào giỏ" aria-label="Thêm ${product.name} vào giỏ"
                class="w-10 h-10 rounded-full bg-[#3a5a40] hover:bg-[#d4b872] text-[#e9edc9] hover:text-slate-900 flex items-center justify-center font-bold text-xl transition active:scale-90">
          +
        </button>
      </div>
    </div>
  `).join("");
}

// Món có tùy chọn (đường/đá) thì mở bảng chọn, món đóng chai thêm thẳng vào giỏ
function handleProductClick(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  if (product.hasOptions) {
    openProductModal(productId);
  } else {
    addToCart(productId);
  }
}

function updateCartUI() {
  const totalCount = getItemCount();
  document.querySelectorAll(".cart-counter-badge").forEach(badge => {
    badge.textContent = totalCount;
    badge.classList.toggle("hidden", totalCount === 0);
  });

  const subtotal = getSubtotal();
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

    cartList.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <img src="${item.image}" alt="${item.name}" style="object-position: ${item.imagePos || 'center'};"
             class="w-14 h-14 rounded-lg object-cover flex-shrink-0">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold font-quicksand text-sm text-slate-800 truncate">${item.name}</h4>
          ${item.sugar ? `<p class="text-xs text-slate-500">${item.sugar} • ${item.ice}</p>` : ""}
          <div class="flex items-center justify-between mt-1">
            <span class="text-sm font-bold text-[#3a5a40]">${formatVND(item.price)}</span>
            <div class="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden">
              <button onclick="updateItemQuantity('${item.cartKey}', -1)" class="w-7 h-7 text-slate-700 hover:bg-slate-100 font-bold" aria-label="Bớt">−</button>
              <span class="w-7 text-center text-sm font-bold text-slate-800">${item.quantity}</span>
              <button onclick="updateItemQuantity('${item.cartKey}', 1)" class="w-7 h-7 text-slate-700 hover:bg-slate-100 font-bold" aria-label="Thêm">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeFromCart('${item.cartKey}')" title="Xóa món" aria-label="Xóa món" class="text-slate-400 hover:text-red-500 p-1 self-start">✕</button>
      </div>
    `).join("");
  }

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatVND(subtotal);
}

function bounceCartButton() {
  const btn = document.getElementById("cart-toggle-btn");
  if (btn) {
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 200);
  }
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
  toast.className = `toast-item px-4 py-3 rounded-xl shadow-md flex items-center gap-2.5 text-sm ${styles[type] || styles.info}`;
  toast.innerHTML = `
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 ml-2" aria-label="Đóng">✕</button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- 5. PRODUCT OPTIONS MODAL (đường / đá) ---
let activeModalProduct = null;

function optionButtons(groupId, values, activeValue) {
  return `
    <div class="flex flex-wrap gap-2" id="${groupId}">
      ${values.map(v => `
        <button type="button" data-val="${v}" aria-pressed="${v === activeValue}"
                class="modal-opt-btn py-1.5 px-3 rounded-lg border text-sm ${v === activeValue ? 'active border-[#3a5a40] bg-[#f0f2eb] text-[#3a5a40] font-bold' : 'border-slate-200 text-slate-700'}">
          ${v}
        </button>
      `).join("")}
    </div>
  `;
}

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  activeModalProduct = product;

  const modal = document.getElementById("product-detail-modal");
  const content = document.getElementById("product-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="flex flex-col sm:flex-row gap-5">
      <div class="w-full sm:w-5/12">
        <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100">
          <img src="${product.image}" alt="${product.name}" style="object-position: ${product.imagePos};" class="w-full h-full object-cover">
        </div>
      </div>

      <div class="w-full sm:w-7/12 flex flex-col">
        <span class="text-xs font-semibold text-[#3a5a40] mb-1">${product.categoryName}</span>
        <h3 class="text-xl font-bold font-quicksand text-slate-900 mb-1">${product.name}</h3>
        <p class="text-sm text-slate-500 mb-3">${product.description}</p>
        <div class="text-xl font-bold font-quicksand text-[#3a5a40] mb-4">${formatVND(product.price)}</div>

        <div class="space-y-4">
          <div>
            <label class="font-bold text-sm text-slate-800 block mb-1.5">Độ ngọt</label>
            ${optionButtons("option-sugar-group", SUGAR_OPTIONS, "70% đường")}
          </div>
          <div>
            <label class="font-bold text-sm text-slate-800 block mb-1.5">Lượng đá</label>
            ${optionButtons("option-ice-group", ICE_OPTIONS, "70% đá")}
          </div>
        </div>

        <button onclick="confirmModalAddToCart()" class="mt-5 w-full py-3 rounded-xl bg-[#3a5a40] hover:bg-[#283e2c] text-[#e9edc9] font-quicksand font-bold text-sm transition">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  `;

  setupModalOptionListeners();
  modal.classList.remove("hidden");
  activateDialog(modal);
}

function setupModalOptionListeners() {
  ["option-sugar-group", "option-ice-group"].forEach(groupId => {
    const group = document.getElementById(groupId);
    if (!group) return;
    const buttons = group.querySelectorAll(".modal-opt-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
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
}

function confirmModalAddToCart() {
  if (!activeModalProduct) return;
  const sugarBtn = document.querySelector("#option-sugar-group .modal-opt-btn.active");
  const iceBtn = document.querySelector("#option-ice-group .modal-opt-btn.active");

  addToCart(activeModalProduct.id, {
    sugar: sugarBtn ? sugarBtn.getAttribute("data-val") : "70% đường",
    ice: iceBtn ? iceBtn.getAttribute("data-val") : "70% đá"
  });
  closeProductModal();
}

function closeProductModal() {
  const modal = document.getElementById("product-detail-modal");
  if (modal) modal.classList.add("hidden");
  deactivateDialog(modal);
  activeModalProduct = null;
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
    const opt = item.sugar ? ` (${item.sugar}, ${item.ice})` : "";
    return `${index + 1}. ${item.name}${opt} x${item.quantity} = ${formatVND(item.price * item.quantity)}`;
  }).join("\n");

  lastGeneratedOrderMessage = `ĐƠN HÀNG MỚI - LÊ MÊ

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

// Shared focus and scroll handling for drawers and dialogs.
let activeDialog = null;
let dialogTrigger = null;
let previousBodyOverflow = "";
let inertBackground = [];

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
  inertBackground.forEach(({ element, wasInert }) => { element.inert = wasInert; });
  inertBackground = [];
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  dialogTrigger = null;
}

// Keep keyboard navigation inside the active dialog.
document.addEventListener("keydown", (e) => {
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
  toggleCartDrawer(false);
});

// --- 9. INIT ---
document.addEventListener("DOMContentLoaded", () => {
  renderMenu("all");
  loadCartFromStorage();
  loadOrderDraft();
  document.querySelectorAll("#checkout-form input").forEach(input => {
    input.addEventListener("input", () => input.setCustomValidity(""));
  });

  // Tab lọc menu
  const filterTabs = document.querySelectorAll(".menu-tab-btn");
  filterTabs.forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-filter") === "all"));
    btn.addEventListener("click", () => {
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

  // Header thu nhỏ khi cuộn
  const header = document.getElementById("main-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile
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

