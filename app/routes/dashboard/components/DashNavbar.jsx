import logo from "../../../pictures/logo.png";
export default function DashNavbar({ price }) {
  return (
    <div className="dashboardNav bg-third rounded-xl relative">
      <div className="flex justify-center items-center gap-x-3">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h4 className="">Monero</h4>
        <span className="text-secondary font-semibold text-lg mt-1">
          ${price}
        </span>
      </div>
    </div>
  );
}
