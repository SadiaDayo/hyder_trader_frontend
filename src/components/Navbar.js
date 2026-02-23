import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { cart, wishlist, setSearchQuery } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Predefined category suggestions
  const categorySuggestions = [
    "Solar Panels",
    "Inverters",
    "Batteries",
    "Electronics",
    "LED Lights",
    "All Products",
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    setSearchQuery(searchInput.trim());
    navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    setSearchInput("");
    setShowSuggestions(false);
    closeMenu();
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (suggestion) => {
    const query = suggestion === "All Products" ? "" : suggestion;
    setSearchQuery(query);
    navigate(`/shop${query ? `?search=${encodeURIComponent(query)}` : ""}`);
    setSearchInput("");
    setShowSuggestions(false);
    closeMenu();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* LEFT - Logo + Mobile Menu Toggle */}
      <div className="nav-left">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <NavLink to="/" onClick={closeMenu} className="navbar-logo">
          <img src={logo} alt="Hyder Traders Logo" />
        </NavLink>
      </div>

      {/* CENTER LINKS */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Shop
        </NavLink>

        <NavLink
          to="/quotation"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Quotation
        </NavLink>

        <NavLink
          to="/calculator"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Calculator
        </NavLink>

        <NavLink
          to="/about"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Contact
        </NavLink>
      </div>

      {/* SEARCH with Dropdown */}
      <div className="navbar-search-wrapper" ref={searchRef}>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          <button type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        {/* Dropdown suggestions - shows on focus */}
        {showSuggestions && (
          <div className="search-suggestions">
            <p className="suggestions-title">Popular Categories</p>
            {categorySuggestions.map((cat) => (
              <button
                key={cat}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT ICONS */}
      <div className="navbar-icons">
        <NavLink to="/wishlist" onClick={closeMenu} className="icon">
          💖 <span>{wishlist.length}</span>
        </NavLink>

        <NavLink to="/cart" onClick={closeMenu} className="icon">
          🛒 <span>{cart.length}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;