import logo from "../../../pictures/logo.png";
export default function DashNavbar() {
  return (
    <div className="dashboardNav bg-third rounded-xl">
      <div className="flex justify-center items-center gap-x-3">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h4 className="">Monero</h4>
      </div>
    </div>
  );
}
