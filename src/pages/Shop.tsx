import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

type Product = {
  id?: string | number;
  title?: string;
  listing_title?: string;
  name?: string;
  brand?: string;
  model?: string;
  category?: string;
  condition?: string;
  online_price?: number | string;
  price?: number | string;
  description?: string;
  listing_description?: string;
  photo_urls?: string[] | string | null;
  images?: string[] | string | null;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CustomerDetails = {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const WHATSAPP_NUMBER = "19426603737";

function productTitle(p: Product) {
  return (
    p.listing_title ||
    p.title ||
    p.name ||
    [p.brand, p.model].filter(Boolean).join(" ") ||
    "Electronics item"
  );
}

function productPhotos(p: Product): string[] {
  const value = p.photo_urls ?? p.images;

  if (Array.isArray(value)) {
    return value.filter(
      (x): x is string => typeof x === "string" && x.trim().length > 0,
    );
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (x): x is string => typeof x === "string" && x.trim().length > 0,
        );
      }
    } catch {
      return [value.trim()];
    }
  }

  return [];
}

function numericPrice(p: Product): number | null {
  const value = p.online_price ?? p.price;
  if (value === undefined || value === null || value === "") return null;

  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function priceLabel(p: Product) {
  const n = numericPrice(p);
  if (n === null) return "Price on request";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(n);
}

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "search" | "bag" | "arrow" | "left" | "right" | "close";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    );

  if (name === "bag")
    return (
      <svg {...common}>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );

  if (name === "arrow")
    return (
      <svg {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );

  if (name === "left")
    return (
      <svg {...common}>
        <path d="m15 18-6-6 6-6" />
      </svg>
    );

  if (name === "right")
    return (
      <svg {...common}>
        <path d="m9 18 6-6-6-6" />
      </svg>
    );

  return (
    <svg {...common}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [customer, setCustomer] = useState<CustomerDetails>({
    full_name: "", email: "", phone: "", address_line1: "", address_line2: "",
    city: "", province: "", postal_code: "", country: "Canada",
  });

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        if (mounted) {
          setError("The shop catalogue is not connected.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(
          `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/store_products?select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );

        if (!response.ok) throw new Error("Could not fetch products");

        const data = await response.json();

        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) {
          setError("Products could not be loaded. Please refresh the page.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeProduct && !cartOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProduct(null);
        setCartOpen(false);
      }

      if (activeProduct && event.key === "ArrowRight") {
        const photos = productPhotos(activeProduct);
        if (photos.length) {
          setActivePhoto((current) => (current + 1) % photos.length);
        }
      }

      if (activeProduct && event.key === "ArrowLeft") {
        const photos = productPhotos(activeProduct);
        if (photos.length) {
          setActivePhoto(
            (current) => (current - 1 + photos.length) % photos.length,
          );
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProduct, cartOpen]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        products
          .map((p) => p.category?.trim())
          .filter((c): c is string => Boolean(c)),
      ),
    ],
    [products],
  );

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return products.filter((p) => {
      const categoryMatch =
        category === "All" || p.category?.trim() === category;

      const text = [
        productTitle(p),
        p.brand,
        p.model,
        p.category,
        p.condition,
        p.listing_description,
        p.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return categoryMatch && (!q || text.includes(q));
    });
  }, [products, category, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (numericPrice(item.product) ?? 0) * item.quantity,
    0,
  );

  function addToCart(p: Product) {
    const key = p.id ?? productTitle(p);

    setCart((current) => {
      const found = current.some(
        (item) => (item.product.id ?? productTitle(item.product)) === key,
      );

      if (found) {
        return current.map((item) =>
          (item.product.id ?? productTitle(item.product)) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product: p, quantity: 1 }];
    });

    setActiveProduct(null);
    setCartOpen(true);
  }

  function updateQuantity(p: Product, change: number) {
    const key = p.id ?? productTitle(p);

    setCart((current) =>
      current
        .map((item) =>
          (item.product.id ?? productTitle(item.product)) === key
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  async function beginCheckout() {
    setCheckoutError("");
    if (
      !customer.full_name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim()) ||
      !customer.phone.trim() || !customer.address_line1.trim() ||
      !customer.city.trim() || !customer.province.trim() ||
      !customer.postal_code.trim() || customer.country !== "Canada"
    ) {
      setCheckoutError("Please complete all required contact and Canadian shipping fields before continuing.");
      return;
    }

    // The current reservation/checkout Edge Function supports one inventory
    // item per checkout, quantity one.
    if (cart.length !== 1 || cart[0].quantity !== 1) {
      setCheckoutError("Checkout currently supports one item at a time. Please set the bag to one item with quantity 1.");
      return;
    }

    const inventoryId = cart[0].product.id;
    if (inventoryId === undefined || inventoryId === null || String(inventoryId).trim() === "") {
      setCheckoutError("This listing is missing its inventory ID. Please contact Road2Resell.");
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setCheckoutError("Checkout is not configured. Please contact Road2Resell.");
      return;
    }

    setCheckoutLoading(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/create-checkout-session-live`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            inventory_id: String(inventoryId),
            customer: {
              ...customer,
              full_name: customer.full_name.trim(),
              email: customer.email.trim().toLowerCase(),
              phone: customer.phone.trim(),
              address_line1: customer.address_line1.trim(),
              address_line2: customer.address_line2.trim(),
              city: customer.city.trim(),
              province: customer.province.trim(),
              postal_code: customer.postal_code.trim(),
            },
          }),
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Could not start checkout. The item may have just sold; please refresh and try again.",
        );
      }

      if (typeof result?.checkout_url !== "string" || !result.checkout_url.startsWith("https://")) {
        throw new Error("Checkout did not return a valid Stripe Checkout link.");
      }

      window.location.assign(result.checkout_url);
    } catch (err) {
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "Checkout failed. Please try again or contact Road2Resell.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  function openProduct(p: Product) {
    setActiveProduct(p);
    setActivePhoto(0);
  }

  function whatsappLink(p: Product) {
    const message = `Hi Road2Resell, I have a question about ${productTitle(
      p,
    )} (${priceLabel(p)}).`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
  }

  const detailPhotos = activeProduct ? productPhotos(activeProduct) : [];

  return (
    <>
      <Helmet>
        <title>Shop Electronics | Road2Resell</title>
        <meta
          name="description"
          content="Discover quality pre-owned electronics at Road2Resell."
        />
        <link rel="canonical" href="https://road2resell.ca/shop" />
      </Helmet>

      <div className="min-h-screen bg-[#f8f8f6] text-[#181a18]">
        <Header />

        {/* Chic editorial hero */}
        <section className="relative overflow-hidden bg-[#111512] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(156,190,157,0.17),transparent_40%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b9d4bb] sm:text-xs">
                Road2Resell / Curated technology
              </p>

              <h1 className="mt-6 text-4xl font-light leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Better tech.
                <br />
                <span className="font-medium text-[#c1d8c2]">
                  Better decisions.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
                Discover pre-loved devices chosen for their next chapter.
                Exceptional technology, without the excess.
              </p>

              <a
                href="#products"
                className="mt-9 inline-flex items-center gap-4 border-b border-[#c1d8c2]/60 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d8e7d8] transition hover:border-white hover:text-white"
              >
                Explore the collection
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <main
          id="products"
          className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-[#e5e5e0] pb-7 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#728b73]">
                The edit
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-[-0.035em] sm:text-3xl">
                Find your next favourite.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="relative">
                <span className="sr-only">Search products</span>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Icon name="search" className="h-4 w-4" />
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the collection"
                  className="w-full rounded-none border-b border-[#d8d8d2] bg-transparent py-3 pl-9 pr-2 text-xs outline-none transition placeholder:text-neutral-400 focus:border-[#6e8a70] sm:w-64"
                />
              </label>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center gap-2 border border-[#d8d8d2] px-4 py-3 text-xs transition hover:border-[#6e8a70]"
              >
                <Icon name="bag" className="h-4 w-4" />
                Bag{cartCount ? ` (${cartCount})` : ""}
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-5 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`shrink-0 border-b pb-2 text-[11px] uppercase tracking-[0.15em] transition ${
                  category === c
                    ? "border-[#283c2b] font-semibold text-[#283c2b]"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mb-5 mt-5 flex justify-between text-[10px] uppercase tracking-[0.16em] text-neutral-400">
            <span>
              {loading
                ? "Loading"
                : `${visibleProducts.length} ${
                    visibleProducts.length === 1 ? "piece" : "pieces"
                  }`}
            </span>
            <span>CAD</span>
          </div>

          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="aspect-[4/5] animate-pulse bg-[#eaeae6]"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && visibleProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-light">
                {products.length
                  ? "Nothing matches your search."
                  : "New pieces coming soon."}
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Try a different search or category.
              </p>
            </div>
          )}

          {!loading && !error && visibleProducts.length > 0 && (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((p, index) => {
                const photos = productPhotos(p);

                return (
                  <button
                    key={p.id ?? `${productTitle(p)}-${index}`}
                    type="button"
                    onClick={() => openProduct(p)}
                    className="group text-left focus:outline-none"
                  >
                    <div className="relative aspect-[4/4.4] overflow-hidden bg-[#efefeb]">
                      {photos[0] ? (
                        <img
                          src={photos[0]}
                          alt={productTitle(p)}
                          loading="lazy"
                          className="h-full w-full object-contain p-7 transition duration-700 ease-out group-hover:scale-[1.045]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-neutral-400">
                          Image coming soon
                        </div>
                      )}

                      <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.15em] text-neutral-600">
                        {p.condition || "Pre-owned"}
                      </span>

                      <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-neutral-800 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <Icon name="arrow" className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="pt-4">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#7b927c]">
                        {p.category || "Technology"}
                      </p>

                      <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 tracking-tight">
                        {productTitle(p)}
                      </h3>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">
                          {priceLabel(p)}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.13em] text-neutral-400 transition group-hover:text-[#617d63]">
                          Discover
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Product detail modal with selectable gallery */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0d0b]/70 p-2 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Product details"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveProduct(null);
          }}
        >
          <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto bg-[#fafaf8] shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              {/* Gallery */}
              <div className="bg-[#efefeb] p-4 sm:p-7">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#f8f8f6]">
                  {detailPhotos.length > 0 ? (
                    <img
                      src={detailPhotos[activePhoto]}
                      alt={`${productTitle(activeProduct)} — photo ${
                        activePhoto + 1
                      }`}
                      className="h-full w-full object-contain p-5 sm:p-10"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-neutral-400">
                      No product photos
                    </span>
                  )}

                  {detailPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous product photo"
                        onClick={() =>
                          setActivePhoto(
                            (current) =>
                              (current - 1 + detailPhotos.length) %
                              detailPhotos.length,
                          )
                        }
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white"
                      >
                        <Icon name="left" className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        aria-label="Next product photo"
                        onClick={() =>
                          setActivePhoto(
                            (current) => (current + 1) % detailPhotos.length,
                          )
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white"
                      >
                        <Icon name="right" className="h-4 w-4" />
                      </button>

                      <span className="absolute bottom-3 right-3 bg-white/90 px-3 py-1.5 text-[10px] tracking-wider text-neutral-600">
                        {activePhoto + 1} / {detailPhotos.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Clickable thumbnail strip */}
                {detailPhotos.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {detailPhotos.map((photo, index) => (
                      <button
                        key={`${photo}-${index}`}
                        type="button"
                        onClick={() => setActivePhoto(index)}
                        aria-label={`Show product photo ${index + 1}`}
                        aria-pressed={activePhoto === index}
                        className={`h-[68px] w-[68px] shrink-0 overflow-hidden border bg-white p-1 transition ${
                          activePhoto === index
                            ? "border-[#314b34] ring-1 ring-[#314b34]"
                            : "border-transparent opacity-65 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={photo}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product information */}
              <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#718a72]">
                  {activeProduct.category || "Curated technology"}
                </p>

                <h2 className="mt-4 pr-8 text-2xl font-light leading-tight tracking-[-0.035em] sm:text-4xl">
                  {productTitle(activeProduct)}
                </h2>

                {(activeProduct.brand || activeProduct.model) && (
                  <p className="mt-3 text-xs tracking-wide text-neutral-500">
                    {[activeProduct.brand, activeProduct.model]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}

                <p className="mt-6 text-xl font-medium tracking-tight">
                  {priceLabel(activeProduct)}
                </p>

                <div className="mt-4 inline-flex w-fit border border-[#dcdcd5] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-neutral-600">
                  Condition: {activeProduct.condition || "Pre-owned"}
                </div>

                <div className="my-7 h-px bg-[#e3e3dd]" />

                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Product details
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-600">
                  {activeProduct.listing_description ||
                    activeProduct.description ||
                    "Contact us for additional product details."}
                </p>

                <div className="mt-auto pt-9">
                  <button
                    type="button"
                    onClick={() => addToCart(activeProduct)}
                    disabled={numericPrice(activeProduct) === null}
                    className="w-full bg-[#172119] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#314b34] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Add to bag
                  </button>

                  <a
                    href={whatsappLink(activeProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full border border-[#d7d7d0] px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-700 transition hover:border-neutral-500"
                  >
                    Ask about this item
                  </a>

                  <p className="mt-4 text-[10px] leading-5 text-neutral-400">
                    Secure payment is handled by Stripe Checkout. Shipping details and any applicable taxes are shown during checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/40"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fafaf8] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e3dd] px-6 py-5">
              <div>
                <h2 className="text-lg font-light tracking-tight">Your bag</h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm">Your bag is empty.</p>
                  <p className="mt-2 text-xs text-neutral-400">
                    Find something you love.
                  </p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => {
                  const photo = productPhotos(product)[0];

                  return (
                    <div
                      key={product.id ?? productTitle(product)}
                      className="flex gap-4 border-b border-[#e8e8e2] py-5"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-[#efefeb]">
                        {photo && (
                          <img
                            src={photo}
                            alt={productTitle(product)}
                            className="h-full w-full object-contain p-2"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {productTitle(product)}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {priceLabel(product)}
                        </p>

                        <div className="mt-3 inline-flex items-center border border-[#deded8] text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, -1)}
                            className="px-3 py-1.5"
                          >
                            −
                          </button>
                          <span className="min-w-7 text-center">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, 1)}
                            className="px-3 py-1.5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-[#e3e3dd] p-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: "CAD",
                  }).format(subtotal)}
                </span>
              </div>

              {cart.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700">Contact information</p>
                  <input aria-label="Full name" autoComplete="name" required value={customer.full_name} onChange={(e) => setCustomer({ ...customer, full_name: e.target.value })} placeholder="Full name *" className="w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  <input aria-label="Email address" type="email" autoComplete="email" required value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="Email address *" className="w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  <input aria-label="Phone number" type="tel" autoComplete="tel" required value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="Phone number *" className="w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  <p className="pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-700">Shipping address (Canada)</p>
                  <input aria-label="Street address" autoComplete="address-line1" required value={customer.address_line1} onChange={(e) => setCustomer({ ...customer, address_line1: e.target.value })} placeholder="Street address *" className="w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  <input aria-label="Apartment or unit" autoComplete="address-line2" value={customer.address_line2} onChange={(e) => setCustomer({ ...customer, address_line2: e.target.value })} placeholder="Apartment / unit (optional)" className="w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input aria-label="City" autoComplete="address-level2" required value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="City *" className="min-w-0 w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                    <input aria-label="Province" autoComplete="address-level1" required value={customer.province} onChange={(e) => setCustomer({ ...customer, province: e.target.value })} placeholder="Province *" className="min-w-0 w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input aria-label="Postal code" autoComplete="postal-code" required value={customer.postal_code} onChange={(e) => setCustomer({ ...customer, postal_code: e.target.value.toUpperCase() })} placeholder="Postal code *" className="min-w-0 w-full border border-[#deded8] bg-white px-3 py-3 text-sm outline-none focus:border-[#6e8a70]" />
                    <input aria-label="Country" value="Canada" readOnly className="min-w-0 w-full border border-[#deded8] bg-[#f1f1ed] px-3 py-3 text-sm text-neutral-500" />
                  </div>
                </div>
              )}

              <p className="mt-3 text-[10px] leading-5 text-neutral-400">
                Your details are linked to your order. Payment is processed securely by Stripe. One item per order is currently supported.
              </p>

              {checkoutError && (
                <p role="alert" className="mt-3 border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
                  {checkoutError}
                </p>
              )}

              <button
                type="button"
                onClick={beginCheckout}
                disabled={
                  checkoutLoading ||
                  cart.length !== 1 ||
                  cart[0]?.quantity !== 1 ||
                  !customer.full_name.trim() || !customer.email.trim() || !customer.phone.trim() ||
                  !customer.address_line1.trim() || !customer.city.trim() || !customer.province.trim() ||
                  !customer.postal_code.trim()
                }
                className="mt-5 w-full bg-[#172119] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#314b34] disabled:cursor-not-allowed disabled:bg-[#e7e7e2] disabled:text-neutral-400"
              >
                {checkoutLoading
                  ? "Connecting to secure checkout…"
                  : cart.length === 1 && cart[0]?.quantity === 1
                    ? "Proceed to secure checkout"
                    : "Checkout · One item at a time"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}