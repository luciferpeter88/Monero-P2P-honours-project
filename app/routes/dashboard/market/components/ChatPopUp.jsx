import { Form, useLoaderData } from "@remix-run/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../../../../../src/components/components/ui/sheet";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
import { X, Send } from "lucide-react";

export default function ChatPopup({ traderName }) {
  const { messages } = useLoaderData(); // Get messages from the server

  return (
    <Sheet className="border-none">
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-5 w-full sm:w-auto">
          Message Me
        </Button>
      </SheetTrigger>

      {/* Chat Popup Content */}
      <SheetContent
        side="bottom"
        className="w-[50vw] ml-auto h-[60vh] border-none bg-third text-white rounded-lg flex flex-col"
      >
        {/* Header */}
        <div className="p-3 flex justify-between items-center border-b border-muted-foreground">
          <h3 className="text-lg font-medium text-white">{traderName}</h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center">
              Start a conversation
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  msg.sender === "user" ? "bg-blue-500 self-end" : "bg-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        {/* Message Input Form (Remix Form for Server Handling) */}
        <Form method="post" className="p-3  flex items-center gap-2">
          <Input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 bg-primary text-white border-none focus:ring-0"
            autoComplete="off"
          />
          <Button
            className="bg-primary hover:bg-opacity-80 text-white"
            size="icon"
            type="submit"
          >
            <Send size={18} />
          </Button>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
