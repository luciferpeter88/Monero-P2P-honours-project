import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./style/registration.css";
import userpicture from "./components/picture/user.png";
import { Link } from "@remix-run/react";
export default function Index() {
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
                <h1 className="opacity mb-8">Sign Up</h1>
                <form className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <input type="text" placeholder="Username" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <button className="opacity">Sign Up</button>
                </form>
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
