import "./Header.css";
import { useHeader } from "../../contexts/header-context";
import { Search } from "lucide-react";

const Header = () => {
  const { title } = useHeader();
  return (
    <div className="header">
      <p>{title}</p>
      <div className="search">
        <Search
          width={24}
          height={24}
          color="#fff"
          style={{ marginLeft: "1.5rem" }}
        />
        <input type="text" placeholder="Search here..." />
      </div>
    </div>
  );
};

export default Header;
