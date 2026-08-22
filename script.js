/* ==========================================================================
   LumiNoor — site logic
   Three jobs live in this file:
     1. PRODUCTS  — the product catalog (name, photo, color tag, price).
     2. Rendering — turns PRODUCTS into the filter pills + product grid.
     3. WhatsApp  — every "buy" action opens a WhatsApp chat instead of a
                     traditional cart/checkout. This is the "click Buy ->
                     goes to WhatsApp" flow you asked for. See the
                     WHATSAPP CONFIG block right below for the one thing
                     you need to edit before this goes live.
   ========================================================================== */


/* ============================ WHATSAPP CONFIG ============================
   1. WHATSAPP_NUMBER must be in *international format, digits only*
      (country code + number, no "+", no spaces, no leading 0).
      Example for a Pakistani number 0300 1234567 -> "923001234567".
      The number below is a PLACEHOLDER — replace it with your real
      WhatsApp Business number before publishing the site.
   2. buildWhatsAppLink() builds the actual clickable link:
        https://wa.me/<number>?text=<url-encoded message>
      wa.me is WhatsApp's own "click to chat" service — no API key,
      no backend, and no account needed on your end beyond having
      WhatsApp installed on the number you configure. Tapping the
      link opens a chat with your number, with the message already
      typed in (the customer still has to press send).
   ========================================================================== */
const WHATSAPP_NUMBER = "923372110771"; // TODO: replace with your real number

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// Works out the folder containing index.html, so links are correct
// whether the site lives at the root of your domain or in a GitHub
// Pages project subfolder like /luminoor/.
function siteBaseUrl() {
  const path = window.location.pathname.replace(/index\.html$/, '');
  const normalized = path.endsWith('/') ? path : path + '/';
  return `${window.location.origin}${normalized}`;
}

// Message used for a specific product's "Buy on WhatsApp" button.
// Links to that product's own redirect page (products/<id>.html) so the
// WhatsApp preview shows THAT lens's photo, not a generic site preview.
function productMessage(product) {
  const productUrl = `${siteBaseUrl()}products/${product.id}.html`;
  return `${productUrl} \n Hi LumiNoor! I'd like to order ${product.name} (Rs.${product.sale}). Is it in stock?`;
}

// Generic message used by the header icon and the footer "Contact us" /
// "Track order" links, where there's no specific product to mention.
const GENERAL_MESSAGE = "Hi LumiNoor! I have a question about your lenses.";
const TRACK_ORDER_MESSAGE = "Hi LumiNoor! Could you help me track my order?";


/* ================================ PRODUCTS ================================
   image  -> file inside /assets, shown as the card photo
   swatch -> [light, deep] hex pair for the small color dot on each card,
             hand-picked to match the lens tone in that product's photo
   color  -> category used by the filter pills ('grey' | 'brown' | 'blue' |
             'green' | 'black')
   ========================================================================== */
