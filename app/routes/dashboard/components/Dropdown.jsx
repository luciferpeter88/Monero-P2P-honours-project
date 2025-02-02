import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react"; // Optional icon

export default function CustomSelect() {
  return (
    <Select.Root>
      <Select.Trigger className="flex justify-between items-center w-full border p-2 rounded-md bg-transparent shadow-sm text-white">
        <Select.Value placeholder="Select an option" />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      {/* Portal ensures dropdown renders properly */}
      <Select.Portal>
        <Select.Content
          className=" bg-transparent border rounded-md shadow-md z-50"
          position="popper"
        >
          <Select.Viewport className="p-2">
            <Select.Item
              value="option1"
              className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Option 1
            </Select.Item>
            <Select.Item
              value="option2"
              className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Option 2
            </Select.Item>
            <Select.Item
              value="option3"
              className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              Option 3
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
