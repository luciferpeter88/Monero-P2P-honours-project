import React from "react";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import prisma from "../../../../prisma/prisma";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../../../utils/session.server";
import sendOTPEmail from "../../../utils/sendOTPEmail";
import generateOTP from "../../../utils/generateOTP";
import sendVerificationCode from "../../../utils/twillio.server";

export async function action({ request }) {
  const formdata = await request.formData();
  // get the method from the query string
  const url = new URL(request.url);
  const methodValue = url.searchParams.get("method");
  // get the verification code from the form data
  const code = formdata.get("verificationCode");
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  //   const user = await prisma.user.findUnique({
  //     where: { id: userIdD },
  //   });

  // based on the method, we can switch and perform the necessary action
  switch (methodValue) {
    case "passkeyEnabled":
      break;
    case "smsAuthEnabled": {
      const smsAuth = session.get("smsAuth");
      if (smsAuth && Number(smsAuth) === Number(code)) {
        return redirect("/dashboard");
      }

      return { error: "Invalid code, the new code has been resent!" };
    }

    case "emailAuthEnabled": {
      const emailAuth = session.get("emailAuth");
      if (emailAuth && Number(emailAuth) === Number(code)) {
        return redirect("/dashboard");
      }
      return { error: "Invalid code, the new code has been resent!" };
    }

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
  });

  // will trigger auth method based on the chosen method when the route is loaded
  switch (methodValue) {
    case "passkeyEnabled":
      break;

    case "smsAuthEnabled": {
      const generateOTPCode = generateOTP();
      // set the OTP code in the session
      session.set("smsAuth", `${generateOTPCode}2`);
      // send the OTP code to the user's phone number

      if (!user.phone) {
        return { error: "Phone number not found" };
      }
      console.log("Route is loaded, logged in smsAuthEnabled");

      await sendVerificationCode(user?.phone, `${generateOTPCode}2`);
      return new Response(JSON.stringify({ message: "SMS sent" }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": await commitSession(session),
        },
      });
    }

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