const PRODUCTS = [
  {
    id: "greyhoney",
    name: "Grey Honey",
    image: "assets/GreyHoney.jpg",
    color: "grey",
    swatch: ["#D9C9A6", "#8A7550"],
    price: 1499,
    sale: 999,
  },
  {
    id: "greybrown",
    name: "Grey Brown",
    image: "assets/GreyBrown.jpg",
    color: "grey",
    swatch: ["#9C9C96", "#46433F"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollshadowglittergrey",
    name: "Doll Shadow Glitter Grey",
    image: "assets/DollShadowGlitterGrey.jpg",
    color: "grey",
    swatch: ["#A6A7A9", "#3D3E40"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollgreen",
    name: "Doll Green",
    image: "assets/DollGreen.jpg",
    color: "green",
    swatch: ["#AFCBAC", "#4E7A5B"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollglittergrey",
    name: "Doll Glitter Grey",
    image: "assets/DollGlitterGrey.jpg",
    color: "grey",
    swatch: ["#A2A3A5", "#403F41"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollbrown",
    name: "Doll Brown",
    image: "assets/DollBrown.jpg",
    color: "brown",
    swatch: ["#C79A63", "#5C3A1E"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollblue",
    name: "Doll Blue",
    image: "assets/DollBlue.jpg",
    color: "blue",
    swatch: ["#93BEDD", "#2C5A82"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollblackkorean",
    name: "Doll Black Korean",
    image: "assets/DollBlackKorean.jpg",
    color: "black",
    swatch: ["#75757A", "#1C1C1E"],
    price: 1499,
    sale: 999,
  },
  {
    id: "chocolatedollbrown",
    name: "Chocolate Doll Brown",
    image: "assets/ChocolateDollBrown.jpg",
    color: "brown",
    swatch: ["#B07E4C", "#4A2C14"],
    price: 1499,
    sale: 999,
  },
];

// Display label + pill dot color for each color category, used to build
// the header nav and the filter pills below the hero.
const COLOR_META = {
  grey:  { label: "Grey",  dot: "#7F7F78" },
  brown: { label: "Brown", dot: "#7A4A1D" },
  blue:  { label: "Blue",  dot: "#2C5A82" },
  green: { label: "Green", dot: "#4E7A5B" },
  black: { label: "Black", dot: "#1C1C1E" },
};


/* ================================ RENDERING ================================ */

// Small helper: linear-gradient string for a product's swatch dot.
function swatchStyle([light, deep]) {
  return `background: radial-gradient(circle at 35% 30%, ${light}, ${deep} 62%, #20120f 100%);`;
}

// One product card's markup. The buy button carries data-id so the click
// handler (delegated on #grid, see below) can look the product back up.
function cardHTML(p) {
  return `
    <article class="card" id="${p.id}" data-id="${p.id}" data-color="${p.color}" data-name="${p.name.toLowerCase()}">
      <div class="card-media">
        <span class="badge-sale">Sale</span>
        <img src="${p.image}" alt="${p.name} colored contact lens" loading="lazy">
        <div class="swatch" style="${swatchStyle(p.swatch)}"></div>
        <button class="buy-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
          Buy on WhatsApp
        </button>
      </div>
      <div class="card-body">
        <p class="name"><a href="#${p.id}">${p.name}</a></p>
        <div class="price-row">
          <span class="was">Rs.${p.price.toLocaleString()}.00 PKR</span>
          <span class="now">Rs.${p.sale.toLocaleString()}.00 PKR</span>
        </div>
      </div>
    </article>`;
}

const grid = document.getElementById("grid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const filtersEl = document.getElementById("filters");
const colorNav = document.getElementById("colorNav");

// Build the filter pills + top nav links from whatever colors actually
// appear in PRODUCTS, so adding a new color category later needs no
// extra markup — just tag a product with it.
function buildFilters() {
  const colors = [...new Set(PRODUCTS.map((p) => p.color))];

  filtersEl.innerHTML = [
    `<button class="pill active" data-filter="all">
       <span class="dot" style="background:var(--fg)"></span>All shades
     </button>`,
    ...colors.map(
      (c) => `
      <button class="pill" data-filter="${c}">
        <span class="dot" style="background:${COLOR_META[c].dot}"></span>${COLOR_META[c].label}
      </button>`
    ),
  ].join("");

  colorNav.innerHTML = [
    `<a href="#shop" class="active" data-filter="all">Shop</a>`,
    ...colors.map((c) => `<a href="#shop" data-filter="${c}">${COLOR_META[c].label}</a>`),
  ].join("");
}

function renderGrid() {
  grid.innerHTML = PRODUCTS.map(cardHTML).join("");
}

buildFilters();
renderGrid();

/* ================================ FILTER + SEARCH ================================ */

let activeColor = "all";
let query = "";

function applyFilters() {
  let visible = 0;
  document.querySelectorAll(".card").forEach((card) => {
    const matchesColor = activeColor === "all" || card.dataset.color === activeColor;
    const matchesQuery = card.dataset.name.includes(query);
    const show = matchesColor && matchesQuery;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  resultsCount.textContent = `${visible} style${visible === 1 ? "" : "s"}`;
  emptyState.classList.toggle("show", visible === 0);
}

function setActiveColor(color) {
  activeColor = color;
  document.querySelectorAll(".pill").forEach((p) => p.classList.toggle("active", p.dataset.filter === color));
  document.querySelectorAll("#colorNav a").forEach((a) => a.classList.toggle("active", a.dataset.filter === color));
  applyFilters();
}

// Filter pills and the header color links both drive the same filter —
// clicking either updates the other's active state.
filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".pill");
  if (!btn) return;
  setActiveColor(btn.dataset.filter);
});
colorNav.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-filter]");
  if (!link) return;
  setActiveColor(link.dataset.filter);
});

const searchToggle = document.getElementById("searchToggle");
const searchField = document.getElementById("searchField");
const searchInput = document.getElementById("searchInput");

searchToggle.addEventListener("click", () => {
  searchField.classList.toggle("open");
  if (searchField.classList.contains("open")) searchInput.focus();
});

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  applyFilters();
});

applyFilters();

/* ================================ WHATSAPP BUY FLOW ================================
   How the "Buy on WhatsApp" flow works, end to end:

   1. Every product card renders a <button class="buy-btn" data-id="...">.
   2. Clicks are handled with ONE listener on the whole grid (event
      delegation) rather than one listener per button — cheaper, and it
      still works for cards that get re-rendered later.
   3. On click we look the product up by its data-id, build a message
      like "Hi LumiNoor! I'd like to order Doll Blue (Rs.999). Is it in
      stock?", and open https://wa.me/<number>?text=<message> in a new
      tab with window.open(). That URL is WhatsApp's own click-to-chat
      link format, so no payment gateway or backend is involved — the
      "order" is really just a pre-filled WhatsApp message the customer
      sends you, and you confirm/collect payment in that chat.
   4. A small toast confirms the tap before the new tab opens, so the
      customer isn't left wondering if the button worked.
   ========================================================================== */

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
let toastTimer;

function showToast(text) {
  toastText.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function openWhatsApp(message) {
  window.open(buildWhatsAppLink(message), "_blank", "noopener");
}

// Delegated click handler for every "Buy on WhatsApp" button in the grid.
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".buy-btn");
  if (!btn) return;

  const product = PRODUCTS.find((p) => p.id === btn.dataset.id);
  if (!product) return;

  showToast(`Opening WhatsApp for ${product.name}…`);
  openWhatsApp(productMessage(product));
});

// Header cart/WhatsApp icon — general enquiry, not tied to one product.
document.getElementById("waHeaderBtn").addEventListener("click", () => {
  showToast("Opening WhatsApp…");
  openWhatsApp(GENERAL_MESSAGE);
});

// Footer "Contact us" and "Track order" links, same pattern.
document.getElementById("waContactUs").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp(GENERAL_MESSAGE);
});
document.getElementById("waTrackOrder").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp(TRACK_ORDER_MESSAGE);
});
