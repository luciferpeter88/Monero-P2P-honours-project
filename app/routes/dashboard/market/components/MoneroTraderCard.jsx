import { BadgeCheck, BarChart, Wallet } from "lucide-react";
import { Button } from "../../../../../src/components/components/ui/button";
import ChatPopup from "./ChatPopUp";
import { Link, useLoaderData } from "@remix-run/react";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

export default function MoneroTraderCard({ seller, messages }) {
  const { loggedInUserID } = useLoaderData();

  let ratingColor = "text-red-400";
  if (seller.rating >= 90) {
    ratingColor = "text-green-400";
  } else if (seller.rating >= 80) {
    ratingColor = "text-yellow-400";
  }
  const { fontSize } = Use();
  const typography = useStoredValue("typography");
  const headerStyle = {
    fontSize: typography?.size.fontSize + 2 || fontSize.size.fontSize + 2,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  const descriptionStyle = {
    fontSize: typography?.size.fontSize - 3 || fontSize.size.fontSize - 3,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  return (
    <div
      className="flex bg-third text-white rounded-lg p-5 shadow-lg w-full items-center flex-wrap
                 transition-transform duration-200"
      key={seller.id}
    >
      {/* Trader Image */}
      <div className="w-38">
        <img
          src={
            seller.imgsrc ||
            "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
          }
          alt="Trader"
          className="rounded-lg w-32 h-32 object-cover"
        />
      </div>

      {/* Trader Details */}
      <div className="sm:px-6 bg-transparent flex-1">
        {/* Name & Verified Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-semibold" style={headerStyle}>
            {seller.username}
          </h2>
          <BadgeCheck className="text-green-400" size={18} />
          <span className="text-gray-400 text-sm">Verified Monero Trader</span>
        </div>

        {/* Trading Stats */}
        <div className="mt-2 flex items-center gap-4 text-gray-300 flex-wrap">
          <div className="flex items-center gap-2">
            <BarChart size={16} className="text-green-400" />
            {/* 2. Color-coded rating */}
            <span
              className={`text-sm font-semibold ${ratingColor}`}
              style={descriptionStyle}
            >
              {seller.successRate}% Success Rate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-yellow-400" />
            <span className="text-sm" style={descriptionStyle}>
              {seller.totalTrades} Total Trades
            </span>
          </div>
        </div>

        {/* Trade Limits */}
        <div className="mt-2 text-gray-300 flex flex-wrap gap-x-2">
          <span className="text-sm font-semibold" style={descriptionStyle}>
            Trade Limits:
          </span>
          <span className="text-white text-sm" style={descriptionStyle}>
            Max: <strong>5 XMR</strong>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-end ml-auto">
        <div className="flex gap-2 mt-4">
          <ChatPopup
            traderName={seller.username}
            sellerID={seller.id}
            messages={messages}
          />
          <Link to={`/profile/${seller.id}`}>
            <Button
              variant="outline"
              className="border-none bg-primary text-gray-300 hover:border-white"
            >
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
