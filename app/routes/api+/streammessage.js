import prisma from "../../../prisma/prisma";
import { getSession } from "../../utils/session.server";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  // get the logged in user's id
  const userIdD = session.get("user_id");

  if (!userIdD) {
    return { error: "Unauthorized" }, { status: 401 };
  }
  // looking for the reciever id in the url
  const { searchParams } = new URL(request.url);
  const recipientId = Number(searchParams.get("recipientId"));

  if (!recipientId) {
    return { error: "Missing recipientId" }, { status: 400 };
  }
  // set it to null
  return new Response(
    // create a new readable stream
    new ReadableStream({
      start(controller) {
        //
        const sendEvent = (data) => {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        };
        // get the messages between the logged in user and the recipient from the db every 2 seconds and send it to the client
        const interval = setInterval(async () => {
          const messages = await prisma.message.findMany({
            where: {
              OR: [
                { senderId: userIdD, recipientId: recipientId },
                { senderId: recipientId, recipientId: userIdD },
              ],
            },
            orderBy: { createdAt: "asc" },
            select: { content: true, senderId: true },
          });
          // last message

          sendEvent(messages);
        }, 500); // 0.5 seconds

        request.signal.addEventListener("abort", () => {
          clearInterval(interval);
        });
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
};
