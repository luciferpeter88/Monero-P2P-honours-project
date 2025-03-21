import { Button } from "../../../../src/components/components/ui/button";
import { Link } from "@remix-run/react";
import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";
export default function MoneroTraderProfile({
  name,
  imageSrc,
  successRate,
  totalTrades,
  userID,
}) {
  const typography = useStoredValue("typography");
  const colorType = useStoredValue("colourType");

  return (
    <div
      className=" w-80 bg-primary dark:bg-gray-900 rounded-lg overflow-hidden shadow-md p-4 flex gap-x-3"
      style={{ backgroundColor: colorType?.primary }}
    >
      {/* Left Section - Profile Picture & Basic Info */}
      <div className="w-full flex flex-col items-center">
        <img
          className="h-24 w-24 mt-auto rounded-full border-4 border-white dark:border-gray-800"
          src={
            imageSrc ||
            "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
          }
          alt="User"
        />
        <div className="text-center mt-2 w-full">
          <h3
            className="font-bold text-lg text-white"
            style={{
              fontSize: typography?.size.fontSize + 1 + "px",
              letterSpacing: typography?.size.lineHeight,
            }}
          >
            {name}
          </h3>

          <div
            className="px-4 py-2 bg-third rounded-lg mt-2 w-full"
            style={{ backgroundColor: colorType?.tertiary }}
          >
            <p
              className="text-white text-xs font-semibold"
              style={{
                fontSize: typography?.size.fontSize - 1 + "px",
                letterSpacing: typography?.size.lineHeight,
              }}
            >
              Trading Stats
            </p>
            <div className="grid grid-cols-2 gap-2 text-center mt-1">
              <div>
                <p
                  className="text-sm font-bold text-green-500"
                  style={{
                    fontSize: typography?.size.fontSize - 3 + "px",
                    letterSpacing: typography?.size.lineHeight,
                  }}
                >
                  {successRate}%
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{
                    fontSize: typography?.size.fontSize - 3 + "px",
                    letterSpacing: typography?.size.lineHeight,
                  }}
                >
                  Success Rate
                </p>
              </div>
              <div>
                <p
                  className="text-sm font-bold text-secondary"
                  style={{
                    fontSize: typography?.size.fontSize - 3 + "px",
                    letterSpacing: typography?.size.lineHeight,
                  }}
                >
                  {totalTrades}+
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{
                    fontSize: typography?.size.fontSize - 3 + "px",
                    letterSpacing: typography?.size.lineHeight,
                  }}
                >
                  Total Trades
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 justify-center mt-3">
          <Link to={`/profile/${userID}`}>
            <Button
              className="bg-secondary text-xs h-8 hover:bg-third"
              style={{ backgroundColor: colorType?.secondary }}
            >
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
