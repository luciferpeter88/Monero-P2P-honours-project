import SideBar from "../components/SideBar";
import { Button } from "../../../../../src/components/components/ui/button";
import { Send } from "lucide-react";
import prisma from "../../../../../prisma/prisma";
import { getSession } from "../../../../utils/session.server";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");

  if (!userIdD) {
    return { error: "Unauthorized" }, { status: 401 };
  }
  // get the recipient id from the db based on the sender id
  const exchangeMessageWithUsers = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userIdD }, { recipientId: userIdD }],
    },
    orderBy: { createdAt: "asc" },
    select: { recipientId: true, senderId: true },
  });
  // get the unique recipient ids
  const uniqueRecipientIds = [
    ...new Set(
      exchangeMessageWithUsers.map((item) => {
        // if the sender id is the same as the logged in user's id, then return the recipient id and vice versa to show the user's messages in the chat list
        if (item.senderId === userIdD) {
          return item.recipientId;
        } else {
          return item.senderId;
        }
      })
    ),
  ];
  const users = await Promise.all(
    uniqueRecipientIds.map(async (id) => {
      return prisma.user.findUnique({
        where: { id },
        select: { id: true, username: true },
      });
    })
  );

  return { users, loggedInUserID: userIdD };
};

export default function Index() {
  const data = useLoaderData();
  const [userId, setUserId] = useState(data?.users?.[0]?.id || null);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(data?.users?.[0]?.username || null);
  const [loading, setLoading] = useState(false);
  // console.log(data);

  useEffect(() => {
    if (!userId) return;
    const selectedUser = data.users.find((user) => user.id === userId);
    setUserName(selectedUser ? selectedUser.username : null);
    setLoading(true);
    setMessages([]);
    const eventSource = new EventSource(
      `/api/streammessage?recipientId=${userId}`
    );

    eventSource.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);
      setMessages(newMessages);
      setLoading(false);
    };

    eventSource.onerror = () => {
      console.error("SSE hiba történt.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

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
      body: new URLSearchParams({ recipientId: userId, content: message }),
    });

    if (response.ok) {
      // const data = await response.json();
      e.target.reset();
    } else {
      console.error("Hiba történt az üzenet küldésekor.");
    }
  }
  const { fontSize } = Use();
  const typography = useStoredValue("typography");
  const nameStyle = {
    fontSize: typography?.size.fontSize || fontSize.size.fontSize,
  };
  const descRiptionstyle = {
    fontSize: typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
  };
  return (
    <div className="mt-5 ml-5">
      <div className="flex h-full gap-x-5">
        {/* Chat List */}
        <SideBar users={data.users} setUserId={setUserId} userId={userId} />
        {/* Main Chat */}

        <main className="flex-1 flex flex-col bg-third rounded-xl max-h-[calc(100vh-5rem)]">
          <header className="p-4 border-b border-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-medium">{userName}</h1>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading messages...</p>
              </div>
            ) : messages.length !== 0 ? (
              messages.map((message) => {
                if (message.senderId !== userId) {
                  return (
                    <div
                      className="flex gap-4 max-w-2xl ml-auto"
                      key={message.id}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="font-semibold" style={nameStyle}>
                            You
                          </span>
                        </div>
                        <div
                          className="bg-primary bg-opacity-70 rounded-xl p-4"
                          style={descRiptionstyle}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                      <img
                        src="https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
                        alt="You"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="flex gap-4 max-w-2xl" key={message.id}>
                      <img
                        src="https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold" style={nameStyle}>
                            {userName}
                          </span>
                        </div>
                        <div
                          className="bg-primary rounded-xl p-4"
                          style={descRiptionstyle}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <p className="text-gray-500 text-center">No messages yet.</p>
            )}
          </div>

          <form
            className="p-4 border-t border-gray-800 flex gap-x-3 items-center"
            onSubmit={sendMessage}
          >
            <div className="flex items-center gap-2 bg-primary rounded-xl w-full">
              <input
                type="text"
                placeholder="Your message"
                className="flex-1 bg-transparent focus:outline-none text-white placeholder-muted-foreground p-3 bg-primary"
                name="message"
              />
              <input type="hidden" name="sender" value={data?.loggedInUserID} />
            </div>
            <Button
              className="bg-primary hover:bg-opacity-80 text-white h-full w-12"
              size="icon"
              type="submit"
            >
              <Send size={18} />
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
