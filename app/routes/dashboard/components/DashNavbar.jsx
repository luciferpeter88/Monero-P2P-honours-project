import logo from "../../../pictures/logo.png";
import useStoredValue from "../components/useStoredValue";

export default function DashNavbar({ price }) {
  const colorType = useStoredValue("colourType");

  return (
    <div
      className="dashboardNav bg-third rounded-xl relative"
      style={{ backgroundColor: colorType?.tertiary }}
    >
      <div className="flex justify-center items-center gap-x-3">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h4 className="">Monero</h4>
        <span
          className="text-secondary font-semibold text-lg mt-1"
          style={{ color: colorType?.secondary }}
        >
          ${price}
        </span>
      </div>
    </div>
  );
}
