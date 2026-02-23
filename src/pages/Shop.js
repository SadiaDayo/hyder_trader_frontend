import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";
import { products } from "../pages/Products"; // ← from same folder
import "../styles/Shop.css";

const Shop = () => {
  const { searchQuery, setSearchQuery, reviews = {} } = useContext(AppContext);
  const location = useLocation();

  const [filtered, setFiltered] = useState(products);

  const companies = [
    "All", "Itel", "Sofar", "Growatt", "Inverex", "Longi", "Jinko", "Trina", "Huawei", "Generic",
  ];

  const categories = ["All", "Solar Panels", "Inverters", "Batteries", "Electronics"];

  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

    if (urlCompany) setSelectedCompany(urlCompany);
    if (urlSearch) setSearchQuery(urlSearch);

    let list = products;

    if (urlCompany && urlCompany !== "All") {
      list = list.filter((p) => p.company === urlCompany);
    }

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    setFiltered(list);
  }, [location.search, selectedCategory, searchQuery, setSearchQuery, reviews]);

  const clearFilters = () => {
    setSelectedCompany("All");
    setSelectedCategory("All");
    setSearchQuery("");
    window.history.replaceState({}, document.title, "/shop");
    setFiltered(products);
  };

  return (
    <div className="shop-page">
      <h1>Distributor Products</h1>

      <div className="filter-row">
        {companies.map((c) => (
          <button
            key={c}
            className={selectedCompany === c ? "active" : ""}
            onClick={() => (window.location.href = `/shop?company=${encodeURIComponent(c)}`)}
          >
            {c}
          </button>
        ))}
      </div>

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