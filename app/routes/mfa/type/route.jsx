import React from "react";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import prisma from "../../../../prisma/prisma";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../../../utils/session.server";
import sendOTPEmail from "../../../utils/sendOTPEmail";
import generateOTP from "../../../utils/generateOTP";

export async function action({ request }) {
  const formdata = await request.formData();
  // get the method from the query string
  const url = new URL(request.url);
  const methodValue = url.searchParams.get("method");
  const code = formdata.get("verificationCode");
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }

  // based on the method, we can switch and perform the necessary action
  switch (methodValue) {
    case "passkeyEnabled":
      break;
    case "phoneAuthEnabled":
      break;
    case "smsAuthEnabled":
      break;
    case "emailAuthEnabled": {
      const emailAuth = session.get("emailAuth");
      if (emailAuth && Number(emailAuth) === Number(code)) {
        return redirect("/dashboard");
      }
      return { error: "Invalid code, the new code has been resent!" };
    }
    case "mobileAuthEnabled":
      break;
    default:
      break;
  }

  return { method: "sent" };
}
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  const url = new URL(request.url);
  const methodValue = url.searchParams.get("method");
  if (!userIdD) {
    return { error: "Unauthorized" }, { status: 401 };
  }
  const user = await prisma.user.findUnique({
    where: { id: userIdD },
    include: { UserSecurity: true },
  });

  // will trigger auth method based on the chosen method when the route is loaded
  switch (methodValue) {
    case "passkeyEnabled":
      break;
    case "phoneAuthEnabled":
      console.log("Route is loaded, logged in phoneAuthEnabled");
      break;
    case "smsAuthEnabled":
      console.log("Route is loaded, logged in smsAuthEnabled");
      break;
    case "emailAuthEnabled": {
      // generate OTP code
      const generateOTPCode = generateOTP();
      // set the OTP code in the session
      session.set("emailAuth", generateOTPCode);
      // send the OTP code to the user's email
      await sendOTPEmail(user.email, generateOTPCode);
      // commit the session
      return new Response(JSON.stringify({ message: "Email sent" }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    case "mobileAuthEnabled":
      break;
    default:
      break;
  }

  return { data: {} };
};

export default function Index() {
  const data = useLoaderData();
  const actionData = useActionData();

  const [selectedMethod, setSelectedMethod] = React.useState(null);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-third text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Verify</h2>
      {actionData?.error && (
        <p className="text-red-500 text-center mb-4">{actionData.error}</p>
      )}
      <Form method="post" className="mb-4">
        {/* <input type="hidden" name="method" value={selectedMethod.key} /> */}
        <input
          type="text"
          name="verificationCode"
          placeholder="Enter verification code"
          className="w-full px-4 py-2 rounded-md text-white mb-2"
        />
        <button
          type="submit"
          className="w-full flex items-center gap-3 bg-secondary px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
