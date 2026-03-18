import { useEffect, useState } from "react";
import { useHeader } from "../../contexts/header-context";
import { useNavigate } from "react-router-dom";
import "./product.css";

const overallInventory = [
  {
    name: "Categories",
    items: [
      {
        name: "Last 7 days",
        value: 12,
      },
    ],
  },
  {
    name: "Total Products",
    items: [
      {
        value: 868,
        name: "Last 7 days",
      },
      {
        name: "Amount",
        value: 25000,
      },
    ],
  },
  {
    name: "Top Sellings",
    items: [
      {
        name: "Last 7 days",
        value: 12,
      },
      {
        name: "Revenue",
        value: 2500,
      },
    ],
  },
  {
    name: "Low Stocks",
    items: [
      {
        name: "Low Stock",
        value: 12,
      },
      {
        name: "Out of Stock",
        value: 2,
      },
    ],
  },
];

const productsDummyData = [
  {
    name: "Maggi",
    price: "₹430",
    quantity: "43 Packets",
    thresholdValue: 12,
    expiryDate: "11/12/25",
    availability: "In-stock",
  },
  {
    name: "Bru",
    price: "₹257",
    quantity: "100 gm",
    thresholdValue: 5,
    expiryDate: "21/12/25",
    availability: "Out of stock",
  },
  {
    name: "Red Bull",
    price: "₹405",
    quantity: "36 L",
    thresholdValue: 9,
    expiryDate: "5/12/25",
    availability: "In-stock",
  },
  {
    name: "Bourn Vita",
    price: "₹502",
    quantity: "14 mg",
    thresholdValue: 6,
    expiryDate: "8/12/25",
    availability: "Out of stock",
  },
  {
    name: "Horlicks",
    price: "₹530",
    quantity: "5 Kg",
    thresholdValue: 5,
    expiryDate: "9/1/25",
    availability: "In-stock",
  },
  {
    name: "Harpic",
    price: "₹605",
    quantity: "10 ml",
    thresholdValue: 5,
    expiryDate: "9/1/25",
    availability: "In-stock",
  },
  {
    name: "Ariel",
    price: "₹408",
    quantity: "23 L",
    thresholdValue: 7,
    expiryDate: "15/12/25",
    availability: "Out of stock",
  },
  {
    name: "Scotch Brite",
    price: "₹359",
    quantity: "43 Packets",
    thresholdValue: 8,
    expiryDate: "6/6/25",
    availability: "In-stock",
  },
  {
    name: "Coca cola",
    price: "₹205",
    quantity: "41 ml",
    thresholdValue: 10,
    expiryDate: "11/11/25",
    availability: "Low stock",
  },
];

const Product = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  return (
    <div className="product">
      <div className="overall">
        <div className="title">Overall Inventory</div>
        <div className="overall-details">
          {overallInventory.map((item, index) => (
            <div className="details" key={index}>
              <h2>{item.name}</h2>
              <div className="items">
                {item.items.map((item, index) => (
                  <div className="item" key={index}>
                    <p className="amount">{item.value}</p>
                    <p className="name">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="products-list">
        <div className="product-header">
          <p>Products</p>
          <button onClick={() => setIsModalOpen(true)}>Add Product</button>
        </div>
        <div className="list">
          <table className="products-table">
            <thead>
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Threshold Value</th>
                <th>Expiry Date</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {productsDummyData.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.thresholdValue}</td>
                  <td>{product.expiryDate}</td>
                  <td
                    className={
                      product.availability === "In-stock"
                        ? "in-stock"
                        : product.availability === "Out of stock"
                          ? "out-of-stock"
                          : "low-stock"
                    }
                  >
                    {product.availability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="page-btn">Previous</button>
            <span>Page 1 of 10</span>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-btn" onClick={() => navigate("/product/add")}>
              individual product
            </button>
            <button className="modal-btn">Multiple product</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
