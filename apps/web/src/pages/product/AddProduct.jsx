import { useEffect, useState, useRef } from "react";
import { useHeader } from "../../contexts/header-context";
import { useNavigate } from "react-router-dom";
import { post, get } from "../../utils/api.js";
import { getToken } from "../../utils/auth.js";
import toast from "react-hot-toast";
import { IKContext, IKUpload } from "imagekitio-react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [ikConfig, setIkConfig] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTitle("Product");
    const fetchIkConfig = async () => {
      try {
        const res = await get("/api/imagekit/config");
        setIkConfig(res.data);
      } catch (err) {
        console.error("Failed to fetch ImageKit config", err);
      }
    };
    fetchIkConfig();
  }, [setTitle]);

  const authenticator = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/imagekit/auth`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        {ikConfig ? (
          <IKContext 
            publicKey={ikConfig.publicKey} 
            urlEndpoint={ikConfig.urlEndpoint} 
            authenticator={authenticator}
          >
            <div className="form-group image-upload-group" style={{ position: "relative" }}>
              <div className="image-upload-box">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Upload preview" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "8px" }} 
                  />
                )}
              </div>
              <div className="upload-placeholder" style={{ pointerEvents: "none" }}>
                {!imagePreview && (
                  <>
                    <p>Drag image here</p>
                    <p>or</p>
                  </>
                )}
                <button className="browse-btn" style={{ pointerEvents: "none" }}>
                  {isUploading ? "Uploading..." : (imagePreview ? "Change image" : "Browse image")}
                </button>
              </div>
              
              <IKUpload
                fileName="product-image.jpg"
                folder="/product-inventory"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer"
                }}
                onUploadStart={() => setIsUploading(true)}
                onError={(err) => {
                  setIsUploading(false);
                  toast.error("Image upload failed");
                  console.error(err);
                }}
                onSuccess={(res) => {
                  setIsUploading(false);
                  setImagePreview(res.url);
                  toast.success("Image uploaded successfully");
                }}
              />
            </div>
          </IKContext>
        ) : (
          <div className="form-group image-upload-group">Loading uploader...</div>
        )}

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
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
            />
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
