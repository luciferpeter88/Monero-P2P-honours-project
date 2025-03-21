import DashNavbar from "./components/DashNavbar";
import SideBar from "./components/SideBar";
import "./style/style.css";
import { Outlet } from "@remix-run/react";
import { getCurrentMoneroPrice } from "../../utils/moneroPrice";
import { useLoaderData, redirect } from "@remix-run/react";
import { Provider } from "./context/Context";
import useStoredValue from "./components/useStoredValue";
import { getSession } from "../../utils/session.server";
import prisma from "../../../prisma/prisma";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");

  if (!userIdD) {
    return redirect("/");
  }
  console.log(userIdD);

  const user = await prisma.user.findUnique({
    where: { id: userIdD },
    select: { imageSrc: true },
  });
  const currentPrice = await getCurrentMoneroPrice();
  return { currentPrice, user };
}
export default function Shared() {
  const data = useLoaderData();
  const colorType = useStoredValue("colourType");
  console.log(data);
  return (
    <Provider>
      <div
        className="dashboard-container m-5"
        style={{ backgroundColor: colorType?.primary }}
      >
        <DashNavbar price={data.currentPrice} />
        <SideBar imageSrc={data?.user.imageSrc} />
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
