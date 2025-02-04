import { BadgeCheck, BarChart, Wallet } from "lucide-react";
import { Button } from "../../../../../src/components/components/ui/button";
import ChatPopup from "./ChatPopUp";

export default function MoneroTraderCard({ seller }) {
  return (
    <div
      className="flex bg-third text-white rounded-lg p-5 shadow-lg w-full items-center flex-wrap"
      key={seller.id}
    >
      {/* Trader Image */}
      <div className="w-38">
        <img
          src="https://randomuser.me/api/portraits/women/21.jpg"
          alt="Trader"
          className="rounded-lg w-full h-auto"
        />
      </div>

      {/* Trader Details */}
      <div className=" sm:px-6 bg-transparent">
        {/* Name & Verified Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-semibold">{seller.name}</h2>
          <BadgeCheck className="text-green-400" size={18} />
          <span className="text-gray-400 text-sm">Verified Monero Trader</span>
        </div>

        {/* Trading Stats */}
        <div className="mt-2 flex items-center gap-4 text-gray-300 flex-wrap">
          <div className="flex items-center gap-2">
            <BarChart size={16} className="text-green-400" />
            <span className="text-sm">{seller.rating}% Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-yellow-400" />
            <span className="text-sm">{seller.totalTrades} Total Trades</span>
          </div>
        </div>

        {/* Trade Limits */}
        <div className="mt-2 text-gray-300 flex flex-wrap gap-x-2">
          <span className="text-sm font-semibold">Trade Limits:</span>
          <span className=" text-white text-sm">
            Min: <strong>{seller.tradeMin} XMR</strong> | Max:{" "}
            <strong>{seller.totalTrades} XMR</strong>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-end ml-auto">
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          {/* <Button className="bg-secondary text-white px-5">Message Me</Button> */}
          <ChatPopup traderName={seller.name} />
          <Button
            variant="outline"
            className="border-none bg-primary text-gray-300 hover:border-white"
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
