import { Link, useLocation } from "@remix-run/react";
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
  const { pathname } = useLocation();
  const primary = "bg-primary border-l-4 border-l-secondary text-secondary";
  const secondary = "bg-third";
  const isDashboard = pathname === "/dashboard" ? primary : secondary;
  const isSend = pathname === "/dashboard/send" ? primary : secondary;
  const isReceive = pathname === "/dashboard/receive" ? primary : secondary;
  const isAddressBook =
    pathname === "/dashboard/addressbook" ? primary : secondary;
  const isTransactions =
    pathname === "/dashboard/transactions" ? primary : secondary;
  const isMarket = pathname === "/dashboard/market" ? primary : secondary;
  const isMessages = pathname === "/dashboard/messages" ? primary : secondary;
  const isSettings = pathname === "/dashboard/settings" ? primary : secondary;
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
        <NavigateTo
          text="Account"
          icon={<LuHouse />}
          NavigateTo="/dashboard"
          style={isDashboard}
        />
        <NavigateTo
          text="Send"
          icon={<LuArrowUpFromLine />}
          NavigateTo="/dashboard/send"
          style={isSend}
        />
        <NavigateTo
          text="Receive"
          icon={<LuArrowDownToLine />}
          NavigateTo="/dashboard/receive"
          style={isReceive}
        />
        <NavigateTo
          text="Address Book"
          icon={<TbAddressBook />}
          NavigateTo="/dashboard/addressbook"
          style={isAddressBook}
        />
        <NavigateTo
          text="Transactions"
          icon={<MdOutlineHistory />}
          NavigateTo="/dashboard/transactions"
          style={isTransactions}
        />
        <NavigateTo
          text="Market"
          icon={<FaExchangeAlt />}
          NavigateTo="/dashboard/market"
          style={isMarket}
        />
        <NavigateTo
          text="Messages"
          icon={<TiMessages />}
          NavigateTo="/dashboard/messages"
          style={isMessages}
        />
        <NavigateTo
          text="Settings"
          icon={<IoMdSettings />}
          NavigateTo="/dashboard/settings"
          style={isSettings}
        />
      </div>
    </div>
  );
}

function NavigateTo({ text, icon, NavigateTo, style }) {
  return (
    <Link
      to={NavigateTo}
      className="text-white font-medium text-sm flex items-center justify-center"
    >
      <div
        className={`py-3 pl-2 w-[90%] rounded-lg flex items-center gap-x-2 ${style}`}
      >
        {icon}
        {text}
      </div>
    </Link>
  );
}
