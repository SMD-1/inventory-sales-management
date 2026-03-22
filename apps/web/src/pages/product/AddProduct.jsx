import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";
import { useNavigate } from "react-router-dom";
import "./addProduct.css";

const AddProduct = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  return (
    <div className="add-product-page">
      <div className="breadcrumb">
        <span>Add Product</span> &gt; <span className="current">Individual Product</span>
      </div>
      <div className="add-product-container">
        <h2 className="form-title">New Product</h2>
        
        <div className="form-group image-upload-group">
          <div className="image-upload-box"></div>
            <div className="upload-placeholder">
              <p>Drag image here</p>
              <p>or</p>
              <button className="browse-btn">Browse image</button>
            </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label>Product ID</label>
            <input type="text" placeholder="Enter product ID" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select>
              <option value="">Select product category</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" placeholder="Enter price" />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="text" placeholder="Enter product quantity" />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input type="text" placeholder="Enter product unit" />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="text" placeholder="Enter expiry date" />
          </div>
          <div className="form-group">
            <label>Threshold Value</label>
            <input type="text" placeholder="Enter threshold value" />
          </div>
        </div>

        <div className="form-actions">
          <button className="discard-btn" type="button" onClick={() => navigate("/product")}>Discard</button>
          <button className="submit-btn" type="button">Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
