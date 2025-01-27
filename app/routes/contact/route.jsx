import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./style/styles.css";
import { Link } from "@remix-run/react";
import email from "./components/images/email.png";
export default function Index() {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr_1fr] min-h-screen container mx-auto">
        <div className="col-span-1 lg:col-span-4">
          <Navbar />
        </div>
        <div className="col-span-1 lg:col-span-4 row-span-2 row-start-2 flex justify-center items-center px-5 lg:px-0 overflow-hidden">
          <section className="container-card">
            <div className="contact-container">
              <div className="circle circle-one" />
              <div className="form-container">
                <img
                  src={email}
                  alt="illustration"
                  className="illustration-contact"
                />
                <h1 className="opacity mb-8">Get In Touch</h1>
                <form className="flex flex-col gap-5">
                  <div className="flex gap-5">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <input type="email" placeholder="Email" />
                  <input type="text" placeholder="Subject" />
                  <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={5}
                    placeholder="Message"
                  />
                  {/* <button className="opacity">Send</button> */}
                  <button className=" inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 py-3 px-6 w-52 font-dm text-base font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98]">
                    Send
                  </button>
                </form>
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
