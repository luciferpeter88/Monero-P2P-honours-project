export default function MoneroTraderProfile() {
  return (
    <div className="max-w-md  bg-primary dark:bg-gray-900 rounded-lg overflow-hidden shadow-md p-4 flex gap-x-3">
      {/* Left Section - Profile Picture & Basic Info */}
      <div className="w-full flex flex-col items-center">
        <img
          className="h-24 w-24 mt-auto rounded-full border-4 border-white dark:border-gray-800"
          src="https://randomuser.me/api/portraits/women/21.jpg"
          alt="User"
        />
        <div className="text-center mt-2">
          <h3 className="font-bold text-lg text-white">Cait Genevieve</h3>
          <p className="text-xs text-muted-foreground">
            Verified Monero Trader
          </p>
        </div>
        <div className="flex w-full gap-2 mb-auto mt-3">
          <button className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2">
            Buy XMR
          </button>
          <button className="w-full rounded-lg bg-third text-white text-xs font-semibold py-2">
            Message
          </button>
        </div>
      </div>

      {/* Right Section - Trading Stats & Actions */}
      <div className="w-full flex flex-col gap-y-3 justify-between">
        {/* Trading Stats */}
        <div className="px-4 py-2 bg-third rounded-lg">
          <p className="text-white text-xs font-semibold">Trading Stats</p>
          <div className="grid grid-cols-2 gap-2 text-center mt-1">
            <div>
              <p className="text-sm font-bold text-green-500">98%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
            <div>
              <p className="text-sm font-bold text-secondary">120+</p>
              <p className="text-xs text-muted-foreground">Total Trades</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="px-4 py-2 bg-third rounded-lg">
          <p className="text-white text-xs font-semibold">Payment Method</p>
          <span className="block py-1 text-muted-foreground text-xs rounded-full">
            Bank Transfer
          </span>
        </div>

        {/* Trade Limits */}
        <div className="px-4 py-2 bg-third rounded-lg">
          <p className="text-white text-xs font-semibold">Trade Limits</p>
          <p className="text-xs text-muted-foreground mt-1">
            Min: <span className="font-bold">0.1 XMR</span> | Max:{" "}
            <span className="font-bold">5 XMR</span>
          </p>
        </div>
      </div>
    </div>
  );
}
