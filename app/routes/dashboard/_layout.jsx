import DashNavbar from "./components/DashNavbar";
import SideBar from "./components/SideBar";
import "./style/style.css";
import { Outlet } from "@remix-run/react";
export default function Shared() {
  return (
    <div className="dashboard-container m-5">
      <DashNavbar />
      <SideBar />
      <div className="dashboardMainLeft rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}
