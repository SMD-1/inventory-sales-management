import "./TopProducts.css";

const topProducts = [
  { name: "Redbull", rating: 5 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 4 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 4 },
  { name: "Bru", rating: 5 },
];

const TopProducts = () => {
  return (
    <div className="top-products-sidebar">
      <div className="sidebar-header">
        <h3>Top Products</h3>
      </div>
      <div className="products-list">
        {topProducts.map((product, index) => (
          <div className="product-item" key={index}>
            <span className="product-name">{product.name}</span>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`rating-pill ${i < product.rating ? "active" : ""}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
