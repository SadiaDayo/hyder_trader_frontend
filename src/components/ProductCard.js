import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useContext(AppContext);

  const { addToast } = useToast();
  const [hovered, setHovered] = useState(false);

  const inCart = cart.some((item) => item.id === product.id);
  const inWishlist = wishlist.some((item) => item.id === product.id);

  // ✅ stock check
  const isOutOfStock = !product.inStock || (product.stockQty ?? 0) <= 0;

  const toggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ prevent adding if out of stock
    if (!inCart && isOutOfStock) {
      addToast("This product is currently out of stock", "warning", 2500);
      return;
    }

    if (inCart) {
      removeFromCart(product.id);
      addToast(`Removed ${product.name} from cart`, "info", 3000);
    } else {
      addToCart(product);
      addToast(`Added ${product.name} to cart`, "success", 3000);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast(`Removed ${product.name} from wishlist`, "info", 2500);
    } else {
      addToWishlist(product);
      addToast(`Added ${product.name} to wishlist`, "success", 2500);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div
        className={`product-card ${isOutOfStock ? "out-stock-card" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="product-image">
          {/* ✅ Stock badge top-left */}
          <span className={`stock-badge ${isOutOfStock ? "out" : "in"}`}>
            {isOutOfStock
              ? "SOLD OUT"
              : `IN STOCK${product.stockQty ? ` (${product.stockQty})` : ""}`}
          </span>

          <img src={product.image} alt={product.name} />

          {/* wishlist on right */}
          <button
            className={`wishlist-btn ${inWishlist ? "active" : ""}`}
            onClick={toggleWishlist}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {inWishlist ? "❤️" : "♡"}
          </button>
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="brand">{product.company}</p>
          <p className="price">PKR {product.price.toLocaleString("en-PK")}</p>

          <button
            className={`add-cart-btn ${hovered || inCart ? "visible" : ""} ${
              isOutOfStock && !inCart ? "disabled" : ""
            }`}
            onClick={toggleCart}
            disabled={isOutOfStock && !inCart}
            title={isOutOfStock && !inCart ? "Out of Stock" : ""}
          >
            {inCart ? "Remove from Cart" : isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;