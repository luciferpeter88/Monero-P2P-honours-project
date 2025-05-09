import { Mail, Phone, Key, Smartphone } from "lucide-react";
import prisma from "../../../../prisma/prisma";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { getSession } from "../../../utils/session.server";
// import { Button } from "../../components/button";

export async function action({ request }) {
  const formdata = await request.formData();
  const authMethod = formdata.get("method");
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  return redirect(`/mfa/type?method=${authMethod}`);
}
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return { error: "Unauthorized" }, { status: 401 };
  }
  let user = await prisma.user.findUnique({
    where: { id: userIdD },
    include: { UserSecurity: true },
  });

  return { data: user.UserSecurity };
};

export default function Index() {
  const data = useLoaderData();
  const enabledMethods = [
    { name: "Passkeys", key: "passkeyEnabled", icon: <Key />, type: "passkey" },
    {
      name: "Phone Authentication",
      key: "phoneAuthEnabled",
      icon: <Phone />,
      type: "phone",
    },
    {
      name: "SMS Authentication",
      key: "smsAuthEnabled",
      icon: <Mail />,
      type: "sms",
    },
    {
      name: "Email Authentication",
      key: "emailAuthEnabled",
      icon: <Mail />,
      type: "email",
    },
    {
      name: "Mobile App Authentication",
      key: "mobileAuthEnabled",
      icon: <Smartphone />,
      type: "mobile",
    },
  ].filter((method) => data.data[method.key]); // Filter out disabled methods

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-third text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Multi-Factor Authentication
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Select a method to verify your identity.
      </p>
      {enabledMethods.map((method) => (
        <Form key={method.key} method="post" className="mb-4">
          <input type="hidden" name="method" value={method.key} />
          <button
            key={method.key}
            type="submit"
            className="w-full flex items-center gap-3 bg-secondary px-4 py-2 rounded-md mb-4"
          >
            {method.icon} {`Verify via ${method.name}`}
          </button>
        </Form>
      ))}
    </div>
  );
}
