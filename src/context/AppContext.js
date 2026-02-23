import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cart with quantity support
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Wishlist - no duplicates
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Reviews
  const [reviews, setReviews] = useState({});

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: prev[productId] ? [...prev[productId], review] : [review],
    }));
  };

  // Global search state
  const [searchQuery, setSearchQuery] = useState("");

  // Admin (demo)
  const [admin, setAdmin] = useState(sessionStorage.getItem("admin") === "true");

  const loginAdmin = (username, password) => {
    if (username === "admin" && password === "1234") {
      setAdmin(true);
      sessionStorage.setItem("admin", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdmin(false);
    sessionStorage.removeItem("admin");
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        reviews,
        addReview,
        searchQuery,
        setSearchQuery,
        admin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};