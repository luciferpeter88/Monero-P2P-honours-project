import { Link } from "@remix-run/react";
import moneroCard from "../components/picture/card-background2.svg";
export default function SideBar() {
  return (
    <div className="dashboardSidebar bg-third flex flex-col">
      <div className="flex flex-col items-center">
        <img src={moneroCard} alt="card" className="w-[85%]" />
      </div>
      <div className="flex flex-col  mt-8">
        <NavigateTo text="Account" />
        <NavigateTo text="Send" />
        <NavigateTo text="Receive" />
        <NavigateTo text="Address Book" />
        <NavigateTo text="Transactions" />
        <NavigateTo text="Market" />
        <NavigateTo text="Messages" />
        <NavigateTo text="Settings" />
      </div>
    </div>
  );
}

function NavigateTo({ text }) {
  return (
    <Link to="/" className="text-white font-medium">
      <div className="ml-6 py-4 pl-2 border-b-2 border-primary hover:bg-primary hover:border-l-2 hover:border-l-secondary hover:text-secondary">
        {text}
      </div>
    </Link>
  );
}
