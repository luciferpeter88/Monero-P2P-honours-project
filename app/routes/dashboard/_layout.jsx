import DashNavbar from "./components/DashNavbar";
import SideBar from "./components/SideBar";
import "./style/style.css";
import { Outlet } from "@remix-run/react";
import { getCurrentMoneroPrice } from "../../utils/moneroPrice";
import { useLoaderData } from "@remix-run/react";
import { Provider } from "./context/Context";

export async function loader() {
  const currentPrice = await getCurrentMoneroPrice();
  console.log(currentPrice);
  return { currentPrice };
}
export default function Shared() {
  const data = useLoaderData();
  return (
    <Provider>
      <div className="dashboard-container m-5">
        <DashNavbar price={data.currentPrice} />
        <SideBar />
        <div className="dashboardMainLeft rounded-lg">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}
