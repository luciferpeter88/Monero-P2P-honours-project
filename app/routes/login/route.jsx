import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./style/style.css";
import bcrypt from "bcryptjs";
import prisma from "../../../prisma/prisma";
import { Link, Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { getSession, commitSession } from "../../utils/session.server";

export async function action({ request }) {
  const formdata = await request.formData();
  const email = formdata.get("email");
  const inputPassword = formdata.get("password");
  const User = await prisma.user.findUnique({
    where: { email },
    include: { UserSecurity: true },
  });
  if (!User) {
    return { error: "Invalid Credential" };
  }
  const verifyUser = await bcrypt.compare(inputPassword, User.passwordHash);
  if (!verifyUser) {
    return { error: "Invalid Credential" };
  }
  if (!User.emailVerified) {
    return { error: "Email is not verified" };
  }
  if (User.accountStatus !== "active") {
    return {
      error: "Your account is frozen or closed, please contact with us",
    };
  }

  const session = await getSession(request.headers.get("Cookie"));
  // Set the user_id in the session to keep track of the user
  session.set("user_id", User.id);
  // if the user has any security feature enabled, redirect to the mfa page
  if (User.UserSecurity) {
    const userSecurity = User.UserSecurity;
    const passkeyEnabled = userSecurity.passkeyEnabled;
    const phoneAuthEnabled = userSecurity.phoneAuthEnabled;
    const smsAuthEnabled = userSecurity.smsAuthEnabled;
    const emailAuthEnabled = userSecurity.emailAuthEnabled;
    const mobileAuthEnabled = userSecurity.mobileAuthEnabled;
    if (
      passkeyEnabled ||
      phoneAuthEnabled ||
      smsAuthEnabled ||
      emailAuthEnabled ||
      mobileAuthEnabled
    ) {
      return redirect("/mfa", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
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
                {data?.error && (
                  <p className="text-red-500 mt-4 max-w-40">{data.error}</p>
                )}
                <img
                  src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                  alt="illustration"
                  className="illustration"
                />
                <h1 className="opacity mb-8">Sign In</h1>

                <Form method="post" className="flex flex-col gap-5">
                  <input type="text" placeholder="Email" name="email" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <button className="opacity" type="submit">
                    Log in
                  </button>
                </Form>
                <div className="register-forget opacity">
                  <p className="text-white">Don't have an account?</p>
                  <Link to="/registration">Sign Up</Link>
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
