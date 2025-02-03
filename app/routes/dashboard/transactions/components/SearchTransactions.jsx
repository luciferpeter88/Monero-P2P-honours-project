import { useState } from "react";
import { Input } from "../../../../../src/components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../src/components/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../src/components/components/ui/popover";
import { Calendar } from "../../../../../src/components/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../../../../src/components/components/ui/button";

export default function TransactionSearch() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center bg-transparent mt-5 rounded-lg w-full gap-5">
      {/* Start Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={startDate ? format(startDate, "MM/dd/yyyy") : ""}
              className="bg-primary w-[150px] border-none text-white cursor-pointer focus:ring-offset-0 focus:ring-0 focus:outline-none outline-none focus:border-none  focus:ring-primary focus:ring-offset-primary"
            />
            <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
          />
        </PopoverContent>
      </Popover>

      <span className="text-gray-400">—</span>

      {/* End Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative w-[130px]">
            <Input
              type="text"
              readOnly
              value={endDate ? format(endDate, "MM/dd/yyyy") : ""}
              className="bg-primary w-[150px] border-none text-white cursor-pointer focus:ring-offset-0 focus:ring-0 focus:outline-none outline-none focus:border-none  focus:ring-primary focus:ring-offset-primary"
            />
            <CalendarIcon className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
        </PopoverContent>
      </Popover>

      {/* Vertical Divider */}
      <div className="w-[1px] ml-5 h-6 bg-gray-600"></div>

      {/* Transaction Type */}
      <Select>
        <SelectTrigger className="bg-primary w-[150px] border-none text-white cursor-pointer focus:ring-offset-0 focus:ring-0 focus:outline-none outline-none focus:border-none  focus:ring-primary focus:ring-offset-primary">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sent">Sent</SelectItem>
          <SelectItem value="received">Received</SelectItem>
        </SelectContent>
      </Select>

      {/* Account Number */}
      <Input
        type="text"
        placeholder="Account Number"
        className="bg-primary w-[160px] border-none text-white cursor-pointer focus:ring-offset-0 focus:ring-0 focus:outline-none outline-none focus:border-none  focus:ring-primary focus:ring-offset-primary"
      />

      {/* Amount */}
      <Input
        type="number"
        placeholder="Amount"
        className="bg-primary w-[160px] border-none text-white cursor-pointer focus:ring-offset-0 focus:ring-0 focus:outline-none outline-none focus:border-none  focus:ring-primary focus:ring-offset-primary"
      />
      <Button className="bg-secondary ml-auto">Search</Button>
    </div>
  );
}
