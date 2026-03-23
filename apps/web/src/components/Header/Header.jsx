import "./Header.css";
import { useHeader } from "../../contexts/header-context";
import { Search, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { title } = useHeader();
  const navigate = useNavigate();
  const location = useLocation();

  const showSearch = location.pathname === "/product" || location.pathname === "/invoice";

  return (
    <div className="header">
      <div className="header-mobile-logo">
        <img src="/logo.svg" alt="Company Logo" />
      </div>
      <p className="header-title">{title}</p>
      {showSearch && (
        <div className="search">
          <Search
            width={24}
            height={24}
            color="#fff"
            style={{ marginLeft: "1.5rem" }}
          />
          <input type="text" placeholder="Search here..." />
        </div>
      )}
      <div className="header-mobile-settings">
        <Settings onClick={() => navigate("/settings")} width={24} height={24} color="#fff" />
      </div>
    </div>
  );
};

export default Header;
