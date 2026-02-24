import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext"; // ← ADD THIS IMPORT
import { products } from "../pages/Products"; // or "../data/products" – adjust path if needed
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addReview, reviews = {} } = useContext(AppContext);
  const { addToast } = useToast(); // ← toast hook

  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const productReviews = reviews[Number(id)] || [];

  const averageRating =
    productReviews.length > 0
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
      : "—";

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    addToast(
      `Added ${quantity} × ${product.name} to cart`,
      "success",
      3500
    );
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      addToast("Please select a rating", "warning", 3000);
      return;
    }
    if (!comment.trim()) {
      addToast("Please write a review comment", "warning", 3000);
      return;
    }

    addReview(Number(id), {
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    });

    setRating(0);
    setComment("");

    addToast("Thank you for your review!", "success", 4000);
  };

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-content">
          <h1>{product.name}</h1>

          <div className="meta">
            <span>
              Brand: <strong>{product.company || "—"}</strong>
            </span>
            <span>
              Category: <strong>{product.category || "—"}</strong>
            </span>
          </div>

          <div className="price-rating">
            <div className="price">
              PKR {product.price.toLocaleString("en-PK")}
            </div>
            <div className="rating-display">
              {averageRating} ★ {productReviews.length} reviews
            </div>
          </div>

          <p className="description">
            {product.description || "No description available."}
          </p>

          <div className="actions">
            <div className="quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews ({productReviews.length})</h2>

        <div className="review-form">
          <h3>Write a Review</h3>

          <div className="rating-select">
            <label>Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={0}>Select...</option>
              <option value={5}>5 ★★★★★</option>
              <option value={4}>4 ★★★★☆</option>
              <option value={3}>3 ★★★☆☆</option>
              <option value={2}>2 ★★☆☆☆</option>
              <option value={1}>1 ★☆☆☆☆</option>
            </select>
          </div>

          <textarea
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <button onClick={handleReviewSubmit} className="submit-review">
            Submit Review
          </button>
        </div>

        <div className="reviews-list">
          {productReviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            productReviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <span className="stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="date">{review.date || "—"}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;