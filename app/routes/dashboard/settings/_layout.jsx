import { Outlet } from "@remix-run/react";
import Tab from "./components/Tab";
import useStoredValue from "../components/useStoredValue";

export default function Shared() {
  const fontType = useStoredValue("fontType");
  return (
    <div
      className="mt-5 ml-5"
      style={{ fontFamily: fontType ? fontType : "Inter" }}
    >
      <Tab />
      <Outlet />
    </div>
  );
}
