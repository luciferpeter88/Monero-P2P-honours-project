import DashNavbar from "./components/DashNavbar";
import SideBar from "./components/SideBar";
import "./style/style.css";
import { Outlet } from "@remix-run/react";
import { getCurrentMoneroPrice } from "../../utils/moneroPrice";
import { useLoaderData } from "@remix-run/react";
import { Provider } from "./context/Context";
import useStoredValue from "./components/useStoredValue";

export async function loader() {
  const currentPrice = await getCurrentMoneroPrice();
  console.log(currentPrice);
  return { currentPrice };
}
export default function Shared() {
  const data = useLoaderData();
  const colorType = useStoredValue("colourType");
  return (
    <Provider>
      <div
        className="dashboard-container m-5"
        style={{ backgroundColor: colorType?.primary }}
      >
        <DashNavbar price={data.currentPrice} />
        <SideBar />
        <div
          className="dashboardMainLeft rounded-lg"
          style={{ backgroundColor: colorType?.primary }}
        >
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}
