import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../src/components/components/ui/select";
export default function SendForm() {
  const [timeRange, setTimeRange] = React.useState("90d");
  return (
    <div className="flex flex-col md:flex-row gap-5 mt-5  text-white">
      {/* Left Side - Form */}
      <div className="w-full bg-third p-6 rounded-lg shadow-lg">
        {/* Select Crypto */}
        <h3 className="text-md font-medium flex items-center gap-2 mb-3">
          <span className="text-blue-500">📁</span> Select Account
        </h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-full rounded-lg sm:ml-auto px-3 border-muted-foreground py-6 bg-primary"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 5 months" className="outline-none" />
          </SelectTrigger>
          <SelectContent className="rounded-b-lg rounded-t-none border-muted-foreground w-full bg-primary">
            <SelectItem
              value="90d"
              className="rounded-lg p-3 hover:bg-secondary hover:outline-none cursor-pointer w-full"
            >
              Primary account
            </SelectItem>
            <SelectItem
              value="30d"
              className="rounded-lg p-3 hover:bg-primary hover:outline-none cursor-pointer"
            >
              Buisness
            </SelectItem>
            <SelectItem
              value="7d"
              className="rounded-lg p-3 hover:bg-primary hover:outline-none cursor-pointer"
            >
              {" "}
              Hidden Services
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Withdraw To */}
        <div className="mt-8 mb-3">
          <h3 className="text-md font-medium flex items-center gap-2 mb-3">
            <span className="text-blue-500 ">💰</span>Select Amount
          </h3>
          <div className="mt-1 bg-primary p-3 py-4 text-muted-foreground rounded-md flex items-center justify-between">
            <span className="text-sm">Minimum amount: 0.01 XMR</span>
          </div>
          <p className="text-xs text-secondary mt-2">
            Available Balance: 1 XMR
          </p>
          <label className="text-md font-medium block mt-8">
            Select Address
          </label>
          <input
            type="text"
            className="w-full bg-primary p-3 py-4 rounded-md mt-1 text-muted-foreground text-sm"
            value="TDxA3Nk2L42RLa4jwCXCmo8tDoHLrJXhnb"
            readOnly
          />
        </div>

        {/* Withdraw Amount */}
        <div className="mb-6">
          <label className="text-sm text-white mb-2 block mt-8">
            Remarks (optional)
          </label>
          <input
            type="text"
            className="w-full bg-primary p-3 py-4 rounded-md mt-1 text-muted-foreground text-sm"
            placeholder="e.g. Purpose of sending"
          />
        </div>

        {/* Confirm Button */}
        <button className="items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-2 px-5 text-sm font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98] mt-3 ml-auto">
          Transfer
        </button>
      </div>

      {/* Right Side - Tips & FAQs */}
      <div className="w-full md:w-64 bg-third p-6 rounded-lg shadow-lg min-h-64">
        {/* Tips */}
        <h3 className="text-lg font-semibold">💡 Tips</h3>
        <p className="text-sm text-muted-foreground 400 mt-2">
          For the safety of your funds, our customer support team may contact
          you by phone to confirm your withdrawal.
        </p>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          Ensure that your withdrawal address is correct before proceeding.
        </p>
      </div>
    </div>
  );
}
