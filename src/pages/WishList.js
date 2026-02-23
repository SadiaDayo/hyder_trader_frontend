import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import "../styles/WishList.css";

const Wishlist = () => {
  const { wishlist } = useContext(AppContext);

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items saved. <a href="/shop">Shop Now</a></p>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
