import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../login/style/style.css";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import prisma from "../../../prisma/prisma";
import { getSession, destroySession } from "../../utils/session.server";
import sendOTPEmail from "../../utils/sendOTPEmail";
import generateOTP from "../../utils/generateOTP";
import Monero from "../../utils/Monero.server";

// loader is used to initally load the page and get the session data, if there is no session data, it will redirect to the home page
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("otp_email");
  if (!email) {
    return redirect("/registration"); // Redirect if session expired
  }
  return { message: "Session is valid" };
}
// action is used to get the form data and compare it with the data in the database
export async function action({ request }) {
  // Get the session data
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("otp_email");
  if (!email) {
    return redirect("/registration");
  }

  const formData = await request.formData();
  // Get the intent to differentiate between verify and resend
  const intent = formData.get("intent");
  const enteredOtp = formData.get("otp");

  if (intent === "verify") {
    // Get OTP from DB based on email address from session
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.otpSecret !== enteredOtp) {
      return { error: "Invalid OTP" };
    }
    // Update the user to be verified
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
    // Create a Monero account for the user, this is done after the user is verified
    const monero = new Monero(user.id);
    await monero.createAccount("Primary");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } else if (intent === "resend") {
    const generatedOtp = generateOTP();
    await prisma.user.update({
      where: { email },
      data: {
        otpSecret: generatedOtp,
      },
    });
    await sendOTPEmail(email, generatedOtp);
    return { message: "OTP sent" };
  }
}

export default function Index() {
  const data = useActionData();
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr_1fr] min-h-screen container mx-auto px-5">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-4 row-span-2 row-start-2 flex justify-center items-center overflow-hidden">
          <section className="container-card">
            <div className="login-container">
              <div className="circle circle-one" />
              <div className="form-container">
                <h1 className="opacity mb-8 text-2xl">OTP Verification</h1>
                {data?.error && (
                  <p className="text-red-500 mb-2">{data.error}</p>
                )}
                {data?.message && (
                  <p className="text-green-500 mb-2">{data.message}</p>
                )}
                <p className="text-white text-center mb-4 text-sm">
                  Enter the OTP sent to your email or phone.
                </p>
                <Form method="post" className="flex flex-col gap-5">
                  <input type="hidden" name="intent" value="verify" />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="otp"
                    className="text-center tracking-widest text-lg"
                    maxLength={6}
                  />
                  <button
                    className="text-sm"
                    style={{ width: "7.5rem", fontSize: "1rem" }}
                    type="submit"
                  >
                    Verify
                  </button>
                </Form>
                <div
                  className="register-forget opacity justify-between"
                  style={{ marginTop: "0rem" }}
                >
                  <Form method="post" className="flex gap-8">
                    <p className="text-white text-sm">Didn't receive an OTP?</p>
                    <input type="hidden" name="intent" value="resend" />
                    <button
                      className="text-secondary underline text-sm"
                      style={{
                        background: "transparent",
                        fontSize: "0.875rem",
                        display: "contents",
                        fontWeight: "bold",
                        color: "#f88415",
                      }}
                      type="submit"
                    >
                      Resend
                    </button>
                  </Form>
                </div>
              </div>
              <div className="circle circle-two" />
            </div>
            <div className="theme-btn-container" />
          </section>
        </div>

        <div className="col-span-1 lg:col-span-4 lg:row-start-4">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
