import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderProvider from "../contexts/header-context";

function AppLayout() {
  return (
    <HeaderProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="app-content">
          <Header />
          <Outlet />
        </main>
      </div>
    </HeaderProvider>
  );
}

export default AppLayout;
