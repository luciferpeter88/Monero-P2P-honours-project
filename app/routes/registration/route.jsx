import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./style/registration.css";
import userpicture from "./components/picture/user.png";
import { Link, Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import prisma from "../../../prisma/prisma";
import bcrypt from "bcryptjs";
import generateOTP from "../../utils/generateOTP";
import { getSession, commitSession } from "../../utils/session.server";
import sendOTPEmail from "../../utils/sendOTPEmail";
export async function action({ request }) {
  // get form data
  const formdata = await request.formData();
  const firstName = formdata.get("fName");
  const lastName = formdata.get("lName");
  const userName = formdata.get("uName");
  const email = formdata.get("email");
  const password = formdata.get("password");
  // make sure all fields are filled
  if (!firstName || !lastName || !userName || !email || !password) {
    console.log("All fields are required");
    return { error: "All fields are required." };
  }
  // check if user already exists, email address must be unique
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const existingUsername = await prisma.user.findUnique({
    where: { username: userName },
  });
  if (existingUser) {
    return { error: "Email is already taken." };
  }

  if (existingUsername) {
    return { error: "Username already exists." };
  }

  // Step 3: Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // generate an otp number
  const otp = generateOTP();
  // Step 5: Save user in the database
  await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      email: email,
      passwordHash: hashedPassword,
      otpSecret: otp,
    },
  });
  // Step 6: Set the email in the session and redirect to the verify page
  const session = await getSession(request.headers.get("Cookie"));
  session.set("otp_email", email);
  await sendOTPEmail("kaszapnagyp@gmail.com", otp);
  return redirect("/verify", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Index() {
  const actionData = useActionData();
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr_1fr] min-h-screen container mx-auto px-5">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-4 row-span-2 row-start-2 flex justify-center items-center px-5 lg:px-0 overflow-hidden">
          <section className="container-card">
            <div className="registration-container">
              <div className="circle circle-one" />
              <div className="form-container">
                <img
                  src={userpicture}
                  alt="illustration"
                  className="illustration-register"
                />
                {actionData?.error && (
                  <p className="text-red-500 mt-4">{actionData.error}</p>
                )}
                <h1 className="opacity mb-8">Sign Up</h1>
                <Form method="post" className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <input type="text" name="fName" placeholder="First Name" />
                    <input type="text" name="lName" placeholder="Last Name" />
                  </div>
                  <input type="text" name="uName" placeholder="Username" />
                  <input type="email" name="email" placeholder="Email" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <button type="submit" className="opacity">
                    Sign Up
                  </button>
                </Form>
                <div className="flex justify-center mt-[-1rem]">
                  <div className="border-b w-4/5 border-gray-500 border-opacity-25 rounded-full"></div>
                </div>
                <div className="w-full flex mt-3">
                  <button className="bg-[#9191911f] px-8 py-2 rounded-md mx-auto">
                    Google
                  </button>
                </div>
                <div className="register-forget opacity">
                  <p className="text-white">Already have an account?</p>
                  <Link to="/login">Sign In</Link>
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
