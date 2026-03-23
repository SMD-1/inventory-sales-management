import React, { useState } from "react";
import { post } from "../../utils/api.js";
import toast from "react-hot-toast";

const BuyProductPopup = ({ product, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBuy = async () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (qty > product.quantity) {
      toast.error("Insufficient stock available");
      return;
    }

    try {
      setIsSubmitting(true);
      await post(`/api/products/buy/${product._id}`, { quantity: qty });
      toast.success("Purchase successful! Invoice generated.");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to process purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    // Allow only numeric input
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setQuantity(val);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="buy-product-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Simulate Buy Product</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button 
          className="buy-btn" 
          onClick={handleBuy}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default BuyProductPopup;
