import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext"; // ← ADD THIS IMPORT
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist } =
    useContext(AppContext);
  const { addToast } = useToast(); // ← use the toast hook here

  const [hovered, setHovered] = useState(false);

  const inCart = cart.some((item) => item.id === product.id);
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const toggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
        className="product-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />

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
            className={`add-cart-btn ${hovered || inCart ? "visible" : ""}`}
            onClick={toggleCart}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;