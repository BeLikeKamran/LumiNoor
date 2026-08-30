/* ==========================================================================
   LumiNoor — site logic
     1. PRODUCTS  — the product catalog (name, photo, color tag, price).
    2. Rendering — turns PRODUCTS into the product grid.
     3. WhatsApp  — every "buy" action opens a WhatsApp chat instead of a
                     traditional cart/checkout.
     4. Tools     — the Cost Per Day calculator on the homepage. The Shade
                     Finder quiz lives on its own page (tools/shade-finder.html)
                     with its own copy of PRODUCTS — see that file's comments.
   ========================================================================== */


/* ============================ WHATSAPP CONFIG ============================
   WHATSAPP_NUMBER must be digits-only, international format (country code
   + number, no "+", no spaces, no leading 0). If you change this, also
   update the copy inside tools/shade-finder.html and products/*.html.
   ========================================================================== */
const WHATSAPP_NUMBER = "923372110771";

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

// Works out the folder containing index.html, so links built at runtime
// are correct whether the site lives at the root of a domain or in a
// GitHub Pages project subfolder like /LumiNoor/.
function siteBaseUrl() {
  const path = window.location.pathname.replace(/index\.html$/, '');
  const normalized = path.endsWith('/') ? path : path + '/';
  return `${window.location.origin}${normalized}`;
}

// Message used for a specific product's "Buy on WhatsApp" button.
// Links to that product's own page (products/<id>.html) so the WhatsApp
// preview shows THAT lens's photo, not a generic site preview.
function productMessage(product) {
  const productUrl = `${siteBaseUrl()}products/${product.id}.html`;
  return `Hi LumiNoor! I'd like to order ${product.name} (Rs.${product.sale}). Is it in stock?\n\n${productUrl}`;
}

const GENERAL_MESSAGE = "Hi LumiNoor! I have a question about your lenses.";
const TRACK_ORDER_MESSAGE = "Hi LumiNoor! Could you help me track my order?";


/* ================================ PRODUCTS ================================
  image  -> file inside /assets, shown as the card photo
//  swatch -> [light, deep] hex pair for the small color dot on each card,
//              hand-picked to match the lens tone in that product's photo
  color  -> color family used by the shade finder
  ========================================================================== */
