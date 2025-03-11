import { Form, useLoaderData } from "@remix-run/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "../../../../../src/components/components/ui/sheet";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
import { Send } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function ChatPopup({ traderName, sellerID }) {
  const { messages, loggedInUserID } = useLoaderData();
  return (
    <Sheet className="border-none">
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-5 w-full sm:w-auto">
          Chat
        </Button>
      </SheetTrigger>

      {/* Chat Popup Content */}
      <SheetContent
        side="bottom"
        className="max-w-[30rem] ml-auto h-[35rem] border-none bg-third text-white rounded-lg flex flex-col"
      >
        {/* Header */}
        <div className="p-3 flex flex-col justify-between items-center border-b border-muted-foreground">
          <DialogTitle className="text-lg font-medium text-white">
            {traderName}
          </DialogTitle>
          <div>
            <SheetDescription className="text-sm text-secondary">
              This is a private chat between you and {traderName}
            </SheetDescription>
          </div>
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
                {msg.message}
                <br />
                Logged in: {loggedInUserID} <br />
                To the person {sellerID}
              </div>
            ))
          )}
        </div>

        {/* Message Input Form */}
        <Form method="post" className="p-3 flex items-center gap-2">
          <Input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 bg-primary text-white border-none focus:ring-0 focus:outline-none ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0"
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
