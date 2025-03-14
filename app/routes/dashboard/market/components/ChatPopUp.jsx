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
import { useState, useEffect } from "react";

export default function ChatPopup({ traderName, sellerID }) {
  const { loggedInUserID } = useLoaderData();
  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    // Prevent refreshing the page
    e.preventDefault();
    // target the form
    const formData = new FormData(e.target);
    // get the name of the input field's value
    const message = formData.get("message");
    // make a POST request to the server
    const response = await fetch("/api/createmessage", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // send the message and the recipient id
      body: new URLSearchParams({ recipientId: sellerID, content: message }),
    });

    if (response.ok) {
      // const data = await response.json();
      e.target.reset();
    } else {
      console.error("Hiba történt az üzenet küldésekor.");
    }
  }
  useEffect(() => {
    // Create a new EventSource and pass the recipientId as a query parameter to the server
    // to retrieve the messages between the logged-in user and the seller
    const eventSource = new EventSource(
      `/api/streammessage?recipientId=${sellerID}`
    );

    eventSource.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);
      setMessages(newMessages);
    };

    eventSource.onerror = () => {
      console.error("SSE hiba történt.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
                className={`message p-2 rounded-md ${
                  msg.senderId === loggedInUserID
                    ? "bg-secondary self-end"
                    : "bg-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        {/* Message Input Form */}
        <Form method="post" onSubmit={sendMessage}>
          <Input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 bg-primary text-white border-none focus:ring-0 focus:outline-none ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            autoComplete="off"
          />
          <Input type="hidden" name="receiver" value={sellerID} />
          <Input type="hidden" name="sender" value={loggedInUserID} />
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
