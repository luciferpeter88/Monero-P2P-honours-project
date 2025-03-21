import { Link, useLocation } from "@remix-run/react";
import { LuHouse } from "react-icons/lu";
import { LuArrowUpFromLine } from "react-icons/lu";
import { LuArrowDownToLine } from "react-icons/lu";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlineHistory } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import useStoredValue from "../components/useStoredValue";

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
  const colorType = useStoredValue("colourType");

  const custom = {
    backgroundColor: colorType?.primary,
    borderLeftColor: colorType?.secondary,
    color: colorType?.tertiary,
  };
  const custom2 = {
    backgroundColor: colorType?.tertiary,
  };

  const isDashboardCustom = pathname === "/dashboard" ? custom : custom2;
  const isSendCustom = pathname === "/dashboard/send" ? custom : custom2;
  const isReceiveCustom = pathname === "/dashboard/receive" ? custom : custom2;
  const isAddressBookCustom =
    pathname === "/dashboard/addressbook" ? custom : custom2;
  const isTransactionsCustom =
    pathname === "/dashboard/transactions" ? custom : custom2;
  const isMarketCustom = pathname === "/dashboard/market" ? custom : custom2;
  const isMessagesCustom =
    pathname === "/dashboard/messages" ? custom : custom2;
  const isSettingsCustom =
    pathname === "/dashboard/settings" ? custom : custom2;
  // console.log("imageSrc", imageSrc);
  return (
    <div className="dashboardSidebar flex flex-col mt-5 rounded-xl">
      <div
        className="flex flex-col gap-y-2 bg-third rounded-xl py-5"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <div
          className="flex  bg-third justify-center items-center pb-5"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <div className="w-[90%] pl-2 border-b border-primary pb-2">
            {/* <img
              src={imageSrc?.imageSrc}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
              alt="profile"
            /> */}
          </div>
        </div>
        <NavigateTo
          text="Account"
          icon={<LuHouse />}
          NavigateTo="/dashboard"
          style={isDashboard}
          customStyle={isDashboardCustom}
        />
        <NavigateTo
          text="Send"
          icon={<LuArrowUpFromLine />}
          NavigateTo="/dashboard/send"
          style={isSend}
          customStyle={isSendCustom}
        />
        <NavigateTo
          text="Receive"
          icon={<LuArrowDownToLine />}
          NavigateTo="/dashboard/receive"
          style={isReceive}
          customStyle={isReceiveCustom}
        />
        <NavigateTo
          text="Address Book"
          icon={<TbAddressBook />}
          NavigateTo="/dashboard/addressbook"
          style={isAddressBook}
          customStyle={isAddressBookCustom}
        />
        <NavigateTo
          text="Transactions"
          icon={<MdOutlineHistory />}
          NavigateTo="/dashboard/transactions"
          style={isTransactions}
          customStyle={isTransactionsCustom}
        />
        <NavigateTo
          text="Market"
          icon={<FaExchangeAlt />}
          NavigateTo="/dashboard/market"
          style={isMarket}
          customStyle={isMarketCustom}
        />
        <NavigateTo
          text="Messages"
          icon={<TiMessages />}
          NavigateTo="/dashboard/messages"
          style={isMessages}
          customStyle={isMessagesCustom}
        />
        <NavigateTo
          text="Settings"
          icon={<IoMdSettings />}
          NavigateTo="/dashboard/settings"
          style={isSettings}
          customStyle={isSettingsCustom}
        />
      </div>
    </div>
  );
}

function NavigateTo({ text, icon, NavigateTo, style, customStyle }) {
  return (
    <Link
      to={NavigateTo}
      className="text-white font-medium text-sm flex items-center justify-center"
    >
      <div
        className={`py-3 pl-2 w-[90%] rounded-lg flex items-center gap-x-2 ${style}`}
        style={customStyle}
      >
        {icon}
        {text}
      </div>
    </Link>
  );
}
