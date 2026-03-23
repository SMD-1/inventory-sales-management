import { useEffect, useState, useRef } from "react";
import { useHeader } from "../../contexts/header-context";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api.js";
import toast from "react-hot-toast";
import "./addProduct.css";

const AddProduct = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    threshold: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name,
        productId: formData.productId,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        expiryDate: formData.expiryDate || undefined,
        threshold: Number(formData.threshold),
        imageUrl: imagePreview || "",
      };

      await post("/api/products", payload);
      toast.success("Product added successfully!");
      navigate("/product");
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="breadcrumb">
        <span>Add Product</span> &gt;{" "}
        <span className="current">Individual Product</span>
      </div>
      <div className="add-product-container">
        <h2 className="form-title">New Product</h2>

        <div className="form-group image-upload-group">
          <div
            className="image-upload-box"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="upload-placeholder">
            {!imagePreview && (
              <>
                <p>Drag image here</p>
                <p>or</p>
              </>
            )}
            <button
              className="browse-btn"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? "Change image" : "Browse image"}
            </button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label>Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              placeholder="Enter product ID"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select product category</option>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter product quantity"
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="Enter product unit"
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="Enter expiry date"
            />
          </div>
          <div className="form-group">
            <label>Threshold Value</label>
            <input
              type="number"
              name="threshold"
              value={formData.threshold}
              onChange={handleInputChange}
              placeholder="Enter threshold value"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            className="discard-btn"
            type="button"
            onClick={() => navigate("/product")}
          >
            Discard
          </button>
          <button
            className="submit-btn"
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
