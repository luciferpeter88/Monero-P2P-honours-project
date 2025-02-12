import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../login/style/style.css";
// import { Link } from "@remix-run/react";
// import sendOTPEmail from "../../utils/sendOTPEmail";

export default function Index() {
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
                <p className="text-white text-center mb-4 text-sm">
                  Enter the OTP sent to your email or phone.
                </p>
                <form className="flex flex-col gap-5">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="text-center tracking-widest text-lg"
                    maxLength={6}
                  />
                  <button
                    className="text-sm"
                    style={{ width: "7.5rem", fontSize: "1rem" }}
                  >
                    Verify
                  </button>
                </form>
                <div
                  className="register-forget opacity justify-between"
                  style={{ marginTop: "0rem" }}
                >
                  <p className="text-white text-sm">Didn't receive an OTP?</p>
                  <button className="text-secondary underline text-sm">
                    Resend OTP
                  </button>
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
