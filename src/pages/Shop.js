import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { products } from "../pages/Products";
import "../styles/Shop.css";

const Shop = () => {
  const { searchQuery, setSearchQuery, reviews = {} } = useContext(AppContext);
  const { addToast } = useToast();
  const location = useLocation();

  const [filtered, setFiltered] = useState(products);

  const companies = [
    "All",
    "Itel",
    "Sofar",
    "Growatt",
    "Inverex",
    "Longi",
    "Jinko",
    "Trina",
    "Huawei",
    "Generic",
  ];

  const categories = ["All", "Solar Panels", "Inverters", "Batteries", "Electronics"];

  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ NEW: toolbar state (sorting + availability)
  const [sortBy, setSortBy] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);

  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / productReviews.length).toFixed(1);
  };

  const renderStars = (avgRating) => {
    const full = Math.floor(avgRating);
    const half = avgRating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <span className="stars">
        {"★".repeat(full)}
        {half && "½"}
        {"☆".repeat(empty)}
        <small style={{ marginLeft: "6px", color: "#777" }}>
          ({avgRating > 0 ? avgRating : "No reviews"})
        </small>
      </span>
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCompany = params.get("company");
    const urlSearch = params.get("search") || "";

    // URL -> state sync
    if (urlCompany) setSelectedCompany(urlCompany);
    if (urlSearch) setSearchQuery(urlSearch);

    let list = products;

    // ✅ Company filter (prefer URL if present, else local state)
    const companyToUse = urlCompany || selectedCompany;
    if (companyToUse && companyToUse !== "All") {
      list = list.filter((p) => p.company === companyToUse);
    }

    // ✅ Category filter
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // ✅ Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    // ✅ Availability filter (requires products to have inStock: true/false)
    if (inStockOnly) {
      list = list.filter((p) => p.inStock === true);
    }

    // ✅ Sorting
    if (sortBy === "newest") {
      list = [...list].sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortBy === "priceLow") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "priceHigh") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "nameAZ") {
      list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    setFiltered(list);
  }, [
    location.search,
    selectedCompany,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    reviews,
    addToast,
    sortBy,
    inStockOnly,
  ]);

  const clearFilters = () => {
    setSelectedCompany("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("default");
    setInStockOnly(false);

    window.history.replaceState({}, document.title, "/shop");
    setFiltered(products);

    addToast("Filters cleared – showing all products", "success", 2000);
  };

  const hasActiveFilters =
    selectedCompany !== "All" ||
    selectedCategory !== "All" ||
    !!searchQuery ||
    inStockOnly ||
    sortBy !== "default";

  return (
    <div className="shop-page">
      <h1>Distributor Products</h1>

      {/* ✅ TOOLBAR */}
      <div className="shop-toolbar">
  <div className="toolbar-left">
    <p className="results-text">
      <i className="bi bi-grid-3x3-gap"></i>
      Showing <b>{filtered.length}</b> of <b>{products.length}</b> products
    </p>

    {hasActiveFilters && (
      <button className="clear-btn" onClick={clearFilters}>
        <i className="bi bi-x-circle"></i> Clear
      </button>
    )}
  </div>

  <div className="toolbar-right">
    <label className="stock-toggle">
      <input
        type="checkbox"
        checked={inStockOnly}
        onChange={(e) => setInStockOnly(e.target.checked)}
      />
      <span>In Stock</span>
    </label>

    <div className="sort-wrap">
      <i className="bi bi-filter"></i>
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Sort: Default</option>
        <option value="newest">Newest</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="nameAZ">Name: A → Z</option>
      </select>
    </div>
  </div>
</div>

      {/* Company filter */}
      <div className="filter-row">
        {companies.map((c) => (
          <button
            key={c}
            className={selectedCompany === c ? "active" : ""}
            onClick={() => {
              setSelectedCompany(c);
              // ✅ update URL without full refresh
              window.history.replaceState(
                {},
                document.title,
                `/shop?company=${encodeURIComponent(c)}`
              );
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="filter-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <button onClick={clearFilters}>Show All</button>
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="product-wrapper">
              <ProductCard product={p} />


              <div className="rating-below-card">
                {renderStars(getAverageRating(p.id))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;