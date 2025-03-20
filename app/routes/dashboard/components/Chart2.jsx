import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../src/components/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
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
import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";
export default function Component({ data }) {
  // Create chartData with a minimum value for zero balances
  const chartData = data.map((item, index) => {
    return {
      id: item.id,
      desktop: item.balance === 0 ? 0.0001 : item.balance,
      fill: `hsl(var(--chart-${index + 1}))`,
    };
  });

  // Create a config for chart styling
  const configChart = data.reduce((acc, item, index) => {
    acc[item.id] = {
      label: item.accountName,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {});

  // Calculate the total balance from the raw data.
  const totalAssets = data.reduce((acc, item) => acc + item.balance, 0);

  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(chartData[0].id);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.id === activeMonth),
    [activeMonth]
  );
  const accounts = React.useMemo(() => chartData.map((item) => item.id), []);
  const { fontSize } = Use();
  const typography = useStoredValue("typography");
  return (
    <Card data-chart={id} className="flex flex-col p-5 pt-8 bg-transparent">
      <ChartStyle id={id} config={configChart} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle
            className="text-white"
            style={{
              fontSize:
                typography?.size.fontSize + 3 || fontSize.size.fontSize + 3,
              letterSpacing:
                typography?.size.lineHeight || fontSize.size.lineHeight,
            }}
          >
            Assets Overview
          </CardTitle>
          <CardDescription
            className="mt-3"
            style={{
              fontSize:
                typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
              letterSpacing:
                typography?.size.lineHeight || fontSize.size.lineHeight,
            }}
          >
            Total {totalAssets.toLocaleString()} XMR
          </CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {accounts.map((key) => {
              const config = configChart[key];
              if (!config) {
                return null;
              }
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={configChart}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="desktop"
              nameKey="id"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className=" fill-white text-3xl font-bold "
                        >
                          {totalAssets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Assets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
