import { Link } from "@remix-run/react";
import moneroCard from "../components/picture/card-background2.svg";
import { LuHouse } from "react-icons/lu";
import { LuArrowUpFromLine } from "react-icons/lu";
import { LuArrowDownToLine } from "react-icons/lu";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlineHistory } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";

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
        <NavigateTo text="Account" icon={<LuHouse />} />
        <NavigateTo text="Send" icon={<LuArrowUpFromLine />} />
        <NavigateTo text="Receive" icon={<LuArrowDownToLine />} />
        <NavigateTo text="Address Book" icon={<TbAddressBook />} />
        <NavigateTo text="Transactions" icon={<MdOutlineHistory />} />
        <NavigateTo text="Market" icon={<FaExchangeAlt />} />
        <NavigateTo text="Messages" icon={<TiMessages />} />
        <NavigateTo text="Settings" icon={<IoMdSettings />} />
      </div>
    </div>
  );
}

function NavigateTo({ text, icon }) {
  return (
    <Link
      to="/"
      className="text-white font-medium text-sm flex items-center justify-center"
    >
      <div className=" py-3 pl-2  border-primary hover:bg-primary hover:border-l-4 hover:border-l-secondary hover:text-secondary w-[90%] rounded-lg flex items-center gap-x-2">
        {icon}
        {text}
      </div>
    </Link>
  );
}
