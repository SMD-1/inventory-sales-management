import { House, Settings, CircleUserRound, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../utils/api.js";
import { clearToken } from "../../utils/auth.js";
import "./sidebar.css";

const Sidebar = () => {
  const [user, setUser] = useState({ name: "User" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await get("/api/auth/me");
        if (response?.data?.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">
          <img src="/logo.svg" alt="Company Logo" />
        </div>
        <ul>
          <li>
            <NavLink className="sidebar-link" end to="/">
              <House width={16} height={16} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="sidebar-link" to="/product">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 7.5H10.3L8.9 10.125H6.1L4.7 7.5H0.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.915 1.47125L0.5 7.5V12.75C0.5 13.2141 0.6475 13.6592 0.91005 13.9874C1.1726 14.3156 1.5287 14.5 1.9 14.5H13.1C13.4713 14.5 13.8274 14.3156 14.0899 13.9874C14.3525 13.6592 14.5 13.2141 14.5 12.75V7.5L12.085 1.47125C11.9691 1.17969 11.7904 0.934325 11.5691 0.762745C11.3477 0.591165 11.0925 0.500173 10.832 0.5H4.168C3.90754 0.500173 3.65228 0.591165 3.43093 0.762745C3.20958 0.934325 3.0309 1.17969 2.915 1.47125Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink className="sidebar-link" to="/invoice">
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_1377)">
                  <path
                    d="M10.125 4.125H4.875M10.125 7.625H4.875M10.125 11.125H6.625M1.375 0.625H13.625V16.375L12.722 15.6015C12.4048 15.3297 12.0009 15.1803 11.5832 15.1803C11.1655 15.1803 10.7615 15.3297 10.4444 15.6015L9.54138 16.375L8.63925 15.6015C8.32202 15.3294 7.91791 15.1799 7.5 15.1799C7.08209 15.1799 6.67798 15.3294 6.36075 15.6015L5.45863 16.375L4.55563 15.6015C4.23846 15.3297 3.83452 15.1803 3.41681 15.1803C2.9991 15.1803 2.59517 15.3297 2.278 15.6015L1.375 16.375V0.625Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_1377">
                    <rect width="15" height="17" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Invoice
            </NavLink>
          </li>
          <li>
            <NavLink className="sidebar-link" to="/statistics">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.26375 10.9375H4.13875V7H3.26375V10.9375ZM9.86125 10.9375H10.7362V2.625H9.86125V10.9375ZM6.5625 10.9375H7.4375V8.75H6.5625V10.9375ZM6.5625 7H7.4375V5.25H6.5625V7ZM1.414 14C1.01092 14 0.674625 13.8652 0.405125 13.5957C0.135625 13.3262 0.000583333 12.9897 0 12.586V1.414C0 1.01092 0.135041 0.674625 0.405125 0.405125C0.675208 0.135625 1.0115 0.000583333 1.414 0H12.5869C12.9894 0 13.3257 0.135041 13.5957 0.405125C13.8658 0.675208 14.0006 1.0115 14 1.414V12.5869C14 12.9894 13.8652 13.3257 13.5957 13.5957C13.3262 13.8658 12.9897 14.0006 12.586 14H1.414ZM1.414 13.125H12.5869C12.721 13.125 12.8444 13.069 12.957 12.957C13.0696 12.845 13.1256 12.7213 13.125 12.586V1.414C13.125 1.27925 13.069 1.15558 12.957 1.043C12.845 0.930416 12.7213 0.874417 12.586 0.875H1.414C1.27925 0.875 1.15558 0.931 1.043 1.043C0.930416 1.155 0.874417 1.27867 0.875 1.414V12.5869C0.875 12.721 0.931 12.8444 1.043 12.957C1.155 13.0696 1.27837 13.1256 1.41312 13.125"
                  fill="white"
                />
              </svg>
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink className="sidebar-link" to="/settings">
              <Settings width={16} height={16} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile">
        <div
          className="profile-img"
          style={{ display: "flex", alignItems: "center" }}
        >
          <CircleUserRound size={40} color="#fff" />
        </div>
        <p
          title={user.name}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100px",
            marginRight: "auto",
          }}
        >
          {user.name}
        </p>
        <LogOut
          size={20}
          color="#fff"
          style={{ cursor: "pointer", marginLeft: "10px", flexShrink: 0 }}
          onClick={handleLogout}
          title="Logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;
