import prisma from "../../../prisma/prisma";
import { getSession } from "../../utils/session.server";
import { redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const formData = await request.formData();
  const recipientId = Number(formData.get("recipientId"));
  const content = formData.get("content");

  if (!recipientId || !content) {
    return { error: "Hiányzó adatok" }, { status: 400 };
  }
  // store the message in the database based on the sender and recipient id
  await prisma.message.create({
    data: {
      senderId: userIdD,
      recipientId: recipientId,
      content: content,
    },
  });

  return Response.json({
    success: true,
  });
};
