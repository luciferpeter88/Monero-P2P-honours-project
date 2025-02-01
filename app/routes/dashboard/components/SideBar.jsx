import { Link } from "@remix-run/react";
import moneroCard from "../components/picture/card-background2.svg";
export default function SideBar() {
  return (
    <div className="dashboardSidebar flex flex-col mt-5 rounded-xl">
      {/* <div className="flex flex-col items-center bg-third pt-10">
        <img src={moneroCard} alt="card" className="w-[85%]" />
        <h1>Profile Picture</h1>
      </div> */}
      <div className="flex flex-col gap-y-2 bg-third rounded-xl py-5">
        <div className="flex  bg-third justify-center items-center pb-5">
          <div className="w-[90%] pl-2 border-b border-primary pb-2">
            <h1>Profile Picture</h1>
          </div>
        </div>
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
    <Link
      to="/"
      className="text-white font-medium text-sm flex items-center justify-center"
    >
      <div className=" py-3 pl-2  border-primary hover:bg-primary hover:border-l-4 hover:border-l-secondary hover:text-secondary w-[90%] rounded-lg">
        {text}
      </div>
    </Link>
  );
}
