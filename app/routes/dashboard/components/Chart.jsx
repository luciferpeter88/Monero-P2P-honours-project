import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../src/components/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../src/components/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../src/components/components/ui/select";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  price: {
    label: "price",
    color: "hsl(var(--chart-1))",
  },
};

export default function Chart({ chartData }) {
  const [timeRange, setTimeRange] = React.useState("90");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = chartData[chartData.length - 1].date;
    let daysToSubtract = 90;
    if (timeRange === "30") {
      daysToSubtract = 30;
    } else if (timeRange === "7") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const { fontSize } = Use();
  const typography = useStoredValue("typography");

  return (
    <Card className="h-full bg-transparent">
      <CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle
            className="text-white"
            style={{
              fontSize:
                typography?.size.fontSize + 5 || fontSize.size.fontSize + 5,
            }}
          >
            Monero Chart
          </CardTitle>
          <CardDescription
            className="mt-3"
            style={{
              fontSize:
                typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
            }}
          >
            Showing the price of Monero in the last {timeRange} days
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[12.5rem] rounded-lg sm:ml-auto px-3 border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary"
            aria-label="Select a value"
          >
            <SelectValue
              placeholder="Last 3 months"
              className="outline-none border-none bg-primary text-white"
            />
          </SelectTrigger>
          <SelectContent className="border-none w-[12.5rem] bg-primary ">
            <SelectItem
              value="90"
              className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
            >
              Last 3 months
            </SelectItem>
            <SelectItem
              value="30"
              className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
            >
              Last 30 days
            </SelectItem>
            <SelectItem
              value="7"
              className="rounded-lg w-full p-3 hover:bg-primary hover:outline-none cursor-pointer text-white focus:bg-third focus:text-white"
            >
              {" "}
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[75%] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f88415" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f88415" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="#f88415"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
