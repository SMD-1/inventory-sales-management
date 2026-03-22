import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderProvider from "../contexts/header-context";

function AppLayout() {
  const location = useLocation();
  const isSettings = location.pathname === "/settings";

  return (
    <HeaderProvider>
      <div className="app-layout">
        <Sidebar />
        <main className={`app-content ${isSettings ? "is-settings" : ""}`}>
          <div className={isSettings ? "settings-header-wrapper" : ""}>
            <Header />
          </div>
          <Outlet />
        </main>
      </div>
    </HeaderProvider>
  );
}

export default AppLayout;