const PRODUCTS = [
  {
    id: "greyhoney",
    name: "Grey Honey",
    image: "Shades/GreyHoney.jpg",
    color: "grey",
    swatch: ["#D9C9A6", "#8A7550"],
    price: 1499,
    sale: 999,
  },
  {
    id: "greybrown",
    name: "Grey Brown",
    image: "Shades/GreyBrown.jpg",
    color: "grey",
    swatch: ["#9C9C96", "#46433F"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollshadowglittergrey",
    name: "Doll Shadow Glitter Grey",
    image: "Shades/DollShadowGlitterGrey.jpg",
    color: "grey",
    swatch: ["#A6A7A9", "#3D3E40"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollgreen",
    name: "Doll Green",
    image: "Shades/DollGreen.jpg",
    color: "green",
    swatch: ["#AFCBAC", "#4E7A5B"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollglittergrey",
    name: "Doll Glitter Grey",
    image: "Shades/DollGlitterGrey.jpg",
    color: "grey",
    swatch: ["#A2A3A5", "#403F41"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollbrown",
    name: "Doll Brown",
    image: "Shades/DollBrown.jpg",
    color: "brown",
    swatch: ["#C79A63", "#5C3A1E"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollblue",
    name: "Doll Blue",
    image: "Shades/DollBlue.jpg",
    color: "blue",
    swatch: ["#93BEDD", "#2C5A82"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dollblackkorean",
    name: "Doll Black Korean",
    image: "Shades/DollBlackKorean.jpg",
    color: "black",
    swatch: ["#75757A", "#1C1C1E"],
    price: 1499,
    sale: 999,
  },
  {
    id: "chocolatedollbrown",
    name: "Chocolate Doll Brown",
    image: "Shades/ChocolateDollBrown.jpg",
    color: "brown",
    swatch: ["#B07E4C", "#4A2C14"],
    price: 1499,
    sale: 999,
  },
  {
    id: "sydneygreen",
    name: "Sydney Green",
    image: "Shades/SydneyGreen.jpg",
    color: "green",
    swatch: ["#A7C4AA", "#446B5E"],
    price: 1499,
    sale: 999,
  },
  {
    id: "russianblue",
    name: "Russian Blue",
    image: "Shades/RussianBlue.jpg",
    color: "blue",
    swatch: ["#90A9D5", "#2D4F7F"],
    price: 1499,
    sale: 999,
  },
  {
    id: "miragegreen",
    name: "Mirage Green",
    image: "Shades/MirageGreen.jpg",
    color: "green",
    swatch: ["#B9D2B4", "#4E765B"],
    price: 1499,
    sale: 999,
  },
  {
    id: "emberrose",
    name: "Ember Rose",
    image: "Shades/EmberRose.jpg",
    color: "brown",
    swatch: ["#D69E9A", "#7A4B3F"],
    price: 1499,
    sale: 999,
  },
  {
    id: "diamondgray",
    name: "Diamond Gray",
    image: "Shades/DiamondGray.jpg",
    color: "grey",
    swatch: ["#D3D3D5", "#59616A"],
    price: 1499,
    sale: 999,
  },
  {
    id: "diamondbrown",
    name: "Diamond Brown",
    image: "Shades/DiamondBrown.jpg",
    color: "brown",
    swatch: ["#CFA67A", "#5B3822"],
    price: 1499,
    sale: 999,
  },
  {
    id: "diamondblue",
    name: "Diamond Blue",
    image: "Shades/DiamondBlue.jpg",
    color: "blue",
    swatch: ["#9BB9D8", "#2D5F8A"],
    price: 1499,
    sale: 999,
  },
  {
    id: "dnabrown",
    name: "DNA Brown",
    image: "Shades/DNABrown.jpg",
    color: "brown",
    swatch: ["#C49768", "#4B2C14"],
    price: 1499,
    sale: 999,
  },
  {
    id: "anglegrey",
    name: "Angel Grey",
    image: "Shades/AngelGrey.jpg",
    color: "grey",
    swatch: ["#D0D0D3", "#5D6069"],
    price: 1499,
    sale: 999,
  },
  {
    id: "auragreen",
    name: "Aura Green",
    image: "Shades/AuraGreen.jpg",
    color: "green",
    swatch: ["#BED8AF", "#5D7A5C"],
    price: 1499,
    sale: 999,
  },
];

/* ================================ RENDERING ================================ */

function cardHTML(p) {
  return `
    <article class="card" id="${p.id}" data-id="${p.id}" data-name="${p.name.toLowerCase()}" data-color="${p.color}">
      <div class="card-media">
        <span class="badge-sale">Sale</span>
        <img src="${p.image}" alt="${p.name} colored contact lens" loading="lazy">
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
const resultsTitle = document.getElementById("resultsTitle");
const filterClear = document.getElementById("filterClear");
const colorNav = document.getElementById("colorNav");

function buildNavigation() {
  colorNav.innerHTML = [
    `<a href="#shop" class="active">Shop</a>`,
    `<a href="#tools">Tools</a>`,
    `<a href="#faq">FAQ</a>`,
  ].join("");
}

function renderGrid() {
  grid.innerHTML = PRODUCTS.map(cardHTML).join("");
}

if (grid) {
  buildNavigation();
  renderGrid();
}

/* ================================ FILTER + SEARCH ================================ */

let query = "";
let activeColor = "all";

function formatColorTitle(color) {
  if (!color || color === "all") return "All lenses";
  return `${color.charAt(0).toUpperCase()}${color.slice(1)} lenses`;
}

function updateResultsTitle() {
  if (!resultsTitle) return;
  resultsTitle.textContent = formatColorTitle(activeColor);
  if (filterClear) {
    filterClear.classList.toggle("hidden", activeColor === "all");
  }
}

function applyFilters() {
  let visible = 0;
  document.querySelectorAll(".card").forEach((card) => {
    const matchesQuery = card.dataset.name.includes(query);
    const matchesColor = activeColor === "all" || card.dataset.color === activeColor;
    const show = matchesQuery && matchesColor;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  resultsCount.textContent = `${visible} style${visible === 1 ? "" : "s"}`;
  emptyState.classList.toggle("show", visible === 0);
  updateResultsTitle();
}

const searchToggle = document.getElementById("searchToggle");
const searchField = document.getElementById("searchField");
const searchInput = document.getElementById("searchInput");

if (searchToggle) {
  searchToggle.addEventListener("click", () => {
    searchField.classList.toggle("open");
    if (searchField.classList.contains("open")) searchInput.focus();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    applyFilters();
  });
}

if (filterClear) {
  filterClear.addEventListener("click", () => {
    activeColor = "all";
    document.querySelectorAll(".featured-color-card").forEach((card) => {
      card.classList.remove("active");
    });
    applyFilters();
  });
}

const colorPicks = document.querySelectorAll(".featured-color-card, .color-pick");
if (colorPicks.length) {
  colorPicks.forEach((button) => {
    button.addEventListener("click", () => {
      const nextColor = button.dataset.color || "all";
      const shouldDeselect = button.classList.contains("active") || activeColor === nextColor;

      if (shouldDeselect) {
        activeColor = "all";
        document.querySelectorAll(".featured-color-card").forEach((card) => {
          card.classList.remove("active");
        });
      } else {
        activeColor = nextColor;
        document.querySelectorAll(".featured-color-card").forEach((card) => {
          card.classList.toggle("active", card.dataset.color === nextColor && nextColor !== "all");
        });
      }

      applyFilters();
      if (activeColor !== "all") {
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

if (grid) applyFilters();

/* ================================ WHATSAPP BUY FLOW ================================ */

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

if (grid) {
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".buy-btn");
    if (!btn) return;
    const product = PRODUCTS.find((p) => p.id === btn.dataset.id);
    if (!product) return;
    showToast(`Opening WhatsApp for ${product.name}…`);
    openWhatsApp(productMessage(product));
  });
}

const contactLink = document.getElementById("waContactUs");
const trackOrderLink = document.getElementById("waTrackOrder");
if (contactLink) {
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp(GENERAL_MESSAGE);
  });
}
if (trackOrderLink) {
  trackOrderLink.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp(TRACK_ORDER_MESSAGE);
  });
}

/* ================================ TOOLS: COST PER DAY ================================ */

const calcPrice = document.getElementById("calcPrice");
const calcDays = document.getElementById("calcDays");
const calcResult = document.getElementById("calcResult");

function updateCalc() {
  const price = parseFloat(calcPrice.value) || 0;
  const days = parseFloat(calcDays.value) || 1;
  calcResult.textContent = (price / days).toFixed(2);
}
if (calcPrice && calcDays && calcResult) {
  calcPrice.addEventListener("input", updateCalc);
  calcDays.addEventListener("input", updateCalc);
  updateCalc();
}

/* ============================ PRODUCT REDIRECTS ============================
   Preview pages are opened by link crawlers, then send real visitors back to
   the matching product on the homepage.
   ========================================================================== */
const productPageMatch = window.location.pathname.match(/\/products\/([^/]+)\.html$/);
if (productPageMatch) {
  window.location.replace(`../index.html#${productPageMatch[1]}`);
}

/* ============================== SHADE FINDER ===============================
   The finder uses the same product list as the homepage and adds the ../ path
   needed when its page is inside the tools folder.
   ========================================================================== */
const finderProductGrid = document.getElementById("finderProductGrid");

if (finderProductGrid) {
  const finderProductCount = document.getElementById("finderProductCount");
  const finderResultLabel = document.getElementById("finderResultLabel");
  const finderResultBadge = document.getElementById("finderResultBadge");
  const finderResultImage = document.getElementById("finderResultImage");
  const finderResultShimmer = document.getElementById("finderResultShimmer");
  const finderPreviewImage = document.getElementById("finderPreviewImage");
  const finderResultSwatch = document.getElementById("finderResultSwatch");
  const finderResultName = document.getElementById("finderResultName");
  const finderResultOldPrice = document.getElementById("finderResultOldPrice");
  const finderResultPrice = document.getElementById("finderResultPrice");
  const finderResultBuy = document.getElementById("finderResultBuy");
  const questionOne = document.querySelector('[data-step="1"]');
  const questionTwo = document.querySelector('[data-step="2"]');
  const questionThree = document.querySelector('[data-step="3"]');
  let currentStep = "1";
  let quizAnswers = {};

  function finderImage(product) {
    return `../${product.image}`;
  }

  function toneFamily(color) {
    if (color === "brown") return "warm";
    if (color === "blue" || color === "green") return "cool";
    return "neutral";
  }

  function lookCategory(product) {
    if (/glitter/i.test(product.name)) return "sparkly";
    if (["blue", "green", "black"].includes(product.color)) return "bold";
    return "natural";
  }

  function finderMessage(product) {
    return `Hi LumiNoor! I'd like to order ${product.name} (Rs.${product.sale}). Is it in stock?`;
  }

  function desiredLook() {
    if (quizAnswers.drama) {
      return quizAnswers.drama === "dramatic" ? "sparkly" : quizAnswers.drama === "noticeable" ? "bold" : "natural";
    }
    const occasionLooks = { daily: "natural", casual: "natural", mehndi: "natural", baraat: "bold", walima: "sparkly", photoshoot: "sparkly" };
    return occasionLooks[quizAnswers.occasion] || "";
  }

  function preferredTone() {
    const skinToneLooks = { fair: "warm", wheatish: "warm", deep: "cool" };
    return skinToneLooks[quizAnswers.skinTone] || "";
  }

  function pickBestMatch(look, tone) {
    return PRODUCTS.reduce((bestProduct, product) => {
      const productScore = (lookCategory(product) === look ? 2 : 0) + (toneFamily(product.color) === tone ? 2 : 0);
      const bestScore = (lookCategory(bestProduct) === look ? 2 : 0) + (toneFamily(bestProduct.color) === tone ? 2 : 0);
      return productScore > bestScore ? product : bestProduct;
    }, PRODUCTS[0]);
  }

  function matchingProducts() {
    const look = desiredLook();
    const tone = preferredTone();
    return PRODUCTS.filter((product) => (!look || lookCategory(product) === look) && (!tone || toneFamily(product.color) === tone));
  }

  function renderFinderGrid() {
    let products = matchingProducts();
    if (quizAnswers.skinTone && quizAnswers.occasion && quizAnswers.drama) {
      const finalMatch = pickBestMatch(desiredLook(), preferredTone());
      products = products.filter((product) => product.id !== finalMatch.id);
    }
    finderProductCount.textContent = `${products.length} shade${products.length === 1 ? "" : "s"}`;
    finderProductGrid.innerHTML = products.map((product) => `
      <article class="card">
        <div class="card-media">
          <span class="badge-sale">Sale</span>
          <img src="${finderImage(product)}" alt="${product.name} colored contact lens" loading="lazy">
          <div class="swatch swatch-${product.id}"></div>
          <a class="buy-btn" href="${buildWhatsAppLink(finderMessage(product))}">Buy on WhatsApp</a>
        </div>
        <div class="card-body">
          <p class="name"><a href="../index.html#${product.id}">${product.name}</a></p>
          <div class="price-row"><span class="was">Rs.${product.price.toLocaleString()}.00 PKR</span><span class="now">Rs.${product.sale.toLocaleString()}.00 PKR</span></div>
        </div>
      </article>`).join("");
  }

  function updateFinderMenu() {
    const progress = currentStep === "1" ? 33.333 : currentStep === "2" ? 66.667 : quizAnswers.drama ? 100 : 66.667;
    document.getElementById("quizProgressBar").style.width = `${progress}%`;
    questionOne.classList.toggle("active", currentStep === "1");
    questionTwo.classList.toggle("active", currentStep === "2");
    questionThree.classList.toggle("active", currentStep === "3");
  }

  function updateFinalMatch() {
    const hasAllAnswers = Boolean(quizAnswers.skinTone && quizAnswers.occasion && quizAnswers.drama);
    if (!hasAllAnswers) {
      const previewProduct = matchingProducts()[0];
      if (previewProduct) {
        finderPreviewImage.src = finderImage(previewProduct);
        finderPreviewImage.alt = `Preview of ${previewProduct.name}`;
      }
      finderResultImage.hidden = true;
      finderResultShimmer.hidden = false;
      finderResultLabel.hidden = true;
      finderResultSwatch.hidden = true;
      finderResultBadge.hidden = true;
      finderResultName.textContent = "";
      finderResultOldPrice.textContent = "";
      finderResultPrice.textContent = "";
      finderResultBuy.hidden = true;
      return;
    }
    const product = pickBestMatch(desiredLook(), preferredTone());
    finderResultImage.src = finderImage(product);
    finderResultImage.alt = `${product.name} colored contact lens`;
    finderResultImage.hidden = false;
    finderResultShimmer.hidden = true;
    finderResultLabel.hidden = false;
    finderResultSwatch.className = `swatch swatch-${product.id}`;
    finderResultSwatch.hidden = false;
    finderResultBadge.hidden = false;
    finderResultName.textContent = product.name;
    finderResultOldPrice.textContent = `Rs.${product.price.toLocaleString()}.00 PKR`;
    finderResultPrice.textContent = `Rs.${product.sale.toLocaleString()}.00 PKR`;
    finderResultBuy.href = buildWhatsAppLink(finderMessage(product));
    finderResultBuy.hidden = false;
  }

  function updateFinder() {
    renderFinderGrid();
    updateFinderMenu();
    updateFinalMatch();
  }

  function refreshSelectedOptions() {
    document.querySelectorAll(".quiz-option").forEach((option) => {
      const choiceKey = option.dataset.skinTone ? "skinTone" : option.dataset.occasion ? "occasion" : "drama";
      const choiceValue = option.dataset.skinTone || option.dataset.occasion || option.dataset.drama;
      option.classList.toggle("selected", quizAnswers[choiceKey] === choiceValue);
    });
  }

  document.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const choiceKey = button.dataset.skinTone ? "skinTone" : button.dataset.occasion ? "occasion" : "drama";
      const choiceValue = button.dataset.skinTone || button.dataset.occasion || button.dataset.drama;
      quizAnswers[choiceKey] = quizAnswers[choiceKey] === choiceValue ? "" : choiceValue;
      if (choiceKey === "skinTone") {
        quizAnswers.occasion = "";
        quizAnswers.drama = "";
        currentStep = quizAnswers.skinTone ? "2" : "1";
      }
      if (choiceKey === "occasion") {
        quizAnswers.drama = "";
        currentStep = quizAnswers.occasion ? "3" : "2";
      }
      if (choiceKey === "drama") currentStep = "3";
      refreshSelectedOptions();
      updateFinder();
    });
  });

  document.addEventListener("click", (event) => {
    const allChoicesSelected = quizAnswers.skinTone && quizAnswers.occasion && quizAnswers.drama;
    const hasPartialChoice = quizAnswers.skinTone || quizAnswers.occasion || quizAnswers.drama;
    if (!hasPartialChoice || allChoicesSelected || event.target.closest(".quiz-page-card")) return;
    quizAnswers = {};
    currentStep = "1";
    refreshSelectedOptions();
    updateFinder();
  });

  document.querySelectorAll("[data-back-to]").forEach((button) => {
    button.addEventListener("click", () => {
      currentStep = button.dataset.backTo;
      updateFinder();
    });
  });

  updateFinder();
}
