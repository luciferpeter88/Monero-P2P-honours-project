import { Button } from "../../../../src/components/components/ui/button";
export default function MoneroTraderProfile({
  name,
  imageSrc,
  successRate,
  totalTrades,
}) {
  return (
    <div className=" w-80 bg-primary dark:bg-gray-900 rounded-lg overflow-hidden shadow-md p-4 flex gap-x-3">
      {/* Left Section - Profile Picture & Basic Info */}
      <div className="w-full flex flex-col items-center">
        <img
          className="h-24 w-24 mt-auto rounded-full border-4 border-white dark:border-gray-800"
          src={imageSrc || "https://i.pravatar.cc/300"}
          alt="User"
        />
        <div className="text-center mt-2 w-full">
          <h3 className="font-bold text-lg text-white">{name}</h3>

          <div className="px-4 py-2 bg-third rounded-lg mt-2 w-full">
            <p className="text-white text-xs font-semibold">Trading Stats</p>
            <div className="grid grid-cols-2 gap-2 text-center mt-1">
              <div>
                <p className="text-sm font-bold text-green-500">
                  {successRate}%
                </p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
              <div>
                <p className="text-sm font-bold text-secondary">
                  {totalTrades}+
                </p>
                <p className="text-xs text-muted-foreground">Total Trades</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 justify-center mt-3">
          <Button className="bg-secondary text-xs h-8 hover:bg-third">
            Message
          </Button>
          <Button className="bg-third text-xs h-8 hover:bg-opacity-80">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
