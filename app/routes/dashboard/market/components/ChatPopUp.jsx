import {
  Form,
  useLoaderData,
  useNavigation,
  useActionData,
} from "@remix-run/react";
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
import { useEffect, useState } from "react";

export default function ChatPopup({ traderName, sellerID }) {
  const { loggedInUserID } = useLoaderData();
  const data = useActionData();

  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const navigation = useNavigation(); // For handling loading state

  useEffect(() => {
    // Connect WebSocket when the component mounts
    const socket = new WebSocket("ws://localhost:3000");
    console.log("Socket: ", socket);
    setWs(socket);

    // Listen for incoming messages
    socket.onmessage = (event) => {
      // Parse incoming message
      const message = JSON.parse(event.data);
      // Add message to the state to display in the chat
      setMessages((prev) => [...prev, message]);
    };
    // Cleanup WebSocket on unmount
    return () => socket.close();
  }, []);
  function sendMessage(event) {
    event.preventDefault();
    if (!ws) return;

    const formData = new FormData(event.target);
    const sender = formData.get("sender");
    const receiver = formData.get("receiver");
    const text = formData.get("message").trim();
    if (!text) return;

    const message = { sender, receiver, text };
    // Send message to websocket server
    ws.send(JSON.stringify(message));
    // delete the message from the input field
    event.target.reset();
  }
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
                {msg.message.text}
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
