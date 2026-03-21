import { useEffect, useState } from "react";
import { useHeader } from "../../contexts/header-context";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { ChevronRight, Info } from "lucide-react";

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
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  useEffect(() => {
    if (isModalOpen || isCSVModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isCSVModalOpen]);

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
                    <div className="availability-cell">
                      <span>{product.availability === "In-stock" ? "In- stock" : product.availability}</span>
                      <Info size={16} color="#00B2FF" />
                    </div>
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
            <button
              className="modal-btn"
              onClick={() => navigate("/product/add")}
            >
              individual product
            </button>
            <button
              className="modal-btn"
              onClick={() => {
                setIsModalOpen(false);
                setIsCSVModalOpen(true);
              }}
            >
              Multiple product
            </button>
          </div>
        </div>
      )}
      {isCSVModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCSVModalOpen(false)}>
          <div
            className="csv-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="csv-modal-header">
              <div className="title-group">
                <h3>CSV Upload</h3>
                <p>Add your documents here</p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsCSVModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="upload-area">
              <div className="upload-box-dashed">
                <div className="upload-icon">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1_2229)">
                      <path
                        d="M33.4417 3.12073H14.1743V11.1108H37.5567V7.23415C37.5567 4.96579 35.7107 3.12073 33.4417 3.12073Z"
                        fill="#00181B"
                        fill-opacity="0.25"
                      />
                      <path
                        d="M22.5352 12.3403H0V4.92636C0 2.20972 2.21068 0 4.92828 0H12.1336C12.8497 0 13.5396 0.150925 14.1664 0.434509C15.0418 0.828964 15.7939 1.47913 16.3213 2.3286L22.5352 12.3403Z"
                        fill="#00181B"
                      />
                      <path
                        d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H4.12111C1.84891 42 0 40.1527 0 37.8815V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z"
                        fill="#00181B"
                      />
                      <path
                        d="M42 14.0001V37.8815C42 40.1527 40.1511 42 37.8789 42H21V9.88062H37.8789C40.1511 9.88062 42 11.7286 42 14.0001Z"
                        fill="#00181B"
                      />
                      <path
                        d="M32.048 25.9398C32.048 32.0322 27.0919 36.9887 21.0001 36.9887C14.9083 36.9887 9.95215 32.0322 9.95215 25.9398C9.95215 19.8483 14.9083 14.8918 21.0001 14.8918C27.0919 14.8918 32.048 19.8483 32.048 25.9398Z"
                        fill="white"
                      />
                      <path
                        d="M32.0479 25.9398C32.0479 32.0322 27.0918 36.9887 21 36.9887V14.8918C27.0918 14.8918 32.0479 19.8483 32.0479 25.9398Z"
                        fill="#00181B"
                        fill-opacity="0.25"
                      />
                      <path
                        d="M24.561 26.0754C24.3306 26.2705 24.0483 26.3657 23.7685 26.3657C23.4183 26.3657 23.0703 26.2173 22.8268 25.9283L22.2304 25.2214V29.8494C22.2304 30.5288 21.6793 31.0799 21 31.0799C20.3207 31.0799 19.7695 30.5288 19.7695 29.8494V25.2214L19.1732 25.9283C18.7342 26.4477 17.9584 26.514 17.439 26.0754C16.9199 25.6373 16.8532 24.8612 17.2913 24.3418L19.7269 21.4544C20.0444 21.0788 20.5078 20.8629 21 20.8629C21.4922 20.8629 21.9555 21.0788 22.2731 21.4544L24.7087 24.3418C25.1467 24.8612 25.0801 25.6373 24.561 26.0754Z"
                        fill="#00181B"
                      />
                      <path
                        d="M24.561 26.0754C24.3306 26.2705 24.0483 26.3657 23.7686 26.3657C23.4183 26.3657 23.0703 26.2173 22.8268 25.9283L22.2305 25.2214V29.8494C22.2305 30.5288 21.6793 31.0799 21 31.0799V20.8629C21.4922 20.8629 21.9555 21.0788 22.2731 21.4544L24.7087 24.3418C25.1467 24.8612 25.0801 25.6373 24.561 26.0754Z"
                        fill="#00181B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_2229">
                        <rect width="42" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p>Drag your file(s) to start uploading</p>
                <div className="divider">
                  <span></span>
                  <p>OR</p>
                  <span></span>
                </div>
                <button className="browse-files-btn">Browse files</button>
              </div>
            </div>
            <div className="csv-file">
              <div className="csv-file-left">
                <div className="csv-file-logo">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.7499 3.14634V9.91659H5.97967C6.11422 9.65507 6.28867 9.4161 6.49675 9.20825L12.0416 3.66342C12.2493 3.45484 12.4883 3.28132 12.7499 3.14634ZM15.5833 2.83325V9.91659C15.5833 10.668 15.2847 11.3887 14.7534 11.9201C14.222 12.4514 13.5014 12.7499 12.7499 12.7499H5.66659C4.91514 12.7499 4.19447 13.0484 3.66312 13.5798C3.13176 14.1111 2.83325 14.8318 2.83325 15.5833V25.4999C2.83325 26.2514 3.13176 26.972 3.66312 27.5034C4.19447 28.0347 4.91514 28.3333 5.66659 28.3333C5.66659 29.0847 5.9651 29.8054 6.49645 30.3367C7.0278 30.8681 7.74847 31.1666 8.49992 31.1666H25.4999C26.2514 31.1666 26.972 30.8681 27.5034 30.3367C28.0347 29.8054 28.3333 29.0847 28.3333 28.3333C29.0847 28.3333 29.8054 28.0347 30.3367 27.5034C30.8681 26.972 31.1666 26.2514 31.1666 25.4999V15.5833C31.1666 14.8318 30.8681 14.1111 30.3367 13.5798C29.8054 13.0484 29.0847 12.7499 28.3333 12.7499V5.66659C28.3333 4.91514 28.0347 4.19447 27.5034 3.66312C26.972 3.13176 26.2514 2.83325 25.4999 2.83325H15.5833ZM17.0254 15.3396C16.1874 15.3244 15.3747 15.6272 14.751 16.1871C14.1273 16.7469 13.7388 17.5223 13.6637 18.3571V18.3684C13.5932 19.2221 13.8589 20.0695 14.404 20.7302C14.949 21.3909 15.7305 21.8127 16.582 21.9058L17.3399 21.9894C17.4039 21.9966 17.4682 21.9995 17.5326 21.9979C17.5958 21.996 17.6584 22.0097 17.7151 22.0377C17.7717 22.0657 17.8206 22.1073 17.8574 22.1586C17.8942 22.21 17.9178 22.2696 17.9261 22.3323C17.9345 22.3949 17.9273 22.4586 17.9052 22.5178L17.8938 22.5462L17.8683 22.6085L17.7578 22.6368C17.6185 22.6572 17.4779 22.6671 17.3371 22.6666H15.7363C15.3605 22.6666 15.0002 22.8158 14.7345 23.0815C14.4688 23.3472 14.3196 23.7075 14.3196 24.0833C14.3196 24.459 14.4688 24.8193 14.7345 25.085C15.0002 25.3507 15.3605 25.4999 15.7363 25.4999H17.3371C17.9278 25.4999 18.6008 25.4291 19.2128 25.1047C19.8786 24.7533 20.3178 24.1867 20.5628 23.4982C20.7421 23.0133 20.802 22.4924 20.7374 21.9796C20.6728 21.4667 20.4857 20.9769 20.1918 20.5517C19.8978 20.1264 19.5058 19.7783 19.0489 19.5366C18.5919 19.2949 18.0835 19.1668 17.5666 19.1632L16.8894 19.0895C16.7727 19.077 16.6653 19.0196 16.59 18.9295C16.5147 18.8394 16.4773 18.7236 16.4857 18.6064C16.4977 18.4862 16.5545 18.3749 16.6448 18.2946C16.7351 18.2143 16.8522 18.1709 16.973 18.1729L18.3047 18.2013C18.6804 18.2093 19.0439 18.0678 19.3153 17.8079C19.5867 17.5479 19.7437 17.1908 19.7518 16.815C19.7599 16.4393 19.6184 16.0758 19.3584 15.8044C19.0984 15.533 18.7413 15.376 18.3656 15.3679L17.0297 15.3396H17.0254ZM28.2638 17.4391C28.3803 17.0818 28.3501 16.6928 28.1798 16.3578C28.0095 16.0228 27.7131 15.7691 27.3558 15.6527C26.9984 15.5362 26.6095 15.5664 26.2745 15.7367C25.9395 15.907 25.6858 16.2034 25.5693 16.5608L24.7618 19.0357L24.0223 16.5905C23.9067 16.2395 23.6584 15.9476 23.3305 15.7771C23.0026 15.6066 22.6211 15.5709 22.2673 15.6778C21.9135 15.7846 21.6155 16.0255 21.4368 16.349C21.2581 16.6725 21.2129 17.053 21.3108 17.4093L23.3551 24.1711C23.4423 24.4598 23.6193 24.7131 23.8604 24.8942C24.1015 25.0753 24.3941 25.1748 24.6957 25.1781C24.9972 25.1814 25.2919 25.0884 25.537 24.9127C25.782 24.7369 25.9646 24.4875 26.0581 24.2008L28.2638 17.4391ZM8.76767 18.6858C8.93989 18.5138 9.17316 18.4171 9.4165 18.4166H10.8587C11.2344 18.4166 11.5947 18.2673 11.8604 18.0017C12.1261 17.736 12.2753 17.3756 12.2753 16.9999C12.2753 16.6242 12.1261 16.2639 11.8604 15.9982C11.5947 15.7325 11.2344 15.5833 10.8587 15.5833H9.4165C8.42196 15.5833 7.46816 15.9783 6.76491 16.6816C6.06167 17.3848 5.66659 18.3386 5.66659 19.3332V21.75C5.66659 22.7445 6.06167 23.6984 6.76491 24.4016C7.46816 25.1048 8.42196 25.4999 9.4165 25.4999H10.8587C11.2344 25.4999 11.5947 25.3507 11.8604 25.085C12.1261 24.8193 12.2753 24.459 12.2753 24.0833C12.2753 23.7075 12.1261 23.3472 11.8604 23.0815C11.5947 22.8158 11.2344 22.6666 10.8587 22.6666H9.4165C9.17341 22.6666 8.94027 22.57 8.76838 22.3981C8.59649 22.2262 8.49992 21.9931 8.49992 21.75V19.3332C8.49992 19.0895 8.59484 18.8572 8.76767 18.6858Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="csv-file-name">
                  <p>product list.csv</p>
                  <p>1.5MB</p>
                </div>
              </div>
              <button className="delete-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                    fill="#858585"
                  />
                </svg>
              </button>
            </div>
            <div className="csv-modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsCSVModalOpen(false)}
              >
                Cancel
              </button>
              <button className="next-btn">
                Next
                <span>
                  <ChevronRight width={18} height={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
