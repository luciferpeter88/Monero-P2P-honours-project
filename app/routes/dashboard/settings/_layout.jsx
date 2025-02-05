import { Outlet } from "@remix-run/react";
import Tab from "./components/Tab";
export default function Shared() {
  return (
    <div className="mt-5 ml-5">
      <Tab />
      <Outlet />
    </div>
  );
}
